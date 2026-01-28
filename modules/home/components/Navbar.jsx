import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserRole } from "@/src/generated/enums";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ userRole }) => {
  return (
    <nav className="top-4 left-1/2 z-50 fixed px-4 w-full max-w-5xl -translate-x-1/2 transform">
      <div className="bg-white/10 hover:bg-white/15 dark:bg-black/10 dark:hover:bg-black/15 shadow-black/5 shadow-lg dark:shadow-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl transition-all duration-200">
        <div className="flex justify-between items-center px-6 py-4">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/logo.svg"} alt="TreeBio" width={42} height={42} />
            <span className="font-bold text-amber-300 text-2xl tracking-widest">
              Solvix
            </span>
          </Link>

          <div className="flex flex-row justify-center items-center gap-x-4">
            <Link
              href="/problems"
              className="font-medium text-zinc-600 hover:text-amber-600 dark:hover:text-amber-400 dark:text-zinc-400 text-sm cursor-pointer"
            >
              Problems
            </Link>
            <Link
              href="/about"
              className="font-medium text-zinc-600 hover:text-amber-600 dark:hover:text-amber-400 dark:text-zinc-400 text-sm cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="font-medium text-zinc-600 hover:text-amber-600 dark:hover:text-amber-400 dark:text-zinc-400 text-sm cursor-pointer"
            >
              Profile
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <SignedIn>
              {userRole && userRole === UserRole.ADMIN && (
                <Link href={"/create-problem"}>
                  <Button variant={"outline"} size={"default"}>
                    Create Problem
                  </Button>
                </Link>
              )}
              <UserButton />
            </SignedIn>

            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-white/20 dark:hover:bg-white/10 font-medium text-sm"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button
                    size="sm"
                    className="bg-amber-400 hover:bg-amber-500 font-medium text-white text-sm"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
