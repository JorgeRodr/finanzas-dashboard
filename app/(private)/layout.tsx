import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";
import { redirect } from "next/navigation";


export default async function PrivateLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies();
  const token = await cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await adminAuth.verifyIdToken(token);
    // El token es válido: continúa al dashboard
    return <>{children}</>;
  } catch (err) {
    console.error("Token inválido o expirado", err);
    redirect("/login");
  }
}
