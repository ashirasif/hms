
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      permissions: z.array(z.string()).min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          permissions: input.permissions,
        },
      });
    }),

});
