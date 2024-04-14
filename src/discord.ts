export async function get_first_message_from_channel(channel: any) {
  
  // Limit 100 is the maximum value.
  const messages = await channel?.messages?.fetch({limit: 100});
  
  let result, batch = 1;

  // handling the case when total messages in channel less than 100
  if(messages.size === 0) {

    console.log("Channel is empty and there are no messages");   
    return null;

  } else if(messages.size < 100) {

    console.log(`Channel has total '${messages.size}' messages`);
    result = messages.last(1)[0] 

  } else {
    console.log(`Fetching batch_${batch} of  '${messages.size}' messages`);
    
    let messages_left_in_channel = true; 
    let last_message = messages.last(1)[0];
    let last_message_id = last_message.id;

    while (messages_left_in_channel) {
      let next_messages = await channel?.messages?.fetch({limit: 100, before: last_message_id});
      
      batch += 1;
      console.log(`Fetching batch_${batch} of  '${next_messages.size}' messages`);
      
      if(next_messages.size === 0) {
        result = last_message;
        messages_left_in_channel = false;
        break;
      } else if (next_messages.size < 100) {
        result = next_messages.last(1)[0];
        messages_left_in_channel = false;
        break;
      } else {
        last_message = next_messages.last(1)[0];
        last_message_id = last_message.id
      }
    }

  }

  
  return result;

}

export async function get_last_message_from_channel(channel: any) {
  
  // Limit 100 is the maximum value.
  const messages = await channel?.messages?.fetch({limit: 100});
  
  console.log(`Received ${messages.size} messages`);

  // list is sorted by latest messages first
  const first_message = messages.first(1)[0]
  console.log(first_message);


  return first_message;
}