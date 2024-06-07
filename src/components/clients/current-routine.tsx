"use client";
import {useState} from "react";
import React from "react";

import {Button} from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CurrentRoutineProps {
  title: string;
  children: React.ReactNode;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "desctructiveGhost"
    | "outline"
    | "secondary"
    | "ghost"
    | "primary"
    | "addSet"
    | "createTemplate"
    | null
    | undefined;
  className?: string;
}

export function CurrentRoutine({title, children, variant, className}: CurrentRoutineProps) {
  const [open, setOpen] = useState(false);

  const childrenWithProps = React.Children.map(children, (child) => {
    // Ensure the child is a valid React element
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {setOpen, open} as React.Attributes & {
        setOpen: (value: boolean) => void;
        open: boolean;
      });
    }

    return child;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant={variant}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <section className="scrollbar h-[500px] max-h-[500px] overflow-y-scroll">
          {childrenWithProps}
        </section>
      </DialogContent>
    </Dialog>
  );
}
