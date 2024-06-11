"use client";
import {useState} from "react";

import {Button} from "../ui/button";

import AddClientsForm from "./add-clients-form";

import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";

export function AddClients() {
  const [open, setOpen] = useState(false);

  const handleChangeModal = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-[300px]" variant="primary">
          Add client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <AddClientsForm handleChangeModal={handleChangeModal} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
