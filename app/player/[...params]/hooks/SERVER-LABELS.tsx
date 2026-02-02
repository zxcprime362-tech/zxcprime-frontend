import {
  IconBoltFilled,
  IconCheck,
  IconGhost2Filled,
  IconMinus,
  IconMoodLookDown,
  IconX,
} from "@tabler/icons-react";
import { ServerStatus } from "./useServerManager";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
export const getStatusLabel = (status: ServerStatus) => {
  switch (status) {
    case "queue":
      return (
        <span className="lg:text-base text-sm text-muted-foreground flex items-center justify-end gap-1.5">
          Queued <IconMinus size={15} strokeWidth={5} />
        </span>
      );
    case "checking":
      return (
        <span className="lg:text-base text-sm text-muted-foreground flex items-center justify-end gap-1.5">
          Checking <Tailspin size={15} stroke={5} color="white" />
        </span>
      );
    case "connecting":
      return (
        <span className="lg:text-base text-sm text-muted-foreground flex items-center justify-end gap-1.5 animate-pulse">
          Connecting <Tailspin size={15} stroke={5} color="white" />
        </span>
      );
    case "failed":
      return (
        <span className="lg:text-base text-sm text-red-700 flex items-center justify-end gap-1.5">
          Doesn't have the video <IconX size={15} strokeWidth={5} />
        </span>
      );
    case "available":
      return (
        <span className="lg:text-base text-sm text-green-700 flex items-center justify-end gap-1.5">
          Available <IconBoltFilled size={15} strokeWidth={5} />
        </span>
      );

    case "cancelled":
      return (
        <span className=" lg:text-base text-sm text-yellow-400">Cancelled</span>
      );
  }
};
