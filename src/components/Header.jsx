import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false);
  const [search, setSearch]=useSearchParams()
  useEffect(()=>{
  if(search.get("sign-in")){
    setshowSignIn(true)
  }
  },[search])


  const handleOutLay = (e) => {
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
      setSearch({})
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo (1).png" alt="logo" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setshowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
            <Link to="/postjobs"></Link>
            <UserButton
            appearance={{
              elements:{
                avatarBox:"w-10 h-10",
              }
            }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="myjobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="savedjobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed z-50 inset-0  flex items-center justify-center bg-black/50  "
          onClick={handleOutLay}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
