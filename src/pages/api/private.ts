import { clerkClient } from "@clerk/nextjs";
import { getCookies } from "cookies-next";
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

      res.status(404).json({ status: 404, message: "new user" });
   } else {
      const { refreshToken, accessToken, publicKey, apiKey } = getCookies({
         req,
         res,
      });

      res.status(200).json({
         status: 200,
         payload: {
            refreshToken,
            accessToken,
            publicKey,
            apiKey,
         },
      });
   }
}
