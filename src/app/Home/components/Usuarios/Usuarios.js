import useProductos from "../Productos/useProductos";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from "../../../components/modal/Modal"
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import useUsuarios from "./useUsuarios";

const Usuarios = () => {

   const {
      getUsersData,
    } = useUsuarios();

   return (
      <div className="container mx-auto pt-6 flex flex-col gap-4">
         {/* <div className="w-full flex flex-row gap-2 items-center">
            <div className="w-full flex flex-row justify-between gap-2 items-center">
               <div className="text-2xl font-bold flex flex-row gap-2 items-center mb-2">
                  <div>Agregar usuario</div>
                  <button
                     className="bg-[#7F88D5] text-white font-bold py-2 px-4 rounded-md"
                     onClick={() => setIsModalOpen(true)}>
                     <MdAdd />
                  </button>
               </div>
            </div>
            <div className="relative flex flex-row gap-2 items-center">
               <FiSearch className="absolute left-2 text-2xl text-gray-500" />
               <input
                  className="p-2 pl-10 pr-4 border-[1.5px] border-gray-300 rounded-2xl outline-none"
                  type="text"
                  placeholder="Buscar usuario..."
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
                     <th className="py-3 px-6">Fecha de Registro</th>
                     <th className="py-3 px-6">Activo</th>
                     <th className="py-3 px-6">Rol</th>
                     <th className="py-3 px-6">Acciones</th>
                  </tr>
               </thead>
               <tbody className="text-gray-600 text-md  font-normal">
                  {usuariosActuales.map((usuario) => (
                     <tr
                        key={usuario.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                     >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                           {usuario.id}
                        </td>
                        <td className="py-3 px-6 text-left">{usuario.nombre}</td>
                        <td className="py-3 px-6 text-left">{usuario.correo}</td>
                        <td className="py-3 px-6 text-center">
                           {new Date(usuario.fechaRegistro).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6 text-center">
                           {usuario.activo ? (
                              <span className="bg-[#99A5E0] text-white py-2 px-4 rounded-full text-md">
                                 Sí
                              </span>
                           ) : (
                              <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">
                                 No
                              </span>
                           )}
                        </td>
                        <td className="py-3 px-6 text-center">{usuario.rol}</td>
                        <td className="py-3 px-6 text-center flex justify-center gap-2">
                           <button
                              onClick={() => handleEditUser(usuario.id)}
                              className="bg-blue-500 text-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                              <MdEdit />
                           </button>
                           <button
                              onClick={() => alertDelete(usuario.id, usuario.nombre)}
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

         {isEditModalOpen && (
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
               <h2 className="text-2xl font-bold mb-2">Editar Usuario</h2>
               <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
               <form
                  className="w-[500px]  flex flex-col justify-center gap-4 "
                  onSubmit={handleUpdateUser}>
                  <input
                     className="p-2 border border-gray-300 rounded-md outline-none"
                     type="text"
                     placeholder="Nombre"
                     value={editUser.nombre}
                     onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })}
                     required
                  />
                  <input
                     className="p-2 border border-gray-300 rounded-md outline-none"
                     type="email"
                     placeholder="Correo"
                     value={editUser.correo}
                     onChange={(e) => setEditUser({ ...editUser, correo: e.target.value })}
                     required
                  />
                  <input
                     className="p-2 border border-gray-300 rounded-md outline-none"
                     type="password"
                     placeholder="Contraseña"
                     value={editUser.password}
                     onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
                     required
                  />
                  <input
                     className="p-2 border border-gray-300 rounded-md outline-none"
                     type="text"
                     placeholder="Rol"
                     value={editUser.rol}
                     onChange={(e) => setEditUser({ ...editUser, rol: e.target.value })}
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
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                        Editar
                     </button>
                  </div>
               </form>
            </Modal>
         )}

         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-2xl font-bold mb-2">Agregar Usuario</h2>
            <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
            <form
               className="w-[500px]  flex flex-col justify-center gap-4 "
               onSubmit={handleAddUser}>
               <input
                  className="p-2 border border-gray-300 rounded-md outline-none"
                  type="text"
                  placeholder="Nombre"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} required
               />
               <input
                  className="p-2 border border-gray-300 rounded-md outline-none"
                  type="email"
                  placeholder="Correo"
                  value={newUser.correo}
                  onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
                  required
               />
               <input
                  className="p-2 border border-gray-300 rounded-md outline-none"
                  type="password"
                  placeholder="Contraseña"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
               />
               <input
                  className="p-2 border border-gray-300 rounded-md outline-none"
                  type="text"
                  placeholder="Rol"
                  value={newUser.rol}
                  onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
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
         </Modal> */}

      </div>
   )
}

export default Usuarios;    