import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-lg">Auth App</h1>
        </Link>
        <ul className="flex gap-10 font-semibold">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to="/profile">
            {currentUser ? 
            <img src={currentUser.profilePicture}
            className="h-9 w-9 rounded-full object-cover" 
            alt='profile'/> :
            <li>Sign In</li>
          }
          </Link>

          {/* {currentUser ? 
                  <Link to='/profile'>
                  <img  src={currentUser.profilePicture} className="h-9 w-9 rounded-full object-cover"/> 
                  </Link>
                  : 
                  <Link to= '/sign-in'>
                  <li>Sign In</li>
                </Link> */}
        </ul>
      </div>
    </div>
  );
}
