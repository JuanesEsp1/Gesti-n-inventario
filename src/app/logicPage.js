import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importar los estilos
import { useEffect, useState } from "react";

const logicPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [dataUser, setDataUser] = useState(null); // Cambiar a null para manejar objetos de usuario

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const payload = {
            correo: data.correo,
            password: data.password,
        };

        try {
            // Hacer la solicitud POST al servidor Express
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.length > 0) {
                // Asignar los datos del usuario a dataUser
                setDataUser(result[0]);

                if (result[0].rol === "admin") {
                    toast.success("¡Inicio de sesión exitoso!");

                    // Redirigir al usuario con su ID
                    router.push(`/Home?id=${result[0].id}`);
                } else {
                    toast.error("¡No tienes permisos para acceder a esta sección!");
                }
            } else {
                toast.error("¡Error de credenciales!");
            }
        } catch (error) {
            console.error("Error al realizar el login:", error);
            // Mostrar mensaje de error del servidor
            toast.error("Error en el servidor");
        }
    };

    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword,
        dataUser, // Puedes usar dataUser en otros componentes si es necesario
    };
};

export default logicPage;
