import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";

export default function NotFound() {
  console.log(`the not found`);
  return (
    <Placeholder
      label="We could not find your ticket"
      button={
        <Button asChild variant="outline">
          <a href={ticketsPath()}>Go to Tickets</a>
        </Button>
      }
    />
  );
}
