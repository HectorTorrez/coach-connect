import {Suspense} from "react";

import ChooseExercise from "./dialog-choose-exercise";
import {DialogCreateRoutine} from "./dialog-create-routine";

import {ExerciseList} from "@/types/exerciseList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddExerciseProps {
  handleListExercises: (exercises: ExerciseList[]) => void;
}

export function AddExercise({handleListExercises}: AddExerciseProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full rounded-lg border border-blue-400 p-3 font-bold  text-blue-400">
        Add exercise
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-10 mt-10">
          <DialogCreateRoutine />
          <DialogDescription>
            <ChooseExercise handleListExercises={handleListExercises} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
