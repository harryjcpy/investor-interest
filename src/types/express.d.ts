import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: "INVESTOR" | "FOUNDER";
      };
    }
  }
}

export {};