import { get_subscribed_by_username } from "~/api/get_subscribed_by_username";

const TOKEN = "";

void async function main () {
  const subscribed = await get_subscribed_by_username(TOKEN);

  for (const item of subscribed) {
    console.log(`[${item.type}] ${item.name} (${item.id})`);
  }
}();
