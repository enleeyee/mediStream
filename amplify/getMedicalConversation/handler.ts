import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
    return "Hello from my first function!";
  };
  