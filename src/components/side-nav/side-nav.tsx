"use client";
import React, {useState} from "react";
import Link from "next/link";
import {
  BellIcon,
  CalendarIcon,
  ChevronRight,
  ClipboardIcon,
  DumbbellIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  Weight,
} from "lucide-react";
import {DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {usePathname} from "next/navigation";

import {ModeToggle} from "../dark-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";

import {Button} from "@/components/ui/button";
import {linkMenu} from "@/lib/link-menu";
import {cn} from "@/lib/utils";
import {useMetric} from "@/context/metric-context";

export function SideNav() {
  const {handleChangeMetric, metric} = useMetric();
  const [position, setPosition] = useState(metric);
  const pathname = usePathname();

  const onMetricChange = (value: string) => {
    handleChangeMetric(value);
    setPosition(value as "kg" | "lbs");
  };

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
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      {
                        "text-accent, bg-[#27272a31] dark:bg-[#76767931]": pathname === item.href,
                      },
                    )}
                    href={item.href}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-3 py-1.5">
                  <section className="flex items-center gap-2 ">
                    <Weight className="h-4 w-4" />
                    <span>Metrics</span>
                  </section>
                  <ChevronRight />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    className="flex flex-col gap-2"
                    value={position}
                    onValueChange={onMetricChange}
                  >
                    <DropdownMenuRadioItem
                      className={cn("", {
                        "bg-[#27272a31]": position === "kg",
                      })}
                      value="kg"
                    >
                      <span className=" text-[14px]">Kg</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className={cn("", {
                        "bg-[#27272a31]": position === "lbs",
                      })}
                      value="lbs"
                    >
                      <span className=" text-[14px]"> Lbs</span>{" "}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
