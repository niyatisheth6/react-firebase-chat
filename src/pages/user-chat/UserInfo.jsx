import Avatar from "../../assets/img/avatar.png";
import More from "../../assets/img/more.png";
import Video from "../../assets/img/video.png";
import Edit from "../../assets/img/edit.png";
import { useUserStore } from "../../config/userStore";

function UserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="p-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img
          src={currentUser.avatar || Avatar}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Avatar;
          }}
          alt="avatar"
          className="w-[3.125rem] h-[3.125rem] object-cover rounded-full"
        />
        <h1 className="font-medium">{currentUser.username}</h1>
      </div>
      <div className="flex gap-5">
        <button>
          {" "}
          <img src={More} alt="More" className="w-5 h-5" />
        </button>
        <button>
          <img src={Video} alt="Video" className="w-5 h-5" />
        </button>
        <button>
          {" "}
          <img src={Edit} alt="Edit" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
