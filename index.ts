import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv"

import { get_first_message_from_channel } from "./src/discord"

dotenv.config()

const { TOKEN, CHANNEL_ID } = process.env;


const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  
  const channel: any = client.channels.cache.get(CHANNEL_ID ?? '');

  await get_first_message_from_channel(channel);

});

client.on('error', console.error);

client.login(TOKEN);
