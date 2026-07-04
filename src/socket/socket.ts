import { Server } from "socket.io";

const founderSockets = new Map<number, string>();
let io: Server;

export function initializeSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client Disconnected:", socket.id);
      for (const [founderId, socketId] of founderSockets.entries()) {
        if (socketId === socket.id) {
          founderSockets.delete(founderId);

          break;
        }
      }
    });

    socket.on("register-founder", (founderId: number) => {
      founderSockets.set(founderId, socket.id);

      console.log(`Founder ${founderId} registered with socket ${socket.id}`);
    });
  });

  return io;
}

export function getFounderSocket(founderId: number) {
  return founderSockets.get(founderId);
}

export function getIO() {
  return io;
}
