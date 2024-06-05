"use client";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Trash2} from "lucide-react";

import {toast} from "../ui/use-toast";
import {Button} from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {DeleteWorkout as DeleteW} from "@/queries/workout";

interface DeleteWorkoutProps {
  id: string;
}

export function DeleteWorkout({id}: DeleteWorkoutProps) {
  const {user} = useUser();
  const router = useRouter();

  if (!user) {
    toast({
      title: "Please login",
      variant: "destructive",
    });

    return;
  }
  const handleDelete = async () => {
    const {error} = await DeleteW(id, user?.id);

    if (error) {
      if (error) {
        toast({
          title: error,
          variant: "destructive",
        });

        return;
      }
    } else {
      toast({
        title: "Routine deleted",
        variant: "success",
      });
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button className="flex w-full items-center justify-start" variant="desctructiveGhost">
          <Trash2 className=" mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your workout and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="border border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
