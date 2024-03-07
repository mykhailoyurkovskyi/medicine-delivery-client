import React from 'react';
import health from '../../assests/health-hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div> Take care of your health!
          </div>
  
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            Over 50,000 products for your health and beauty <br />
            <span className='font-semibold'>Permanent Promotions and Discounts. Loyalty program.</span>
          </h1>
          <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary'>
            Discover more
          </Link>
        </div>
  
        <div className='hidden lg:block'>
          <img src={health} alt='' />
        </div>
      </div>
    </section>
  );
  
};

export default Hero;
