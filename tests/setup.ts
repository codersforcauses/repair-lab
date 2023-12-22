import prisma from "../src/lib/prisma";

export default prisma;

// ensure that tests cant access Clerk - mocks only
process.env.CLERK_SECRET_KEY = "";
