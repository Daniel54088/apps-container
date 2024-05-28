"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";
import { PetButtonProps } from "@/types/pets";
import { PetButtonTypes } from "@/app/(app)/app/constants";
import { flushSync } from "react-dom";

export default function PetButton({
  actionType,
  disabled,
  onClick,
  children,
}: PetButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (actionType === PetButtonTypes.ADD || actionType === PetButtonTypes.EDIT) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {actionType === PetButtonTypes.ADD ? (
            <Button size="icon">
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="secondary">{children}</Button>
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === PetButtonTypes.ADD ? "Add a new pet" : "Edit pet"}
            </DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => {
              flushSync(() => {
                setIsDialogOpen(false);
              });
            }}
          />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (actionType === PetButtonTypes.DELETE) {
    return (
      <Button variant="secondary" onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return <Button></Button>;
}
