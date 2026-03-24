import { notFound } from "next/navigation";
import SessionContent from "./SessionContent";
import { getSessionById } from "@/lib/data/sessions";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({ id: String(id) }));
}

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sessionId = parseInt(id, 10);
  const session = getSessionById(sessionId);

  if (!session) {
    notFound();
  }

  return <SessionContent sessionId={sessionId} />;
}
