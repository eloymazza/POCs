export const handler = async (
  event: Record<string, Record<string, string>>
) => {
  return {
    isAuthorized: event['headers']['authorizationtoken'] === 'test',
    context: {
      exampleKey: 'exampleValue',
    },
  };
};
