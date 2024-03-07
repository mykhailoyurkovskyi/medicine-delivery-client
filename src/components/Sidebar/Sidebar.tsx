import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { SidebarContext } from '../../contexts/SidebarContext';
import { CartContext } from '../../contexts/CartContext';
import CartItem from '../CartItem/CartItem';


const Sidebar = () => {

  const { isOpen, handleClose} = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <div className={`${isOpen ? 'right-0' : '-right-full'}  w-full bg-white fixed top-0 h-full
      shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all
      duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className='flex items-center justify-between py-6 border-b'>
        <div className='uppercase text-sm font-semibold'>Shopping Bag({itemAmount})</div>

        <div className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward
            onClick={handleClose}
            className='text-2xl transform hover:scale-105 transition duration-300 ease-in-out' 
          />
        </div>

      </div>
      
      <div className='flex flex-col gap-y-2 h-[520px] lg:h-[640px]
        overflow-y-auto overflow-x-hidden border-b'
      >
        {cart.map(cart => {
          return <CartItem key={cart.id} cart={cart} />
        })}

          <div className='flex flex-col gap-y-3 py-4 mt-4'>
            <div className='flex w-full justify-between items-center'>

              <div className='uppercase font-semibold'>
                <span className='mr-2'>Total:</span>$ {parseFloat(String(total)).toFixed(2)}
              </div>

              <div
                onClick={() => clearCart()}
                className='cursor-pointer py-4 bg-red-500 text-white w-12 h-12 
                  flex justify-center items-center text-xl 
                  transform hover:scale-105 transition duration-300 ease-in-out'
                >
              <FiTrash2 />
              </div>

            </div>
          </div>
    
         {/*  <Link 
            to={'/'}
            className='bg-gray-200 flex p-4 justify-center i
              tems-center text-primary w-full font-medium 
              hover:bg-gray-300 transition duration-300 ease-in-out'
          >
            View Cart
          </Link> */}
      
          <Link 
            to={'/checkout'}
            className='bg-primary flex p-4 justify-center i
            tems-center text-white w-full font-medium 
            hover:bg-opacity-80 transition duration-300 ease-in-out'
          >
            Checkout
          </Link>
      </div>
    </div>
  );
};

export default Sidebar;
