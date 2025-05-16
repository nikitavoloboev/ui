import { model, string } from "ronin/schema"

export const User = model({
  slug: "user",
  fields: {
    email: string({ required: true, unique: true }),
    name: string({ required: true }),
  },
})
