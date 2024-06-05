"use client";
import {useEffect, useState} from "react";

import {Button} from "../ui/button";
import {Input} from "../ui/input";

import {AddExercise} from "./add-exercises";
import {ExerciseForm} from "./create-routine.form";

import {ExerciseList} from "@/types/exerciseList";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";

interface CreateTemplatesProps {
  isEditing: boolean;
  templateId?: string;
  isEditingTemplateName?: string;
  isEditingExercises?: ExerciseList[];
  editButton?: string;
  workoutId?: string;
  isEditingClassName?: string;
}

export function DialogCreateRoutine({
  isEditing,
  isEditingExercises,
  isEditingTemplateName,
  editButton,
  workoutId,
  isEditingClassName,
}: CreateTemplatesProps) {
  const [templateName, setTemplateName] = useState("Template name");
  const [open, setOpen] = useState(false);
  const [exercisesList, setExercisesList] = useState<ExerciseList[]>([]);

  const handleDeleteExercise = async (id: string) => {
    // await supabase.from("exercise").delete().eq("id", id);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px]" variant="primary">
          Create exercise
        </Button>
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
