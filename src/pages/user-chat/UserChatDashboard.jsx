import UserList from "./UserList";
import UserChat from "./UserChat";
import UserDetails from "./UserDetails";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

function UserChatDashboard() {
  const user = true;
  return (
    <div className="background">
      <div className="container">
        {user ? (
          <>
            <UserList />
            <UserChat />
            <UserDetails />
          </>
        ) : (
          <>
             <div className="h-full w-full flex items-center gap-[100px]">
             <Login />
            <div className="h-[80%] w-[.125rem] bg-gray-600"></div>
            <Signup/>
             </div>
         
          </>
        )}
      </div>
    </div>
  );
}

export default UserChatDashboard;
