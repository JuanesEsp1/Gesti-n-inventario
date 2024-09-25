'use client';

import { useState } from 'react';

const Productos = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Producto 1', precio: 100 },
        { id: 2, nombre: 'Producto 2', precio: 200 },
    ]);
    const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });
    const [editando, setEditando] = useState(null);

    const agregarProducto = (e) => {
        e.preventDefault();
        if (nuevoProducto.nombre && nuevoProducto.precio) {
            setProductos([...productos, { ...nuevoProducto, id: Date.now() }]);
            setNuevoProducto({ nombre: '', precio: '' });
        }
    };

    const eliminarProducto = (id) => {
        setProductos(productos.filter(producto => producto.id !== id));
    };

    const editarProducto = (producto) => {
        setEditando(producto.id);
        setNuevoProducto({ nombre: producto.nombre, precio: producto.precio });
    };

    const actualizarProducto = () => {
        setProductos(productos.map(producto => 
            producto.id === editando ? { ...producto, ...nuevoProducto } : producto
        ));
        setEditando(null);
        setNuevoProducto({ nombre: '', precio: '' });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            
            <form onSubmit={editando ? actualizarProducto : agregarProducto} className="mb-4">
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {editando ? 'Actualizar' : 'Agregar'}
                </button>
            </form>

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Precio</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td className="border p-2">{producto.nombre}</td>
                            <td className="border p-2">${producto.precio}</td>
                            <td className="border p-2">
                                <button onClick={() => editarProducto(producto)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                                    Editar
                                </button>
                                <button onClick={() => eliminarProducto(producto.id)} className="bg-red-500 text-white p-1 rounded">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;