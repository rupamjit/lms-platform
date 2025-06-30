import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md h-16">
      <div className="mx-3">
        <h1 className="font-extrabold text-2xl">LMS Platform</h1>
      </div>
      <div className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <Button variant={"outline"} className="cursor-pointer">
            <SignInButton />
          </Button>
          <SignUpButton>
            <Button className=" cursor-pointer">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
