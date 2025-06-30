"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const routes = [
  { label: "Instructor", path: "/instructor/courses" },
  { label: "Learning", path: "/learning" },
];

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white shadow-md h-16">
      <div className="mx-3">
        <h1 className="font-extrabold text-2xl">LMS Platform</h1>
      </div>
      {isSignedIn && (
        <div className="flex items-center gap-2 mx-3">
          <Input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-3 w-3xl focus:outline-2 focus:ring-2 focus:ring-blue-500"
          />
          <Button className=" cursor-pointer text-white rounded-md p-2 ">
            <Search />
          </Button>
        </div>
      )}
      {isSignedIn && (
        <div className="flex items-center gap-5">
          {routes.map((item, _idx) => (
            <Link
              className="font-semibold hover:underline hover:text-blue-500"
              key={_idx}
              href={item.path}
            >
             <Button variant={"outline"} className="cursor-pointer"> {item.label}</Button>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <Button variant={"outline"} className="cursor-pointer">
            <SignInButton forceRedirectUrl="/dashboard" />
          </Button>
          <SignUpButton forceRedirectUrl="/dashboard">
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
