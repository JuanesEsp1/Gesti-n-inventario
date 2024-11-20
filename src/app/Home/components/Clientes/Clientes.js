"use client";

import useClientes from "./useClientes";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from "../../../components/modal/Modal"
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


const clientes = () => {
    const {
        cliente,
        formatText,
        handleAddCliente,
        isModalOpen,
        setIsModalOpen,
        newCliente,
        setNewCliente,
        handleUpdateCliente,
        handleDeleteCliente,
        handleEditCliente,
        isEditModalOpen,
        setIsEditModalOpen,
        editCliente,
        setEditCliente,
        busqueda,
        setBusqueda,
        clientesFiltrados,
        alertDelete,
        clientesActuales,
        paginaActual,
        cambiarPagina,
        totalPaginas
    } = useClientes();


    return (
        <div className="container mx-auto pt-6 flex flex-col gap-4">
            <div className="w-full flex flex-row gap-2 items-center">
                <div className="relative flex flex-row gap-2 items-center">
                    <FiSearch className="absolute left-2 text-2xl text-gray-500" />
                    <input
                        className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                        type="text"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>
            <div className="min-w-full overflow-y-auto h-[60vh] shadow-lg mt-2 shadow-slate-300 rounded-lg">
                <table className="min-w-full table-auto bg-white  rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6">ID</th>
                            <th className="py-3 px-6">Nombre</th>
                            <th className="py-3 px-6">Correo</th>
                            <th className="py-3 px-6">Teléfono</th>
                            <th className="py-3 px-6">Documento</th>
                            <th className="py-3 px-6">Dirección</th>
                            <th className="py-3 px-6">Fecha de Nacimiento</th>
                            <th className="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-md  font-normal">
                        {clientesActuales.map((cliente) => (
                            <tr
                                key={cliente.id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {cliente.id}
                                </td>
                                <td className="py-3 px-6 text-left">{cliente.nombre}</td>
                                <td className="py-3 px-6 text-left">{formatText(cliente.correo)}</td>
                                <td className="py-3 px-6 text-left">{cliente.telefono}</td>
                                <td className="py-3 px-6 text-left">{cliente.documento}</td>
                                <td className="py-3 px-6 text-left">{cliente.direccion}</td>
                                <td className="py-3 px-6 text-left">{new Date(cliente.fecha_nacimiento).toLocaleDateString()}</td>
                                <td className="py-3 px-6 text-center flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEditCliente(cliente.id)}
                                        className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                        <MdEdit />
                                    </button>
                                    <button
                                        onClick={() => alertDelete(cliente.id, cliente.nombre)}
                                        className="bg-red-500 text-lg hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-end">
                <div className="flex items-center gap-2 bg-white p-4 rounded-lg text-lg shadow">
                    <button
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                        className={`p-2 rounded-full ${paginaActual === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                            }`}
                    >
                        <IoIosArrowBack />
                    </button>

                    {(() => {
                        let paginas = [];
                        if (totalPaginas <= 5) {
                            // Si hay 5 o menos páginas, mostrar todas
                            paginas = [...Array(totalPaginas)].map((_, i) => i + 1);
                        } else {
                            // Si estamos en las primeras 3 páginas
                            if (paginaActual <= 3) {
                                paginas = [1, 2, 3, '...', totalPaginas];
                            }
                            // Si estamos en las últimas 3 páginas
                            else if (paginaActual >= totalPaginas - 2) {
                                paginas = [1, '...', totalPaginas - 2, totalPaginas - 1, totalPaginas];
                            }
                            // Si estamos en medio
                            else {
                                paginas = [1, '...', paginaActual, '...', totalPaginas];
                            }
                        }

                        return paginas.map((pagina, index) => (
                            pagina === '...' ? (
                                <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => cambiarPagina(pagina)}
                                    className={`w-8 h-8 rounded-full ${paginaActual === pagina
                                        ? 'bg-[#7F88D5] text-white'
                                        : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                                        }`}
                                >
                                    {pagina}
                                </button>
                            )
                        ));
                    })()}

                    <button
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                        className={`p-2 rounded-full ${paginaActual === totalPaginas
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#7F88D5] hover:bg-[#7F88D5] hover:text-white'
                            }`}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>

            {isEditModalOpen === true ? (
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-2">Editar Cliente</h2>
                    <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
                    <form
                        className="w-[500px]  flex flex-col justify-center gap-4 "
                        onSubmit={handleUpdateCliente}>
                        <input
                            className="p-2 border border-gray-300 rounded-md outline-none"
                            type="text"
                            placeholder="Nombre"
                            value={editCliente.nombre}
                            onChange={(e) => setEditCliente({ ...editCliente, nombre: e.target.value })}
                            required
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-md outline-none"
                            type="text"
                            placeholder="Correo"
                            value={editCliente.correo}
                            onChange={(e) => setEditCliente({ ...editCliente, correo: e.target.value })}
                            required
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-md outline-none"
                            type="number"
                            placeholder="Teléfono"
                            value={editCliente.telefono}
                            onChange={(e) => setEditCliente({ ...editCliente, telefono: e.target.value })}
                            required
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-md outline-none"
                            type="number"
                            placeholder="Documento"
                            value={editCliente.documento}
                            onChange={(e) => setEditCliente({ ...editCliente, documento: e.target.value })}
                            required
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-md outline-none"
                            type="text"
                            placeholder="Dirección"
                            value={editCliente.direccion}
                            onChange={(e) => setEditCliente({ ...editCliente, direccion: e.target.value })}
                            required
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                onClick={handleUpdateCliente}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                                Editar
                            </button>
                        </div>
                    </form>
                </Modal>
            ) :
                null
            }

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-2">Agregar Cliente</h2>
                <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
                <form
                    className="w-[500px]  flex flex-col justify-center gap-4 "
                    onSubmit={handleAddCliente}>
                    <input
                        className="p-2 border border-gray-300 rounded-md outline-none"
                        type="text"
                        placeholder="Nombre"
                        value={newCliente.nombre}
                        onChange={(e) => setNewCliente({ ...newCliente, nombre: e.target.value })} required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded-md outline-none"
                        type="text"
                        placeholder="Correo"
                        value={newCliente.correo}
                        onChange={(e) => setNewCliente({ ...newCliente, correo: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded-md outline-none"
                        type="number"
                        placeholder="Teléfono"
                        value={newCliente.telefono}
                        onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded-md outline-none "
                        type="number"
                        placeholder="Documento"
                        value={newCliente.documento}
                        onChange={(e) => setNewCliente({ ...newCliente, documento: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded-md outline-none "
                        type="text"
                        placeholder="Dirección"
                        value={newCliente.direccion}
                        onChange={(e) => setNewCliente({ ...newCliente, direccion: e.target.value })}
                        required
                    />
                    <input
                        className="p-2 border border-gray-300 rounded-md outline-none "
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        value={newCliente.fecha_nacimiento}
                        onChange={(e) => setNewCliente({ ...newCliente, fecha_nacimiento: e.target.value })}
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded-md">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                            Agregar
                        </button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default clientes;
