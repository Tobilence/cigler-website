import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  tags?: string[];
  _type?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const tags = body?.tags?.length
      ? body.tags
      : body?._type
        ? [body._type]
        : [];

    if (!tags.length) {
      return NextResponse.json(
        { revalidated: false, message: "No tags supplied" },
        { status: 400 },
      );
    }

    for (const tag of tags) revalidateTag(tag, "max");

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    console.error("Revalidate webhook failed:", err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
