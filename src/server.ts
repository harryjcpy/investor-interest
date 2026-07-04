import http from "http";
import app from "./app";
import { PORT } from "./utils/env";
import { connectPublisher } from "./redis/publisher";
import { connectSubscriber, startSubscriber } from "./redis/subscriber";
import { initializeSocket } from "./socket/socket";

const server = http.createServer(app);

initializeSocket(server);

async function startServer() {
    await connectPublisher();
    await connectSubscriber();
    await startSubscriber();

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();