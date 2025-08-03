import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const formattedAvailability = doctor.availability?.slice(0, 2).map((slot, index) => (
    <span key={index} className="inline-block text-sm bg-blue-100 text-blue-800 rounded px-2 py-1 mr-2 mb-1">
      {slot}
    </span>
  ));

  return (
    <Link to={`/doctor/${doctor.id}`}>
      <div className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 text-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 mx-auto rounded-full border border-gray-300 object-cover"
        />
        <h2 className="text-lg font-semibold mt-3 text-gray-800">{doctor.name}</h2>
        <p className="text-gray-500 mb-2">{doctor.speciality}</p>
        <div className="flex flex-wrap justify-center">{formattedAvailability}</div>
      </div>
    </Link>
  );
};

export default DoctorCard;
