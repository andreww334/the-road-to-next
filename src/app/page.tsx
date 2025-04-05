import { Suspense } from "react";
import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All Tickets" description="All tickets at one place" />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default HomePage;
