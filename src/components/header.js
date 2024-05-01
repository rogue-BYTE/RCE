import { FaCircleUser } from "react-icons/fa6";

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-black h-[75px] w-full flex items-center justify-between px-6 text-white">
      <Link to="/"><div className="font-black text-xl">RCE</div></Link>
      <div className="text-sm flex items-center">
        <FaCircleUser className="mr-2" size={30} />
        <Link to="/login">
          { isAuthenticated ? user?.username : 'Login' }
        </Link>
      </div>
    </div>
  );
}

export default Header;
