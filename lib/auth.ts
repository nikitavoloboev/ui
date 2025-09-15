import { betterAuth } from "better-auth"
import { ronin as roninAdapter } from "@ronin/better-auth"
import ronin from 'ronin';

const client = ronin({
  token: process.env.BLADE_APP_TOKEN,
})

export const auth = betterAuth({
  database: roninAdapter(client),
})

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}