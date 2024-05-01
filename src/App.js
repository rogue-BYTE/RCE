import './App.css';

import Header from './components/header';

import AuthScreen from './pages/authScreen';
import LandingScreen from './pages/landingScreen';
import NotFoundScreen from './pages/notFoundScreen';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from "./helpers";

import { login } from './store/slices/authSlice';

import { API, BEARER } from "./constant";

function App() {
  const authToken = getToken();
  const dispatch = useDispatch();

  // TODO: Use isLoading in the template
  const [isLoading, setIsLoading] = useState(false);

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();
      dispatch(login(data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="login" element={<AuthScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
