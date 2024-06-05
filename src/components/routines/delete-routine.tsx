"use client";
import {Trash2} from "lucide-react";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {Button} from "../ui/button";
import {toast} from "../ui/use-toast";

import {DeleteRoutine as DeleteR} from "@/queries/routines";
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

export function DeleteRoutine({id}: {id: string}) {
  const {user} = useUser();
  const router = useRouter();

  const handleDelete = async () => {
    const {data, error} = await DeleteR(id, user?.id ?? "");

    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    }
    if (data) {
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
