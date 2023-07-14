//need to figure out how to search without regards to the capitalisation 
// how would u 

import { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@prisma/client";

import prisma from "../../lib/prisma";

export default async function get_events(
  req: NextApiRequest,
  res: NextApiResponse<Event[]>
) {
  const { sortKey, sortMethod, search } = req.query; // Include 'search' query parameter
  console.log("Search word:", search);
  const sortObj: { [key: string]: "asc" | "desc" } = {};
  sortObj[sortKey as string] = sortMethod as "asc" | "desc";

  // Use 'search' query parameter to filter events
  const events = await prisma.event.findMany({
    where: {
      OR: [
        { name: { contains: search as string } },
        { location: { contains: search as string } },
        // Add more fields to search if necessary
      ],
    },
    orderBy: sortObj,
  });

  res.status(200).json(events);
}

export const config = {};
