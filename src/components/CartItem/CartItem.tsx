import React, { FC, useContext } from 'react';
import { CartContext, CartItemType } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';

type Props = {
  cart: CartItemType
}

const CartItem: FC<Props> = (props) => {
  const { 
    removeFromCart,
    increaseAmount,
    decreaseAmount 
  } = useContext(CartContext);
  const {id, name, price, photo, amount} = props.cart;


  return (
    <div className='flex gap-x-4 py-2 lg:px-6 border-b
    border-gray-200 w-full font-light text-gray-500'
    >
      <div className='w-full min-h-[150px] flex items-center gap-x-4'>
        <Link to={`/medicine/${id}`}>
          <img
            className='max-w-[80px]'
            src={`http://localhost:3008/${photo}`} alt='' 
          />
        </Link>
        <div className='w-full flex flex-col'>
          <div className='flex justify-between mb-2'>
            <Link 
              to={`/medicine/${id}`}
              className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            >
              {name}
            </Link>
            <div
              onClick={() => removeFromCart(id)}
              className='text-2xl cursor-pointer'
            >
              <IoMdClose className='text-gray-500 hover:text-red-500 transition' />
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px]'>
            <div className='flex flex-1 max-w-[100px]
            items-center h-full border text-primary font-medium'
          >
              <div
                onClick={() => decreaseAmount(id)}
                className='flex-1 flex justify-center items-center cursor-pointer'
              >
              <IoMdRemove />
              </div>

            </div>
            <div className='h-full flex justify-center items-center px-2'>{amount}</div>

            <div 
              onClick={() => increaseAmount(id)}
              className='flex-1 h-full flex justify-center items-center cursor-pointer'
            >
              <div>
                <IoMdAdd />
              </div>
            </div>

            <div className='flex-1 flex items-center justify-around'>{price}</div>
            
            <div className='flex-1 flex justify-end items-center text-primary font-medium'>
              {`$${parseFloat(String(price * amount)).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
