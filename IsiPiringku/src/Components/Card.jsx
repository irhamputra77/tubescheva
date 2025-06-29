const Card = ({ title }) => {
  return (
    <div className="w-[360px] h-[220px] bg-transparent rounded-lg border border-white shadow-md flex items-center justify-center">
      <p className="text-gray-700 text-lg font-medium">{title}</p>
    </div>
  );
};

export default Card;