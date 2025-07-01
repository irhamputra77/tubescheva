import React from 'react';
import BackgroundImage from '../assets/Article.png';

const Card = ({ title }) => {
  return (
    <div
      className="w-[550px] h-[287px] rounded-lg shadow-md bg-cover bg-center flex items-start justify-start p-4"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <p className="text-black text-sm font-medium">{title}</p>
    </div>
  );
};

export default Card;
