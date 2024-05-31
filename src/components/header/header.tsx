"use client";

import {usePathname} from "next/navigation";
import {SignIn, SignInButton, UserButton, useUser} from "@clerk/nextjs";

import {SearchClients} from "../clients/search";

export function Header() {
  const pathname = usePathname();
  const {user, isSignedIn} = useUser();

  return (
    <header className="flex h-[60px] items-center gap-4 border-b  px-3 ">
      <div className="w-full flex-1">{pathname === "/clients" && <SearchClients />}</div>
      {isSignedIn ? <UserButton afterSignOutUrl="/sign-in" /> : <SignInButton />}
    </header>
  );
}
