import { PrismaClient } from "@prisma/client";
import console from "console";
import { hashPassword } from "@/features/password/utils/hash-and-verify";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user",
    email: "wangandrw330@gmail.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 299,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed Started");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  const passwordHash = await hashPassword("password");
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed Finished (${t1 - t0} ms)`);
};

seed();
