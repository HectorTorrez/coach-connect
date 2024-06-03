"use client";

import React, {useState} from "react";
import {FilePenLine} from "lucide-react";

import {Button} from "../ui/button";

import {CreateWorkoutForm} from "./create-workout-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateWorkoutProps {
  isEdit: boolean;
  workoutId?: string;
  name?: string;
}

export function CreateWorkout({isEdit, workoutId, name}: CreateWorkoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button className="flex w-full items-center justify-start" variant="ghost">
            <FilePenLine className="mr-2 h-4 w-4" />
            <span>Edit </span>
          </Button>
        ) : (
          <Button variant="primary">Create workout</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle>{isEdit ? "Edit your workout program" : "Add workout program"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit your workout program for you routine"
              : "Create a new workout program for your routine."}
          </DialogDescription>
          <CreateWorkoutForm isEdit={isEdit} name={name} setOpen={setOpen} workoutId={workoutId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
