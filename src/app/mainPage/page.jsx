"use client";

import { useState, useEffect } from "react";
import Profile from "../profile/page";
import Step1 from "../register/step1/page";


const MainPage = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("authenticated");
    setAuthenticated(authStatus);
  }, []);

  return (
    <div>
      {authenticated ? <Profile /> : <Step1 />}
    </div>
  );
};

export default MainPage;
