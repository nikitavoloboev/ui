import { router, privateProcedure } from "./trpc";
import prisma from "../config/prisma";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const userRouter = router({
  createNewUserIfRequired: privateProcedure.mutation(async ({ ctx, input }) => {
    const uid = ctx.user.uid;
    const phoneNumber = ctx.user.phoneNumber;
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: uid,
        },
      });
      if (existingUser) {
        return {
          message: "User already exists",
          data: existingUser,
          isNew: false,
        };
      }
      const createdUser = await prisma.user.create({
        data: {
          id: uid,
          phoneNumber: phoneNumber,
        },
      });
      return {
        message: "User created",
        data: createdUser,
        isNew: true,
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        message: "Unable to create user",
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
      });
    }
  }),
  getCurrentUser: privateProcedure.query(async ({ ctx }) => {
    const uid = ctx.user.uid;
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });
      return user;
    } catch (e: any) {
      console.error(e);
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2001") {
          throw new TRPCError({
            message: "User not found",
            code: "BAD_REQUEST",
            cause: e,
          });
        }
      }
      throw new TRPCError({
        message: "Unable to get user" + e.message,
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
      });
    }
  }),
  deleteAccount: privateProcedure.mutation(async ({ ctx }) => {
    const uid = ctx.user.uid;
    try {
      const user = await prisma.user.delete({
        where: {
          id: uid,
        },
      });
      return user;
    } catch (e) {
      throw new TRPCError({
        message: "User not found",
        code: "BAD_REQUEST",
        cause: e,
      });
    }
  }),
});

export default userRouter;
