"use client";
import {Button} from "../ui/button";

import AddClientsForm from "./add-clients-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddClients() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <AddClientsForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
