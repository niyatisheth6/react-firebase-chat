import React, { useState } from "react";
import Search from "../../assets/img/search.png";
import Avatar from "../../assets/img/avatar.png";
import Plus from "../../assets/img/plus.png";
import Minus from "../../assets/img/minus.png";

function ChatList() {
  const [addMore, setAddMore] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-5 p-5">
        <div className="flex-1 bg-black flex items-center gap-5 rounded-[.625rem] p-2.5">
          <img src={Search} alt="Search" className="w-5 h-5" />
          <input
            type="text"
            placeholder="search"
            className="bg-transparent border-none outline-none text-white flex-1"
          />
        </div>
        <button onClick={()=>setAddMore((prev)=>!prev)}>
          <img
            src={addMore ? Minus : Plus}
            alt="Plus"
            className="w-9 h-9 bg-black p-2.5 rounded-[.625rem]"
          />
        </button>
      </div>
      <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-b-gray-600">
      <img src={Avatar} alt="Avatar" className="w-[3.125rem] h-[3.125rem] object-cover rounded-full" />
      <div className="flex flex-col gap-2.5">
        <h2 className="font-medium">Jane Doe</h2>
        <p className="text-sm">Hello</p>
      </div>
      </div>
    </div>
  );
}

export default ChatList;
