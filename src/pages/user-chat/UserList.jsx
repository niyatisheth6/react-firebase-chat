import UserInfo from './UserInfo'
import ChatList from './ChatList'

function UserList() {
  return (
    <div className='flex-1 flex flex-col'>
      <UserInfo/>
      <ChatList/>
    </div>
  )
}

export default UserList