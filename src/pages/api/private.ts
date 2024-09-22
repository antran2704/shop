import { clerkClient } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   const { userId } = await req.body;

   const user = await clerkClient.users.getUser(userId);

   if (!user.privateMetadata.stripeId) {
      const stripeId = uuidv4();
      await clerkClient.users.updateUserMetadata(userId, {
         privateMetadata: {
            stripeId,
         },
      });

      res.status(201).json({ status: 201, message: "NEW_USER" });
   } else {
      res.status(200).json({
         status: 200,
         payload: "ok",
      });
   }
}
