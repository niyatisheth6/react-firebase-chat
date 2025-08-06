import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import Avatar from "../../assets/img/avatar.png";
import { db } from "../../config/firebase";
import { useState } from "react";
import { array } from "yup";
import { useUserStore } from "../../config/userStore";

function AddUserModal() {
  const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querysnapsot = await getDocs(q);

      if (!querysnapsot.empty) {
        setUser(querysnapsot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async()=>{
try {
  const chatRef = collection(db, "chats")
  const userChatsRef = collection(db, "userChats")
  const newChatRef = doc(chatRef )
  await setDoc(newChatRef,{
    createAt : serverTimestamp(),
    message : []

  })

  await updateDoc(doc(userChatsRef, user?.id),{
    chats : arrayUnion({
      chatId : newChatRef.id,
      lastMessage : "",
      receiverId : currentUser.id,
      updatedAt : Date.now()
    })
  })

  await updateDoc(doc(userChatsRef, currentUser.id),{
    chats : arrayUnion({
      chatId : newChatRef.id,
      lastMessage : "",
      receiverId : user?.id,
      updatedAt : Date.now()
    })
  })

} catch (error) {
  console.log(error)
  
}
  }
  return (
    <div className="p-[1.875rem] bg-black rounded-[.625rem] absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
      <form className="flex gap-5 " onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="p-4 rounded-[10px] border-none outline-none text-black"
        />
        <button className="bg-blue-800 p-2.5 rounded-[10px] text-white">
          Search
        </button>
      </form>
      {user && (
        <div className="mt-[3.125rem] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={user?.avatar || Avatar}
              alt="avatar"
              className="w-[50px] h-[3.125rem] rounded-full object-cover"
            />
            <span>{user?.username}</span>
          </div>
          <button onClick={handleAdd} className="bg-blue-800 p-2.5 rounded-[10px] text-white">
            Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default AddUserModal;
