import app from "./app";
import { PORT } from "./utils/env";
import { connectPublisher } from "./redis/publisher";
import { connectSubscriber, startSubscriber } from "./redis/subscriber";

async function startServer() {
    await connectPublisher();
    await connectSubscriber();
    await startSubscriber();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();