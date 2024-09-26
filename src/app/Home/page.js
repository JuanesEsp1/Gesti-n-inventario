'use client';

import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Clientes from "./components/Clientes/Clientes";
import Productos from "./components/Productos/Productos";
import Usuarios from "./components/Usuarios/Usuarios";
import Ventas from "./components/Ventas/Ventas";
import Inventario from "./components/Inventario/Inventario";

const Home = () => {
 
    const [isOpen, setIsOpen] = useState(3);


    return (
        <div className="w-full h-full flex flex-row">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="w-full h-screen flex flex-col">
                    <div className="w-full h-28 bg-slate-200">
                        <div className="w-[400px] h-20 flex items-center pl-6 text-4xl font-semibold text-white bg-[#555e77]"> Seccion de Productos</div>
                    </div>
                <div className="w-full h-full ">
                    {
                        isOpen === 1 ? <Clientes />
                            : isOpen === 2 ? <Inventario />
                                : isOpen === 3 ? <Productos />
                                    : isOpen === 4 ? <Usuarios />
                                        : isOpen === 5 ? <Ventas />
                                            : null
                    }
                </div>
            </div>
            
        </div>
    );
}

export default Home;
