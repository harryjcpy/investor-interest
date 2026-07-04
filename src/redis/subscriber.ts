import { createClient } from "redis";
import prisma from "../prisma/client";
import { getIO, getFounderSocket } from "../socket/socket";

export const subscriber = createClient({
  url: "redis://localhost:6379",
});

subscriber.on("error", (err) => {
  console.error("Redis Subscriber Error:", err);
});

export async function connectSubscriber() {
  if (!subscriber.isOpen) {
    await subscriber.connect();
    console.log("Redis Subscriber Connected");
  }
}

export async function startSubscriber() {
  await subscriber.subscribe("new-interest", async (message) => {
    try {
      console.log("New Event Received:", message);

      const { investorId, startupId } = JSON.parse(message);

      const startup = await prisma.startup.findUnique({
        where: {
          id: startupId,
        },
      });

      if (!startup) {
        console.log("Startup not found.");
        return;
      }

      const investor = await prisma.user.findUnique({
        where: {
          id: investorId,
        },
      });

      const notification = await prisma.notification.create({
        data: {
          userId: startup.founderId,
          message: `${
            investor?.name ?? "An investor"
          } expressed interest in your startup.`,
        },
      });

      console.log("Notification Created");

      const socketId = getFounderSocket(startup.founderId);

      if (socketId) {
        getIO().to(socketId).emit("new_interest", notification);

        console.log("Socket.IO Event Emitted");
      } else {
        console.log("Founder is currently offline.");
      }

    } catch (error) {
      console.error("Subscriber Error:", error);
    }
  });
}