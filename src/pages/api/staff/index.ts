import type { NextApiRequest, NextApiResponse } from "next";

import apiHandler from "@/lib/api-handler";
import { User } from "@/types";

export default apiHandler({
  get: getStaff
});

async function getStaff(req: NextApiRequest, res: NextApiResponse<User[]>) {
  return res.status(200).json([
    {
      id: "1",
      firstName: "John",
      lastName: "Admin",
      emailAddress: "jimbo@jimail.com",
      role: "ADMIN"
    },
    {
      id: "2",
      firstName: "John",
      lastName: "Repairer",
      emailAddress: "jambo@jimail.com",
      role: "REPAIRER"
    }
  ]);
}
