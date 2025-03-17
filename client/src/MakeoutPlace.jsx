import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

function MakeoutPlace({ name, description, rating, location, image }) {
  return (
    <div className="max-w-md bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 text-lg font-semibold">{rating}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt />
            <span className="ml-1">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeoutPlace;
