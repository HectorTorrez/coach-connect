"use client";

import type {Control} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";

import {Set} from "./set";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {ExerciseList} from "@/types/exerciseList";
import {useMetric} from "@/context/metric-context";

// import {useMetric} from "@/app/metric-context";

export const formSchema = z.object({
  exercises: z.array(
    z
      .object({
        dbId: z.string().optional(),
        name: z.string(),
        template_id: z.string().optional(),
        set: z.string().optional(),
        metric: z.string().optional(),
        created_at: z.string().optional(),
        order: z.number().optional(),
        sets: z.array(
          z.object({
            dbId: z.string().optional(),
            weight: z.coerce.number().nonnegative(),
            reps: z.coerce.number().nonnegative(),
            set: z.coerce.number().optional(),
            created_at: z.string().optional(),
          }),
        ),
      })
      .optional(),
  ),
});

interface ExerciseFormProps {
  handleDeleteExercise: (id: string) => void;
  exercisesList: ExerciseList[];
  templateName: string;
  setOpen: (open: boolean) => void;
  handleClearTemplate: () => void;
  isEditing?: boolean;
  open: boolean;
  editButton?: string;
}

export function ExerciseForm({
  exercisesList,
  handleDeleteExercise,
  templateName,
  setOpen,
  handleClearTemplate,
  isEditing,
  open,
  editButton,
}: ExerciseFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {fields, remove} = useFieldArray({
    name: "exercises",
    control: form.control,
  });

  const {user} = useUser();
  const router = useRouter();
  const {metric} = useMetric();

  // const onInvalid = (errors) => console.log({errors});

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({values});
  };

  const onEdit = async (values: z.infer<typeof formSchema>) => {};

  useEffect(() => {
    if (isEditing) {
      form.setValue(
        "exercises",
        exercisesList.map((exercise) => {
          return {
            name: exercise.name,
            created_at: exercise.created_at,
            metric: exercise.metric,
            order: exercise.order,
            sets: exercise.sets?.map((set) => {
              return {
                dbId: set.id,
                weight: set.weight,
                reps: set.reps,
                exercise_id: set.exercise_id,
                ...(isEditing ? {set: set.set} : {}),
                created_at: set.created_at,
              };
            }) ?? [
              {
                dbId: crypto.randomUUID(),
                weight: 0,
                reps: 0,
              },
            ],
            dbId: exercise.id,
            template_id: exercise.template_id,
          };
        }),
      );
    } else {
      form.setValue(
        "exercises",
        exercisesList.map((exercise) => {
          return {
            dbId: exercise.id,
            name: exercise.name,
            metric: metric,

            sets: [
              {
                dbId: crypto.randomUUID(),
                weight: 0,
                reps: 0,
              },
            ],
          };
        }),
      );
    }
  }, [exercisesList, isEditing, open]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  const values = form.getValues();

  return (
    <Form {...form}>
      <form
        className="mb-10 mt-10 flex flex-col gap-5"
        onSubmit={isEditing ? form.handleSubmit(onEdit) : form.handleSubmit(onSubmit)}
      >
        <section className="flex max-h-[340px] flex-col gap-5 overflow-y-auto">
          {fields.map((exercise, index) => {
            return (
              <Set
                key={exercise.dbId}
                control={form.control as unknown as Control}
                exercise={exercise}
                form={form}
                handleDeleteExercise={handleDeleteExercise}
                index={index}
                removeExercise={remove}
              />
            );
          })}
        </section>
        <Button
          disabled={
            Object.keys(values).length === 0 ||
            !values.exercises ||
            values.exercises.length === 0 ||
            !values.exercises.every((exercise) => exercise?.sets && exercise.sets.length > 0)
          }
          type="submit"
          variant="createTemplate"
        >
          {loading ? <Loader /> : isEditing ? editButton ? editButton : "edit" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
