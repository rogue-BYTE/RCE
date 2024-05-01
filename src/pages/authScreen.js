import { useState } from "react";

import { Input } from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {Tabs, Tab} from "@nextui-org/react"; 

import { API } from "../constant";
import { setToken } from "../helpers";

import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { login } from '../store/slices/authSlice';

export default function AuthScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState('');

  const handleSignup = async () => {
    setIsLoading(true);
    try {
        const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      }
      else {
        setToken(data.jwt);
        dispatch(login(data.user));
        navigate("/", { replace: true });
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const value = {
        identifier: email,
        password: password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      }
      else {
        setToken(data.jwt);
        dispatch(login(data.user));
        navigate("/", { replace: true });
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center h-full flex-col pt-16">
      <p className="text-black text-4xl font-black mb-4">Get started with RCE</p>
      <div className="h-[450px] w-[650px] px-32 pt-10">
        <Tabs variant="bordered" color="default" radius="none" fullWidth
          classNames={{
            tabList: "bg-black",
          }}
        >
          <Tab key="sign_up" title="Sign up">
            <Input
              type="text"
              label="Username"
              radius="none"
              labelPlacement="outside"
              placeholder="Pick a username"
              className="pb-8 pt-2"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="email"
              label="Email"
              radius="none"
              labelPlacement="outside"
              placeholder="Enter your email"
              className="pb-8"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              radius="none"
              labelPlacement="outside"
              placeholder="Set up a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-center pt-8">
              <Button
                color="primary"
                radius="none"
                className="w-full bg-black"
                isLoading={isLoading}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </div>
          </Tab>
          <Tab key="login" title="Login">
            <Input
              type="email"
              label="Email"
              radius="none"
              labelPlacement="outside"
              placeholder="Enter your email"
              className="pb-8 pt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              radius="none"
              labelPlacement="outside"
              placeholder="Set up a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-center pt-8">
              <p color="primary" className="font-semibold underline text-gray-700 cursor-pointer">Reset password</p>
              <Button
                color="primary"
                radius="none"
                className="w-[50%] bg-black"
                isLoading={isLoading}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}