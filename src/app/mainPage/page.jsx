"use client";

import { useEffect } from "react";
import Profile from "../profile/page";
import Step1 from "../register/step1/page";
import { useRouter } from "next/navigation";


const MainPage = () => {
  const authenticated = localStorage.getItem("authenticated");
  const router = useRouter()

  useEffect(()=>{
    if(authenticated){
        router.push('/profile')
    }
  },[authenticated])

  return (
    <div>
      {authenticated ? <Profile /> : <Step1 />}
    </div>
  );
};

export default MainPage;
