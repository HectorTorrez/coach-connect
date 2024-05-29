import {useQuery} from "@tanstack/react-query";

import {getCategories} from "@/queries/get-categories";
import {getExercise} from "@/queries/get-exercisesList";
import {getTypes} from "@/queries/get-types";

export const useExerciseList = (userId: string) =>
  useQuery({
    queryKey: ["exercise_list"],
    queryFn: async () => await getExercise(userId),
  });

export const useTypes = () =>
  useQuery({
    queryKey: ["types"],
    queryFn: async () => await getTypes(),
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });
