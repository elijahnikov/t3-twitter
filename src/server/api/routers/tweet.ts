/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const tweetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        text: z.string({
          required_error: "Tweet text is required",
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text } = input;

      const userId = session.user.id;

      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
