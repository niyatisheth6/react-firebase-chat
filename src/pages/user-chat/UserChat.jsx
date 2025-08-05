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

function UserChat() {
  const endRef = useRef(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const handleEmoji = (e) => {
    console.log(e);
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex-[2] border-l flex flex-col border-r border-l-gray-600 border-r-gray-600 h-full">
      {/* top */}
      <div className="p-5 flex items-center justify-between border-b border-b-gray-600">
        <div className="flex items-center gap-5">
          <img
            src={Avatar}
            alt="avatar"
            className="w-[3.75rem] h-[3.75rem] rounded-full object-cover"
          />
          <div className="flex flex-col gap-[.3125rem]">
            <h2 className="text-lg font-bold">John Doe</h2>
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
        <div className="max-w-[70%] flex gap-5">
          <img
            src={Avatar}
            alt="avatar"
            className="w-[1.875rem] h-[1.875rem] rounded-full object-cover"
          />
          <div className="flex-1 flex flex-col gap-[.3125rem]">
            <p className="p-5 bg-blue-900 rounded-[.625rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, quam.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div>

        <div className="max-w-[70%] flex gap-5 self-end">
          <div className="flex-1 flex flex-col gap-[.3125rem]">
            <img
              src={Avatar}
              alt="avatar"
              className="w-full h-[300px] rounded-[10px] object-cover"
            />
            <p className="p-5 bg-blue-700 rounded-[.625rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, quam.
            </p>
            <span className="text-xs">1 min ago</span>
          </div>
        </div>
      </div>
      <div ref={endRef}></div>
      {/* bottom */}
      <div className="p-5 flex justify-between items-center border-t border-t-gray-600 gap-5 mt-auto">
        <div className="flex gap-5">
          <button>
            <img src={Img} alt="Img" className="w-5 h-5" />
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
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-black border-none outline-none text-white p-5 rounded-[.625rem] text-base"
        />

        <div className="relative">
          <button onClick={() => setOpenEmoji((prev) => !prev)}>
            <img src={Emoji} alt="Emoji" className="w-5 h-5" />
          </button>
          <div className="absolute bottom-[3.125rem] left-0">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="text-white bg-blue-400 py-2.5 px-5 border-none rounded-[.3125rem]">
          Send
        </button>
      </div>
    </div>
  );
}

export default UserChat;
