import { get } from "ronin"

await main()
console.log("✔️")

async function main() {
  const posts = await get.posts()
  console.log(posts)
}
