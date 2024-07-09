import { handler } from "./lambdas/todo-api-call";

const main = async () => {
  const result = await handler();
};

main();
