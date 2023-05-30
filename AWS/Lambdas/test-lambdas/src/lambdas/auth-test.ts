export const handler = async (
  event: Record<string, Record<string, string>>
) => {
  return {
    isAuthorized:
      event['headers']['authorizationtoken'] ===
      '90200b01f9144f0db3814c7687f79b73',
    context: {
      exampleKey: 'exampleValue',
    },
  };
};
