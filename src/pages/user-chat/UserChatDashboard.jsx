import UserList from "./UserList";
import UserChat from "./UserChat";
import UserDetails from "./UserDetails";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useUserStore } from "../../config/userStore";
import { useChatStore } from "../../config/chatStore";

function UserChatDashboard() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const { chatId } = useChatStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <div className="background">
      {isLoading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="container">
          {currentUser ? (
            <>
              <UserList />
            {chatId && (
              <>
               <UserChat />
               <UserDetails />
              </>
            )}  
            </>
          ) : (
            <>
              <div className="h-full w-full flex items-center gap-[100px]">
                <Login />
                <div className="h-[80%] w-[.125rem] bg-gray-600"></div>
                <Signup />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserChatDashboard;
