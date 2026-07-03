import prisma from "../prisma/client";

export async function getNotifications(userId: number) {
    const notifications = await prisma.notification.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 20,
    });

    return notifications;
}