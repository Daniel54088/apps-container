"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TicketForm from "./ticket-form";
import { TicketButtonProps } from "@/types/ticketpilot";
import { TicketButtonTypes } from "@/app/(app)/ticketpilot/constants";
import { flushSync } from "react-dom";

export default function TicketButton({
  actionType,
  disabled,
  onClick,
  children,
}: TicketButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (
    actionType === TicketButtonTypes.ADD ||
    actionType === TicketButtonTypes.EDIT
  ) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {actionType === TicketButtonTypes.ADD ? (
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
              {actionType === TicketButtonTypes.ADD
                ? "Add a new ticket"
                : "Edit ticket"}
            </DialogTitle>
          </DialogHeader>
          <TicketForm
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

  if (actionType === TicketButtonTypes.DELETE) {
    return (
      <Button variant="secondary" onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return <Button></Button>;
}
