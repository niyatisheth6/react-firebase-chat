import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../../config/firebase";
import { useUserStore } from "../../config/userStore";
import { useChatStore } from "../../config/chatStore";

import Avatar from "../../assets/img/avatar.png";
import ArrowUp from "../../assets/img/arrowUp.png";
import ArrowDown from "../../assets/img/arrowDown.png";
import Download from "../../assets/img/download.png";

function UserDetails() {
   const {user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
   const { currentUser} = useUserStore()
  const handleBlock =async () => {
if(!user) return;
const userDocRef = doc(db, "users", currentUser.id)
try {
  await updateDoc(userDocRef, {
    blocked: isReceiverBlocked? arrayRemove(user?.id)  : arrayUnion(user?.id)
  })
  changeBlock()
} catch (error) {
  console.log(error)
}
  }
  return (
    <div className="flex-1">
      {/* user  */}
      <div className="px-[1.875rem[ py-5 flex flex-col items-center gap-[.9375rem] border-b border-b-gray-600 ">
        <img
          src={user?.avatar || Avatar}
          alt="avatar"
          className="w-[6.25rem] h-[6.25rem] rounded-full object-cover"
        />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit.</p>
      </div>
      {/* info */}
      <div className="p-5 flex flex-col gap-[1.5625rem]">
        {/* Chat Settings */}
        <div className="">
          <div className="flex items-center justify-between">
            <span>Chat Settings</span>
            <button>
              <img
                src={ArrowUp}
                alt="ArrowUp"
                className="w-[1.875rem] h-[1.875rem] bg-black p-2.5 rounded-full"
              />
            </button>
          </div>
        </div>
        {/* privacy */}
        <div>
          <div className="flex items-center justify-between">
            <span>Privacy & help</span>
            <button>
              <img
                src={ArrowUp}
                alt="ArrowUp"
                className="w-[1.875rem] h-[1.875rem] bg-black p-2.5 rounded-full"
              />
            </button>
          </div>
        </div>
        {/* shared photos */}
        <div>
          <div className="flex items-center justify-between">
            <span>Shared photos</span>
            <button>
              <img
                src={ArrowDown}
                alt="ArrowDown"
                className="w-[1.875rem] h-[1.875rem] bg-black p-2.5 rounded-full"
              />
            </button>
          </div>
          <div className="flex flex-column gap-5 mt-5">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-5">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-[.3125rem] object-cover"
                />
                <span className="text-gray-200">photo</span>
              </div>
              <button>
                {" "}
                <img
                  src={Download}
                  alt="download"
                  className="w-[1.875rem] h-[1.875rem] rounded-full p-2.5 bg-black"
                />
              </button>
            </div>
          </div>
        </div>
        {/* Shared Files */}
        <div>
          <div className="flex items-center justify-between">
            <span>Shared Files</span>
            <button>
              <img
                src={ArrowUp}
                alt="ArrowUp"
                className="w-[1.875rem] h-[1.875rem] bg-black p-2.5 rounded-full"
              />
            </button>
          </div>
        </div>
        <button onClick={handleBlock} className="p-2.5 bg-red-800 hover:bg-red-900 border-none text-white rounded-[.3125rem]">
        {isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User Blocked" : "Block User"}
        </button>
        <button onClick={()=>auth.signOut()} className="p-2.5 bg-blue-800 hover:bg-blue-900 border-none text-white rounded-[.3125rem]">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
