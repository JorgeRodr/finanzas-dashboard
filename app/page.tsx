import { cookies } from "next/headers";
import Link from "next/link";

export default async function HomePage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const loggedIn = !!token;



  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Bienvenido a Finanzas Personales</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        Controla tus ingresos y gastos de forma sencilla. Accede a tu dashboard o crea una cuenta gratuita.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {loggedIn ? (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
          >
            Ir al Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition text-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition text-center"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
