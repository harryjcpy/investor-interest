import { createClient } from "redis";

export const publisher = createClient({
    url: "redis://localhost:6379",
});

publisher.on("error", (err) => {
    console.error("Redis Publisher Error:", err);
});

export async function connectPublisher() {
    if (!publisher.isOpen) {
        await publisher.connect();
        console.log("Redis Publisher Connected");
    }
}