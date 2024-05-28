"use client";
import React from "react";
import Link from "next/link";
import {
  BellIcon,
  CalendarIcon,
  ClipboardIcon,
  DumbbellIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import {ModeToggle} from "../dark-toggle";

import {Button} from "@/components/ui/button";

const linkMenu = [
  {name: "Dashboard", icon: HomeIcon, href: "/"},
  {name: "Clients", icon: UserIcon, href: "/clients"},
  // {name: 'Routines', icon: ClipboardIcon},
  // {name: 'Schedule', icon: CalendarIcon},
];

export function SideNav() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className=" border-r bg-gray-100/40 dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center justify-between gap-3 border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <span className="">Coach connect</span>
            </Link>
            <section className="flex justify-end gap-3">
              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <ModeToggle />
            </section>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {linkMenu.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    href={item.href}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}

              {/* <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <CalendarIcon className="h-4 w-4" />
                Schedule
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link> */}
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}
