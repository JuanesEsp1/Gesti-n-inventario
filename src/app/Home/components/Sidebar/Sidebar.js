'use client'
import { FaShoppingCart, FaUsers, FaCalculator, FaUser, FaShoppingBasket, FaCog } from 'react-icons/fa';

const Sidebar = ({isOpen, setIsOpen}) => {
 
 

    return (
        <div className="bg-[#353b4c] text-white h-screen w-20 flex flex-col justify-between items-center py-4">
            <div className='w-full h-full max-h-[400px] text-xl flex flex-col items-center justify-center'>
                <div className="w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer">
                    logo
                </div>
                <div className='w-full h-full'>
                    <div onClick={()=>setIsOpen(1)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer ${isOpen === 1 ? 'bg-gray-700' : ''}`}>
                        <FaShoppingCart />
                    </div>
                </div>
                <div className='w-full h-full' >
                    <div onClick={()=>setIsOpen(2)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer ${isOpen === 2 ? 'bg-gray-700' : ''}`}>
                        <FaUsers />
                    </div>
                </div>
                <div className='w-full h-full   ' >
                    <div onClick={()=>setIsOpen(3)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer ${isOpen === 3 ? 'bg-gray-700' : ''}`}>
                        <FaCalculator />
                    </div>
                </div>
                <div className='w-full h-full' >
                    <div onClick={()=>setIsOpen(4)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer ${isOpen === 4 ? 'bg-gray-700' : ''}`}>
                        <FaUser />
                    </div>
                </div>
                <div className='w-full h-full' >
                    <div onClick={()=>setIsOpen(5)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer ${isOpen === 5 ? 'bg-gray-700' : ''}`}>
                        <FaShoppingBasket />
                    </div>
                </div>
            </div>
                <div className='w-full ' >
                    <div onClick={()=>setIsOpen(6)}  className={`w-full h-full flex items-center justify-center mb-4 hover:bg-gray-700  cursor-pointer ${isOpen === 6 ? 'bg-gray-700' : ''}`}>
                        <FaCog />
                    </div>
                </div>
            
            
        </div>
    );
};

export default Sidebar;
