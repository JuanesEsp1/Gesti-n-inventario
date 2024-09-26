import { getUsuarios } from "@/db/db";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

const logicPage = () => {

    const router = useRouter(); 

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



    const onSubmit = async (data) => {
    // Aquí iría la lógica para manejar el inicio de sesión
    console.log("Intento de inicio de sesión con:", data);
    const response = await getUsuarios(data);
    console.log(response);
    if(response.length > 0){
      // router.push("/Home");
    }else{
      console.log("No se encontró el usuario");
    }
        console.log(response);
    };
    
    
    return {
        getUsuarios,
        onSubmit,
        register,
        handleSubmit,
        errors
    }
}

export default logicPage;