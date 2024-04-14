export async function get_first_message_from_channel(channel: any) {
  
  // Limit 100 is the maximum value.
  const messages = await channel?.messages?.fetch({limit: 100});
  
  console.log(`Received ${messages.size} messages`);

  console.log(messages.last(1));

  
  
  messages
    .forEach((message: any) => {
    // console.log(message)

    const message_data = {
      message_id: message.id,
      created_at: message.createdTimestamp,
      content: message.content,
      author: message.author.username
    }

    // console.log(message_data);
    
  });

}