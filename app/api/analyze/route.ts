export async function POST(req: Request) {
  return Response.json({
    results: [
      { animal: "Wolf", score: 0.94 },
      { animal: "Raven", score: 0.71 },
      { animal: "Fox", score: 0.58 },
    ],
  });
}
