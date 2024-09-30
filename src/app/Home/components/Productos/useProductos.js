import { useEffect, useState } from "react";

const useProductos = () => {

    const [producto, setProducto] = useState([]);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad: ''
    });

    useEffect(() => {
        getDataInit();
    }, [producto]);

const getDataInit = async () => {
  try {
    const response = await fetch('http://localhost:3001/productos');

    // Verifica si la respuesta es correcta
    if (!response.ok) {
      throw new Error('Error al obtener productos: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
    }

    const result = await response.json(); // Obtener el resultado en formato JSON

    setProducto(result);
    console.log('Datos obtenidos:', result); // Imprimir los datos obtenidos
    return result; // Retornar la información de productos
  } catch (error) {
    console.error('Error:', error.message); // Loguear el error
    throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
  }
  };
  

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error('Error al agregar producto: ' + response.statusText);
      }

      const result = await response.json();
      setProducto([...producto, result]);
      setNewProduct({ nombre: '', descripcion: '', precio: '', cantidad: '' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };  
    
 const formatText = (text) => {
      if (text == null) {
        return text;
      }
      if (text.length > 30) {
        return text.slice(0, 30) + '...';
      }
      return text;
  };


    return {
      producto,
      formatText,
      handleAddProduct,
      isModalOpen,
      setIsModalOpen,
      newProduct,
      setNewProduct 
    }
}

export default useProductos;
