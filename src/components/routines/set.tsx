"use client";
import type {Control, FieldArrayWithId, UseFormReturn} from "react-hook-form";
import type {formSchema} from "./create-routine.form";
import type {z} from "zod";

import {useFieldArray} from "react-hook-form";
import {useEffect} from "react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {toast} from "../ui/use-toast";

import {DeleteSet} from "./delete-set";
import {DeleteExerciseMenu} from "./delete-exercise-menu";

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import supabase from "@/db/api/client";
import {Exercises, FieldsSet} from "@/types/exerciseList";
import {convertWeight} from "@/lib/convert-weight";
import {useMetric} from "@/context/metric-context";
import {DeleteSet as DeleteS} from "@/queries/routines";

interface SetProps {
  control: Control;
  exercise: Exercises;
  index: number;
  removeExercise: (index: number) => void;
  handleDeleteExercise: (id: string) => void;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function Set({
  control,
  exercise,
  index,
  removeExercise,
  handleDeleteExercise,

  form,
}: SetProps) {
  const {
    fields: untypedFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });
  const {metric: newMetric} = useMetric();
  const fields = untypedFields as unknown as FieldArrayWithId<FieldsSet>[];
  const router = useRouter();
  const {user} = useUser();
  const userId = user?.id;
  const removeSet = async (id: string, index: number) => {
    if (userId === null || userId === undefined) {
      return toast({
        title: "You must be logged in to delete an exercise",
        variant: "destructive",
      });
    }
    remove(index);

    const {data, error} = await DeleteS(id, userId);

    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    }
    if (data) {
      toast({
        title: "Set deleted",
        variant: "success",
      });
      router.refresh();
    }
  };

  const setCount = fields.length;

  useEffect(() => {
    const values = fields.map((field) => field.weight);
    const metric = exercise.metric;
    const res = convertWeight(values[0], metric ?? "", newMetric);

    form.setValue(`exercises.${index}.sets.0.weight`, res);
  }, []);

  return (
    <section className="flex flex-col justify-center gap-3">
      <section className=" flex w-full items-center justify-between">
        <FormField
          control={control}
          defaultValue={exercise.name}
          name={`exercises.${index}.name`}
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">{field.value}</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <DeleteExerciseMenu
          onRemove={() => {
            if (exercise.dbId) {
              removeExercise(index);

              handleDeleteExercise(exercise.dbId);
            }
          }}
        />
      </section>

      {fields.map((setField, setIndex) => {
        return (
          <section key={setField.id} className="grid grid-cols-4 justify-center gap-5">
            <FormField
              control={control}
              defaultValue={setCount}
              name={`exercises.${index}.sets.${setIndex}.set`}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Set</FormLabel>
                  <FormControl>
                    <Input
                      className="flex h-[20px] items-center justify-center text-center"
                      type="number"
                      {...field}
                      // disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              defaultValue={setField.weight}
              name={`exercises.${index}.sets.${setIndex}.weight`}
              render={({field}) => (
                <FormItem>
                  <FormLabel>{newMetric}</FormLabel>
                  <FormControl>
                    <Input
                      className="flex h-[20px] items-center justify-center text-center"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              defaultValue={setField.reps}
              name={`exercises.${index}.sets.${setIndex}.reps`}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      className="flex h-[20px] items-center justify-center text-center"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="flex items-center justify-center">
              {fields.length > 1 && (
                <DeleteSet
                  onRemove={() => {
                    removeSet(setField.dbId, setIndex);
                    // remove(setField.dbId);
                  }}
                />
              )}
            </section>
          </section>
        );
      })}

      <Button
        className="h-7"
        type="button"
        variant="addSet"
        onClick={() => append({dbId: crypto.randomUUID(), weight: 0, reps: 0})}
      >
        Add set
      </Button>
    </section>
  );
}
