import { defineFunction } from "@aws-amplify/backend";
    
export const getMedicalConversation = defineFunction({
  name: "get-Medical-Conversation",
  entry: "./handler.ts"
});
