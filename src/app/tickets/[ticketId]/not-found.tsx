import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="Ticket Not Found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Go back to tickets</Link>
        </Button>
      }
    />
  );
}
