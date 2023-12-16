import {useSelector} from 'react-redux'
export default function Profile() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='flex flex-col max-w-lg mx-auto'>
      <h1 className="text-3xl text-center mt-5">My Profile</h1>
      <img src={currentUser.profilePicture} alt="my profile"
      className='h-24 w-24 object-cover self-center mt-3 rounded-full cursor-pointer '
       />

       <form className='flex flex-col gap-4 mt-5 p-3'>
        <input type="text" defaultValue={currentUser.username} placeholder='username' className='bg-slate-100 rounded-lg p-3'/>
        <input type="email" defaultValue={currentUser.email} placeholder='Email' className='bg-slate-100 rounded-lg p-3'/>
        <input type="password" placeholder='Password' className='bg-slate-100 rounded-lg p-3'/>
        <button className='bg-slate-600 p-3 rounded-lg text-white uppercase'>Update</button>

        <div className='flex justify-between m-5'>
          <span className="text-red-700 cursor-pointer">Delete Account</span><span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
       </form>
    </div>
  )
}
