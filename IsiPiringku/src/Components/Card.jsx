import React from 'react';
import BackgroundImage from '../assets/Article.png';

const Card = ({ title }) => {
  return (
    <div
      className=" w-full  flex-shrink-0 
        sm:w-[200px] 
        md:w-[250px] 
        lg:w-[300px] 
        xl:w-[400px] 
        2xl:w-[450px]
        h-[250px] rounded-lg shadow-md bg-cover bg-center flex items-start justify-start p-4 m-2"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <p className="text-black text-sm font-medium">{title}</p>
    </div>
  );
};

export default Card;
