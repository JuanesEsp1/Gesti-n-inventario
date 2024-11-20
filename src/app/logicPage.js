import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos
import { useEffect, useState } from "react";

const logicPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter(); 

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // // Inicializar el toast

    const onSubmit = async (data) => {
        console.log(data);
        
        const payload = {
            correo: data.correo,
            password: data.password
        };

        try {
            // Hacer la solicitud POST al servidor Express
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })


            const result = await response.json();
            console.log(result);
            if (response.ok) {
                if(result[0].rol == 'admin'){
                    toast.success("¡Inicio de sesión exitoso!");
                    console.log('Usuario autenticado:', result.user);
                    // Redirigir al usuario o guardar un token
                    router.push(`/Home?id=${result.id}`); // Ejemplo de redirección
                }else{
                    toast.error("¡No tienes permisos para acceder a esta sección!");
                }
            }else{
                toast.error("¡Error de credenciales!");
            }
        } catch (error) {
            console.error('Error al realizar el login:', error);
            // Mostrar mensaje de error del servidor
            toast.error('Error en el servidor');
        }
    };
    
    return {
        onSubmit,
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword
    };
};

export default logicPage;
