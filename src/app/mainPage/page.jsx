"use client";

import Profile from "../profile/page";
import Step1 from "../register/step1/page";


const MainPage = () => {
  const authenticated = localStorage.getItem("authenticated");

  return (
    <div>
      {authenticated ? <Profile /> : <Step1 />}
    </div>
  );
};

export default MainPage;
