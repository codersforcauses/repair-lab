export const getAuth = () => ({ userId: "Test" });

// vi.mock("@clerk/nextjs/server", () => {
//   return {
//     getAuth: vi.fn().mockReturnValue({ userId: "Test" })
//   };
// });
// vi.mock("@clerk/nextjs", () => {
//   return {
//     clerkClient: {
//       users: {
//         getUserList: vi.fn().mockReturnValue(mockClerkUsers)
//       }
//     }
//   };
// });
