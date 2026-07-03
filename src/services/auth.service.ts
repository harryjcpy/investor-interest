import bcrypt from "bcrypt";
import prisma from "../prisma/client";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: "INVESTOR" | "FOUNDER";
}

export async function registerUser(data: RegisterUserData) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

const user = await prisma.user.create({
    data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
    },
    select: {
        id: true,
        name: true,
        email: true,
        role: true,
    },
});

  return user;
}