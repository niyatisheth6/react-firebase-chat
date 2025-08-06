import { useEffect, useState } from "react";
import Search from "../../assets/img/search.png";
import Avatar from "../../assets/img/avatar.png";
import Plus from "../../assets/img/plus.png";
import Minus from "../../assets/img/minus.png";
import AddUserModal from "../../components/modal/AddUserModal";
import { useUserStore } from "../../config/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useChatStore } from "../../config/chatStore";
import clsx from "clsx";

function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const [searchInput, setSearchInput] = useState("");
  const { chatId, changeChat } = useChatStore();

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex((item) => {
      return item.chatId === chat.chatId;
    });
    userChats[chatIndex].isSeen = true;

    const userChatRef = doc(db, "userChats", currentUser.id);

    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  };
  const filterChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promise = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promise);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.id]);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-5 p-5">
        <div className="flex-1 bg-black flex items-center gap-5 rounded-[.625rem] p-2.5">
          <img src={Search} alt="Search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white flex-1"
          />
        </div>
        <button onClick={() => setAddMode((prev) => !prev)}>
          <img
            src={addMode ? Minus : Plus}
            alt="Plus"
            className="w-9 h-9 bg-black p-2.5 rounded-[.625rem]"
          />
        </button>
      </div>
      {filterChats.map((chat) => (
        <div
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          className={clsx(
            "flex items-center gap-5 p-5 cursor-pointer border-b border-b-gray-600",
            { "bg-blue-500/40": !chat.isSeen }
          )}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? Avatar
                : chat.user.avatar || Avatar
            }
            alt="Avatar"
            className="w-[3.125rem] h-[3.125rem] object-cover rounded-full"
          />
          <div className="flex flex-col gap-2.5">
            <h2 className="font-medium">
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </h2>
            <p className="text-sm">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUserModal />}
    </div>
  );
}

export default ChatList;
