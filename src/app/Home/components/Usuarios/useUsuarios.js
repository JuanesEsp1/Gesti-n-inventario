import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const useUsuarios = () => {

  const [usuario, setUsuario] = useState([]);
    
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(usuario);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editUsuario, setEditUsuario] = useState({
    id: '',
    nombre: '',
    correo: '',
    rol: '',
    activo: ''
  }); 
  
  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    correo: '',
    password: '',
    rol: ''
  });

    useEffect(() => {
        getDataInit();
    }, []);
  
    useEffect(() => {
      getDataInit();
    }, [refreshData]);
  

  useEffect(() => {
    const resultados = usuario.filter(usuario =>
      usuario.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );
    setUsuariosFiltrados(resultados);
  }, [busqueda, usuario]);


  const getDataInit = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarios');

      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Error al obtener productos: ' + response.statusText); // Manejo de errores si la respuesta no es correcta
      }

      const result = await response.json(); // Obtener el resultado en formato JSON
      orderUsuariosById(result);
      return result; // Retornar la información de productos
    } catch (error) {
      console.error('Error:', error.message); // Loguear el error
      throw new Error('Error en la solicitud: ' + error.message); // Manejo de errores
    }
  };

  const orderUsuariosById = (usuarios) => {
    const usuariosOrder = usuarios.sort((a, b) => a.id - b.id);
    setUsuario(usuariosOrder);
  }

  const handleAddUsuario = async (e) => {
      e.preventDefault();
      newUsuario.activo = true;
    try {
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsuario)
      });

      if (!response.ok) {
        alertError();
        throw new Error('Error al agregar producto: ' + response.statusText);
      }

      alertCreate();
      setRefreshData(!refreshData);
      const result = await response.json();
      setUsuario([...usuario, result]);
      setNewUsuario({ nombre: '', correo: '', password: '', rol: '', activo: '' }); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };  


  const handleUpdateUsuario = async (e) => {
      e.preventDefault();
      let estado = editUsuario.activo == 'true' || editUsuario.activo == true ? true : false;

    const updatedUsuario = {
      id: editUsuario.id,
      nombre: editUsuario.nombre,
      correo: editUsuario.correo,
      rol: editUsuario.rol, 
      activo: estado
      };
    try {
      const response = await fetch(`http://localhost:3001/usuarios/${editUsuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUsuario)  
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        setEditUsuario({
          id: '',
          nombre: '',
          correo: '',
          rol: '', 
          activo: ''
        });
        alertUpdate();
        setRefreshData(!refreshData);
        // setBusqueda('');
      } else {
        alertError();
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    } 
  }

  const handleDeleteUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {  
        setRefreshData(!refreshData);
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  } 

  
  const handleEditUsuario = (id) => {
    setIsEditModalOpen(true);
    const usuarioEncontrado = usuario.find(u => u.id === id);
    setEditUsuario(usuarioEncontrado);
  } 

    
 const formatText = (text) => {
      if (text == null) {
        return text;
      }
      if (text.length > 30) {
        return text.slice(0, 30) + '...';
      }
      return text;
  };

  /* ---------- alertas----------- */

  // alerta de eliminación  
  const alertDelete = (id, nombre) => {
    Swal.fire({
    title: "¿Estás seguro? ",
    text: "Esta acción es irreversible. ¿Quieres continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
          handleDeleteUsuario(id)
          Swal.fire({
              title: "Eliminado!",
              text: `El usuario (${nombre}) ha sido eliminado.`,
              icon: "success"
          });
      }
    });
  }

  // alerta de creacion de producto
  const alertCreate = () => {
    Swal.fire({
      title: "Usuario creado",
      text: "El usuario ha sido creado correctamente",
      icon: "success"
    });
  } 

  // alerta de actualización de producto
  const alertUpdate = () => {
    Swal.fire({
      title: "Usuario actualizado",
      text: "El usuario ha sido actualizado correctamente",
      icon: "success"
    });
  }

  // alerta de error
  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error al actualizar el usuario",
      icon: "warning"
    });
  }


  // paginador
  // ... otros estados ...
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 8; // Ajusta este número según necesites

  // Calcular usuarios para la página actual
  const indiceUltimo = paginaActual * usuariosPorPagina;
  const indicePrimero = indiceUltimo - usuariosPorPagina;
  const usuariosActuales = usuariosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };



    return {
      usuario,
      formatText,
      handleAddUsuario,
      isModalOpen,
      setIsModalOpen,
      newUsuario,
      setNewUsuario,
      handleUpdateUsuario,
      handleDeleteUsuario,
      handleEditUsuario,
      isEditModalOpen,
      setIsEditModalOpen,
      editUsuario,
      setEditUsuario,
      busqueda,
      setBusqueda,
      usuariosFiltrados,
      alertDelete,
      usuariosActuales,
      paginaActual,
      cambiarPagina,
      totalPaginas
    }
}

export default useUsuarios;
