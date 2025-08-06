import { useEffect, useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";

import Avatar from "../../assets/img/avatar.png";
import Phone from "../../assets/img/phone.png";
import Video from "../../assets/img/video.png";
import Info from "../../assets/img/info.png";
import Emoji from "../../assets/img/emoji.png";
import Img from "../../assets/img/img.png";
import Camera from "../../assets/img/camera.png";
import Microphone from "../../assets/img/mic.png";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useChatStore } from "../../config/chatStore";
import { useUserStore } from "../../config/userStore";
import { uploadAvatarToCloudinary } from "../../config/auth";
import clsx from "clsx";

function UserChat() {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const [img, setImg] = useState({ file: null, url: "" });
  const endRef = useRef(null);
  const { chatId, user ,isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  const handleSend = async () => {
    if (text === " ") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await uploadAvatarToCloudinary(img.file);
      }
      
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user?.id];

      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    setImg({
      file: null,
      url: "",
    });
    setText("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => unsub();
  }, [chatId]);

  return (
    <div className="flex-[2] border-l flex flex-col border-r border-l-gray-600 border-r-gray-600 h-full">
      {/* top */}
      <div className="p-5 flex items-center justify-between border-b border-b-gray-600">
        <div className="flex items-center gap-5">
          <img
            src={user?.avatar || Avatar}
            alt="avatar"
            className="w-[3.75rem] h-[3.75rem] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[.3125rem]">
            <h2 className="text-lg font-bold">{user?.username}</h2>
            <p className="text-sm text-gray-200">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="flex gap-5">
          <button>
            <img src={Phone} alt="Phone" className="w-5 h-5" />
          </button>
          <button>
            <img src={Video} alt="Video" className="w-5 h-5" />
          </button>
          <button>
            <img src={Info} alt="Info" className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* center  */}
      <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-5">
        {chat?.messages?.map((message) => (
          <div
            key={message?.createAt}
            className={clsx("max-w-[70%] flex gap-5 ", {"self-end" : message.senderId === currentUser.id})}
          >
            <div className="flex-1 flex flex-col gap-[.3125rem]">
              {message.img && (
                <img
                  src={message.img || Avatar}
                  alt="avatar"
                  className="w-full h-[300px] rounded-[10px] object-cover"
                />
              )}
              <p className={clsx("p-5 bg-blue-700 rounded-[.625rem]" , {"!bg-blue-900" : message.senderId === currentUser.id })}>
                {message.text}
              </p>
              <span className="text-xs">1 min ago</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="max-w-[70%] flex gap-5 self-end">
            <div className="flex-1 flex flex-col gap-[.3125rem]">
              <img
                src={img.url}
                alt="avatar"
                className="w-full h-[300px] rounded-[10px] object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <div ref={endRef}></div>
      {/* bottom */}
      <div className="p-5 flex justify-between items-center border-t border-t-gray-600 gap-5 mt-auto">
        <div className="flex gap-5">
          <button>
            <label htmlFor="file">
              {" "}
              <img src={Img} alt="Img" className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleImage}
            />
          </button>
          <button>
            <img src={Camera} alt="Camera" className="w-5 h-5" />
          </button>
          <button>
            <img src={Microphone} alt="Microphone" className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          placeholder={(isCurrentUserBlocked || isReceiverBlocked )? "You can not send a message": "Type something..."}
          disabled= {isCurrentUserBlocked || isReceiverBlocked}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-black border-none outline-none text-white p-5 rounded-[.625rem] text-base disabled:cursor-not-allowed"
        />

        <div className="relative">
          <button onClick={() => setOpenEmoji((prev) => !prev)}>
            <img src={Emoji} alt="Emoji" className="w-5 h-5" />
          </button>
          <div className="absolute bottom-[3.125rem] left-0">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled= {isCurrentUserBlocked || isReceiverBlocked}
          className="text-white bg-blue-400 py-2.5 px-5 border-none rounded-[.3125rem] disabled:bg-blue-400/40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default UserChat;
