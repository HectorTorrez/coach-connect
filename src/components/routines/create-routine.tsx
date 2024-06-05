"use client";
import {useEffect, useState} from "react";
import {FilePenLine} from "lucide-react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {toast} from "../ui/use-toast";

import {AddExercise} from "./add-exercises";
import {ExerciseForm} from "./create-routine.form";

import {ExerciseList} from "@/types/exerciseList";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {DeleteExercise} from "@/queries/routines";

interface CreateTemplatesProps {
  isEditing: boolean;
  templateId?: string;
  isEditingTemplateName?: string;
  isEditingExercises?: ExerciseList[];

  workoutId?: string;
}

export function DialogCreateRoutine({
  isEditing,
  isEditingExercises,
  isEditingTemplateName,
  workoutId,
  templateId,
}: CreateTemplatesProps) {
  const [templateName, setTemplateName] = useState("Template name");
  const [open, setOpen] = useState(false);
  const [exercisesList, setExercisesList] = useState<ExerciseList[]>([]);
  const {user} = useUser();
  const router = useRouter();

  const handleDeleteExercise = async (id: string) => {
    const userId = user?.id;

    if (userId === null || userId === undefined) {
      return toast({
        title: "You must be logged in to delete an exercise",
        variant: "destructive",
      });
    }
    const {data, error} = await DeleteExercise(id, userId);

    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    }
    if (data) {
      toast({
        title: "Exercise deleted",
        variant: "success",
      });
      router.refresh();
    }

    const newExercisesList = exercisesList.filter((exercise) => exercise.id !== id);

    setExercisesList(newExercisesList);
  };
  const handleClearTemplate = () => {
    setTemplateName("Template name");
    setExercisesList([]);
  };

  const handleListExercises = (exercises: ExerciseList[]) => {
    setExercisesList([...exercisesList, ...exercises]);
  };

  useEffect(() => {
    if (isEditing && isEditingTemplateName && isEditingExercises) {
      setTemplateName(isEditingTemplateName);
      setExercisesList(isEditingExercises);
    }
  }, [isEditing, isEditingTemplateName, isEditingExercises]);

  useEffect(() => {
    if (!open && !isEditing) {
      handleClearTemplate();
    }
  }, [open, isEditing]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button className="flex w-full justify-start " variant="link">
            <FilePenLine className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <Button className="w-[200px]" variant="primary">
            Create exercise
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <section className="mt-5">
            <Input
              required
              placeholder="Template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </section>
          <section>
            <AddExercise handleListExercises={handleListExercises} />
          </section>
          <section>
            <ExerciseForm
              exercisesList={exercisesList}
              handleClearTemplate={handleClearTemplate}
              handleDeleteExercise={handleDeleteExercise}
              isEditing={isEditing}
              open={open}
              setOpen={setOpen}
              templateName={templateName}
              workoutId={workoutId}
            />
          </section>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
