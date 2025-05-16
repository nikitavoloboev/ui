import { create, drop } from "ronin";

export default () => [
  create.model({
    slug: "user",
    fields: { email: { required: true, unique: true, type: "string" }, name: { required: true, type: "string" } },
  }),
  drop.model("post"),
];
