import prisma from "../prisma/client";

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

return interest;
}
