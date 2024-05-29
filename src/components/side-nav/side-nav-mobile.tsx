import {ClipboardIcon, HomeIcon, Menu, UserIcon} from "lucide-react";
import Link from "next/link";

import {Button} from "../ui/button";
import {ModeToggle} from "../dark-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {linkMenu} from "@/lib/link-menu";

export function SideNavMobile() {
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
              <Link className="flex items-center gap-2" href={item.href}>
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
