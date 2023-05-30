type Event = {
  headers: {
    authorizationtoken: string;
  };
};

export const handler = async (event: Event) => {
  return {
    isAuthorized:
      event['headers']['authorizationtoken'] === process.env['AUTH_TOKEN'],
  };
};
