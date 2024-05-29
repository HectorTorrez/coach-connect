import {Trash} from "lucide-react";

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
import {cn} from "@/lib/utils";

interface DeleteSetProps {
  onRemove: () => void;
  title?: string;
  icon?: string;
}

export function DeleteSet({onRemove, title}: DeleteSetProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn("flex w-full items-center", {
          "justify-center": !title,
        })}
      >
        {title ? title : <Trash className="w-5 text-red-400" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your set
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onRemove}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
