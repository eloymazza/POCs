import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

const REGION = "us-east-1";
const TABLE_NAME = "items";

const failResponse = (code = 400, message = "Incorrect payload format") => {
  return {
    status: code,
    response: {
      message,
    },
  };
};

export const handler = async () => {
  const client = new DynamoDBClient({ region: REGION });

  const command = new ScanCommand({
    TableName: TABLE_NAME,
  });

  const scanResults = [];
  let items;

  try {
    items = await client.send(command);
  } catch (error) {
    console.error("Error writing to DynamoDB", error);
    return failResponse(500, JSON.stringify(error));
  }
};
