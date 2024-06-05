"use client";
import {Ellipsis} from "lucide-react";
import {useState} from "react";

import {CreateWorkout} from "./create-workout";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {DeleteWorkout} from "@/components/routines/delete-workoute";

interface DropdownWorkoutProps {
  // workout?: {
  //   id: string;
  //   name: string;
  // };
  children: React.ReactNode;
}

export function DropdownWorkout({children}: DropdownWorkoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="focus-visible: h-full outline-none ring-offset-0 focus-within:ring-offset-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-0"
          size="icon"
          variant="ghost"
        >
          <Ellipsis className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-56 flex-col gap-2 ">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
