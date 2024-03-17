import { z } from "zod";
import { router, privateProcedure, publicProcedure } from "./trpc";

const sampleRouter = router({
  ping: privateProcedure
    .input(
      z.object({
        ping: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.ping === "ping") {
        return "pong";
      }
    }),
  hello: publicProcedure.query(async ({ ctx, input }) => {
    return "Hello, world!";
  }),
});

export default sampleRouter;
