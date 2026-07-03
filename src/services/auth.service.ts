import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env";

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


interface LoginUserData {
  email: string;
  password: string;
}

export async function loginUser(data: LoginUserData) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

