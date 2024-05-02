import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {Button} from "@nextui-org/button";

import RCE from '../logos/RCE_transparent.png';

export default function LandingScreen() {
  /*
    Get auth status
  */
  /*
    Get the docs associated with the loggedin user
    Set the docs in docs slice
  */
   /*
    Write a function to handle new doc
  */
  /*
    write a function to handle opening of an existing doc
  */
  return (
    <div className='px-6 py-10 flex items-center'>
      <div>
        <p className='text-7xl font-thin mb-16 text-gray-800'>Welcome to our Real-time Collaborative Editor!</p>
        <p className='text-xl font-medium w-[50%] text-gray-500 mb-16'>Experience seamless collaboration like never before. Write, edit, and brainstorm together in real-time with your
          team from anywhere in the world. Say goodbye to version control headaches and embrace the power of simultaneous
          editing.
        </p>
        <p className='text-xl font-black text-gray-500 mb-10'>Start creating, sharing, and collaborating effortlessly today!</p>
        <Link to="/login">
          <Button color="primary" className='bg-black w-[50%]' radius="none" fullWidth>
            Get started today!
          </Button>
        </Link>
      </div>
      <img src={RCE} alt="RCE" width={300} />
    </div>
  );
}