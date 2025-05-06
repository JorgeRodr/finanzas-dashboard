'use client'

import { User } from "@/interfaces/user";
import { useRegister } from "@/store/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterPage() {
  const { addUser, success } = useRegister();

  const registerSchema = z.object({
    displayName: z.string().min(1, 'Al menos 1 carácter'),
    email: z.string().email('Formato de email incorrecto'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<User>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  const submit = (data: User) => {
    addUser(data);
  };

  return (
    <div className="max-w-sm mx-auto mt-24 px-6 py-8 bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Crear cuenta</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Nombre</label>
          <input
            type="text"
            {...register('displayName')}
            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.displayName && (
            <p className="text-red-400 text-sm mt-1">{errors.displayName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Contraseña</label>
          <input
            type="password"
            {...register('password')}
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
          Registrarse
        </button>
      </form>
    </div>
  );
}
