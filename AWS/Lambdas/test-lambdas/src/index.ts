import { handler } from './lambdas/todo-api-call';

const main = async () => {
  const result = await handler();
  console.log('final result', result);
};

main();
