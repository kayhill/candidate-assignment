import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { getAdvocates } from "./controller"


const AdvocatesParamSchema = z.object({
  page: z.coerce.number().positive(),
  size: z.coerce.number().positive(),
  query: z.string().toLowerCase().optional()
});

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams

  const params = AdvocatesParamSchema.parse({
    page: searchParams.get('page') || 1,
    size: searchParams.get('size') || 5,
    query: searchParams.get('query') || ''
  })

  try {
    const data = await getAdvocates(params)
    return NextResponse.json({advocateCount: data[0][0].count, advocates: data[1]})
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } 
  }
}
