"use client";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {Suspense} from "react";

import {Button} from "../ui/button";
import {toast} from "../ui/use-toast";

import {DeleteClient as DeleteC} from "@/queries/clients";
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

interface DeleteClientProps {
  reciever_id: string;
  coachId: string;
}

export function DeleteClient({reciever_id, coachId}: DeleteClientProps) {
  const router = useRouter();
  const handleDelete = async () => {
    const {data, error} = await DeleteC(coachId, reciever_id);

    if (error) {
      toast({
        title: error,
        variant: "destructive",
      });
    }

    if ((data?.length ?? 0) > 0) {
      toast({
        title: "Client deleted",
        variant: "success",
      });
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex  justify-center">
        <Button
          className=" flex items-center justify-center"
          size="icon"
          variant="desctructiveGhost"
        >
          <Trash2 className="h-4 w-4" />
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
