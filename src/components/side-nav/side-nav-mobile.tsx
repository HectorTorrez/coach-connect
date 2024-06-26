"use client";
import {ChevronRight, ClipboardIcon, Dot, HomeIcon, Menu, UserIcon, Weight} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import {useState} from "react";
import {usePathname} from "next/navigation";

import {ModeToggle} from "../dark-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {linkMenu} from "@/lib/link-menu";
import {useMetric} from "@/context/metric-context";
import {cn} from "@/lib/utils";

export function SideNavMobile() {
  const {handleChangeMetric, metric} = useMetric();
  const [position, setPosition] = useState(metric);
  const pathname = usePathname();

  const onMetricChange = (value: string) => {
    handleChangeMetric(value);
    setPosition(value as "kg" | "lbs");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center  px-4 py-4">
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center gap-2">
          Coach Connect
          <ModeToggle />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {linkMenu.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem key={item.name} asChild>
              <Link
                className={cn("flex items-center gap-2", {
                  "text-accent, bg-[#27272a31] dark:bg-[#76767931]": pathname === item.href,
                })}
                href={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-1.5">
              <section className="flex items-center gap-2 ">
                <Weight className="h-4 w-4" />
                <span>Metrics</span>
              </section>
              <ChevronRight className="h-4 w-4" />
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
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
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
