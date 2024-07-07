import jwt from "jsonwebtoken";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      session: {
        accountId: string;
        userId: string;
        backToUrl: string | undefined;
        shortLivedToken: string | undefined;
      };
    }
  }
}

export default async function authenticationMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("Authentication middleware called");
  try {
    const authorization = req.headers.authorization ?? req.query?.token;
    console.log("Authorization:", authorization);

    if (typeof authorization !== "string") {
      console.log("No valid authorization found");
      res
        .status(401)
        .json({ error: "not authenticated, no credentials in request" });
      return;
    }

    if (typeof process.env.MONDAY_SIGNING_SECRET !== "string") {
      console.log("Missing MONDAY_SIGNING_SECRET");
      res.status(500).json({ error: "Missing MONDAY_SIGNING_SECRET (should be in .env file)" });
      return;
    }

    console.log("Attempting to verify JWT");
    const decoded = jwt.verify(
      authorization,
      process.env.MONDAY_SIGNING_SECRET
    ) as any;
    console.log("Decoded JWT:", decoded);

    const { accountId, userId, backToUrl, shortLivedToken } = decoded;

    req.session = { accountId, userId, backToUrl, shortLivedToken };
    console.log("Session set:", req.session);

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    console.log(jwt)
    res
      .status(401)
      .json({ error: `authentication error: ${err.message}` });
  }
}