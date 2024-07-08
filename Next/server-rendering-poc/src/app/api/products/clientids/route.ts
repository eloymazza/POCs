export async function GET(req: Request, res: Response) {
  console.log("CLIENTIDS!!!!!");
  try {
    const response = await fetch(`http://localhost:3001/products/clientids`, {
      headers: {
        "content-type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
