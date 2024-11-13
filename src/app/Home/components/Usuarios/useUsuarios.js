import { useEffect, useState } from "react";

const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ nombre: '', correo: '', password: '', rol: '' });
    const [editUser, setEditUser] = useState({ id: '', nombre: '', correo: '', password: '', rol: '' });
    const [paginaActual, setPaginaActual] = useState(1);
    const usuariosPorPagina = 8;
  
    const usuariosFiltrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(busqueda.toLowerCase())
    );
  
    const indiceUltimo = paginaActual * usuariosPorPagina;
    const indicePrimero = indiceUltimo - usuariosPorPagina;
    const usuariosActuales = usuariosFiltrados.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  

    useEffect(() => {
        getUsersData();
    }, []);

    useEffect(() => {
        console.log(usuarios);
    }, [usuarios]);

    const getUsersData = async () => {
        const response = await fetch('http://localhost:3001/usuarios');
        const data = await response.json();
        setUsuarios(data);
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        setUsuarios([...usuarios, { ...newUser, id: Date.now(), fechaRegistro: new Date(), activo: true }]);
        setNewUser({ nombre: '', correo: '', password: '', rol: '' });
        setIsModalOpen(false);
    };

    const handleEditUser = (id) => {
        const usuario = usuarios.find(u => u.id === id);
        setEditUser(usuario);
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        setUsuarios(usuarios.map(u => u.id === editUser.id ? editUser : u));
        setIsEditModalOpen(false);
    };

    const handleDeleteUser = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
    };

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return {
        getUsersData,
    }
}

export default useUsuarios;