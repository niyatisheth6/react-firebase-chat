import Avatar from "../../assets/img/avatar.png";

function AddUserModal() {
  return (
    <div className="p-[1.875rem] bg-black rounded-[.625rem] absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
      <form className="flex gap-5 ">
        <input type="text" placeholder="username" name="username" className="p-4 rounded-[10px] border-none outline-none"/>
        <button className="bg-blue-800 p-2.5 rounded-[10px] text-white">Search</button>
      </form>
      <div className="mt-[3.125rem] flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img src={Avatar} alt="avatar" className="w-[50px] h-[3.125rem] rounded-full object-cover"/>
          <span>Joen Doe</span>
        </div>
        <button className="bg-blue-800 p-2.5 rounded-[10px] text-white">Add User</button>
      </div>
    </div>
  );
}

export default AddUserModal;
