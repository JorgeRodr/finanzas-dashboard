'use client'

import { Login } from "@/interfaces/login";
import { auth } from "@/lib/firebase";
import { useLogin } from "@/store/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginPage() {
  const { login } = useLogin();
  const loginSchema = z.object({
    email: z.string().email('Formato de email incorrecto'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const submit = async (data: Login) => {
    try {
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-24 px-6 py-8 bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="ejemplo@email.com"
            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Contraseña</label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
