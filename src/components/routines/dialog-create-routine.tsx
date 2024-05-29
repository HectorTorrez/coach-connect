"use client";
import {useState} from "react";

import {Button} from "../ui/button";

import {AddExercise} from "./dialog-add-exercises";

import {ExerciseList} from "@/types/exerciseList";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";

export function DialogCreateRoutine() {
  const [exercisesList, setExercisesList] = useState<ExerciseList[]>([]);
  const handleListExercises = (exercises: ExerciseList[]) => {
    setExercisesList([...exercisesList, ...exercises]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create routine</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <section>
            <AddExercise handleListExercises={handleListExercises} />
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
