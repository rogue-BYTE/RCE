import { FaCircleUser } from "react-icons/fa6";

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

import { removeToken } from "../helpers";
import { logout } from '../store/slices/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    removeToken();
    dispatch(logout);
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-black h-[100px] w-full flex items-center justify-between px-6 text-white">
      <Link to="/"><div className="font-black text-xl">RCE</div></Link>
      <div className="text-sm flex items-center">
        <FaCircleUser className="mr-2" size={30} />
        { !isAuthenticated &&
          <Link to="/login">
            <p className="underline underline-offset-4 cursor-pointer">Sign up/Login</p>
          </Link>
        }
        {
          isAuthenticated && 
            <Dropdown>
              <DropdownTrigger>
                <p className="text-sm cursor-pointer">
                  { user?.username }
                </p>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">View Profile</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
        }
      </div>
    </div>
  );
}

export default Header;
