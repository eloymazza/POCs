import {
  DynamoDBClient,
  BatchExecuteStatementCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';

const REGION = 'us-east-1';
const TABLE_NAME = 'items';

const failResponse = (code = 400, message = 'Incorrect payload format') => {
  return {
    status: code,
    response: {
      message,
    },
  };
};

type Event = {
  body: string;
};

export const handler = async (event: Event) => {
  const body = JSON.parse(event.body);

  if (!body || !body.data || !body.data.item) {
    return failResponse();
  }

  const item = body.data.item;
  const client = new DynamoDBClient({ region: REGION });

  const id = Date.now().toString();
  const payload = {
    id: { S: id },
    type: { S: 'test' },
    data: { S: item },
  };

  const command = new PutItemCommand({
    TableName: 'items',
    Item: payload,
  });

  try {
    await client.send(command);
    return {
      status: 203,
      response: {
        message: 'Data written to DynamoDB successfully',
        data: payload,
      },
    };
  } catch (error) {
    console.error('Error writing to DynamoDB', error);
    return failResponse(500, JSON.stringify(error));
  }
};
