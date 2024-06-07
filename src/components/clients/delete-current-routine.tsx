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

interface DeleteCurrentRoutineProps {
  clientId: string;
  user_id: string;
  routineId: string;
  disabled: boolean;
}

export function DeleteCurrentRoutine({
  clientId,
  user_id,
  routineId,
  disabled,
}: DeleteCurrentRoutineProps) {
  const router = useRouter();
  const handleDelete = async () => {
    const {data, error} = await DeleteClientRoutine(clientId, user_id, routineId);

    if (error) {
      toast({
        title: "An error occurred while deleting the routine",
        variant: "destructive",
      });

      return;
    }
    if ((data?.length ?? 0) > 0) {
      toast({
        title: "Routine deleted successfully",
        variant: "success",
      });
      router.refresh();
    }
  };

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
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
