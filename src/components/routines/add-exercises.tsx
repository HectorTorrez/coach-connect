import {Button} from "../ui/button";

import ChooseExercise from "./choose-exercise";

import {ExerciseList} from "@/types/exerciseList";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";

interface AddExerciseProps {
  handleListExercises: (exercises: ExerciseList[]) => void;
}

export function AddExercise({handleListExercises}: AddExerciseProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="mb-5 mt-5">
        <Button variant="primary">Add exercise</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-10 mt-10">
          <section>
            <ChooseExercise handleListExercises={handleListExercises} />
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
