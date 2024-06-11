"use client";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";

import {Button} from "../ui/button";
import {toast} from "../ui/use-toast";

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
import {DeleteClientRoutine} from "@/queries/user-routines";
import {deleteWorkoutNote} from "@/queries/notes";

interface DeleteCurrentRoutineProps {
  clientId: string;
  user_id: string;
  noteId: string | number;
  disabled: boolean;
  type: "workout" | "meal";
}

export function DeleteNote({clientId, user_id, noteId, disabled, type}: DeleteCurrentRoutineProps) {
  const router = useRouter();
  const handleDeleteWorkoutNote = async () => {
    const {data, error} = await deleteWorkoutNote(user_id, clientId);

    if (error) {
      toast({
        title: "Error",
        description: "There is an error deleting the note. Please try again.",
        variant: "destructive",
      });
    }
    if (data !== null) {
      toast({
        title: "Note Deleted",
        description: "Note has been deleted successfully",
        variant: "success",
      });
      router.refresh();
    }
  };

  const handleDeleteMealNote = async () => {};

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
      >
        <div
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <Button
            className="flex w-full items-center justify-start "
            disabled={disabled}
            variant="desctructiveGhost"
          >
            <Trash2 className=" mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
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
            disabled={disabled}
            onClick={type === "workout" ? handleDeleteWorkoutNote : handleDeleteMealNote}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
