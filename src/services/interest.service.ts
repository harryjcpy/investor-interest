import prisma from "../prisma/client";
import { publisher } from "../redis/publisher";

export async function expressInterest(investorId: number, startupId: number) {
  const startup = await prisma.startup.findUnique({
    where: {
      id: startupId,
    },
  });

  if (!startup) {
    throw new Error("Startup not found");
  }

  const existingInterest = await prisma.interest.findUnique({
    where: {
      investorId_startupId: {
        investorId,
        startupId,
      },
    },
  });

  if (existingInterest) {
    throw new Error("Interest already expressed");
  }

  const interest = await prisma.interest.create({
    data: {
      investorId,
      startupId,
    },
  });

  await publisher.publish(
    "new-interest",
    JSON.stringify({
      investorId,
      startupId,
    }),
  );

  return interest;
}
