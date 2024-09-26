"use client";

import { ToastContainer, toast } from "react-toastify"; 
import logicPage from "./logicPage";
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos de toastify

export default function Login() {
  

  const { onSubmit, register, handleSubmit, errors } = logicPage();
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}> {/* Usar handleFormSubmit */}
          <div className="mb-4">
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("correo", {
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.correo.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password" // Cambiar a type="password" para mayor seguridad
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("password", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 5, // Cambiar a 6 para coincidir con el mensaje de error
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Contenedor de notificaciones */}
    </div>
  );
}