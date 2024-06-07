"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

import {Button} from "../ui/button";
import {toast} from "../ui/use-toast";

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {insertUserRoutine} from "@/queries/user-routines";

interface ChooseWorkoutProps {
  workouts: {name: string; id: string}[] | null;
  clientId: string;
  coachId: string;
  setOpen?: (value: boolean) => void;
}

export function ChooseWorkout({workouts, clientId, coachId, setOpen}: ChooseWorkoutProps) {
  const [workoutId, setWorkoutId] = useState("");
  const router = useRouter();

  const handleAddWorkout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!workoutId) return toast({title: "Please select a workout", variant: "destructive"});
    const {data, error} = await insertUserRoutine(clientId, workoutId, coachId);

    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });

      return;
    }
    if (data) {
      toast({
        title: "Workout added",
        variant: "success",
      });
      router.refresh();

      setOpen && setOpen(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleAddWorkout}>
      <ToggleGroup
        className="flex flex-col  gap-2"
        type="single"
        onValueChange={(value) => setWorkoutId(value)}
      >
        {workouts?.map((workout) => (
          <ToggleGroupItem
            key={workout.id}
            // aria-label="Toggle bold"
            className=" h-[50px] w-full "
            value={workout.id}
            variant="outline"
          >
            <section>{workout.name}</section>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Button type="submit" variant="primary">
        Add workout
      </Button>
    </form>
  );
}
