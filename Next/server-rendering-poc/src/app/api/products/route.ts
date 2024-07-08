export async function GET(req: Request, res: Response) {
  const url = new URL(req.url);
  const clientId = url.searchParams.get("clientid");
  try {
    const response = await fetch(
      `http://localhost:3001/products?clientid=${clientId}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
