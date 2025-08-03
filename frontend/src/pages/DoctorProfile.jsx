import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { Link } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(DoctorContext);

  const doctor = doctors.find(d => d.id.toString() === id);

  if (!doctor) return <p className="text-center mt-20 text-gray-500">Loading...</p>;


  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const formattedHour = hourNum % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-4">
      <div className="mb-4">
      <Link
         to="/"
        className="text-blue-600 hover:underline font-medium"
      >
      ← Back to Doctors
     </Link>
    </div>
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center">
        <div className="w-48 h-60 rounded-xl overflow-hidden shadow-md bg-blue-100 flex items-center justify-center mb-6 md:mb-0 md:mr-8">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
          <p className="text-gray-600 mt-1">
            {doctor.degree} — {doctor.speciality}
          </p>
          <p className="text-sm text-gray-500 mt-1">{doctor.experience}</p>

          <h3 className="mt-4 font-semibold text-gray-700">About</h3>
          <p className="text-gray-600 mt-1">{doctor.about}</p>

          <p className="mt-4 text-blue-600 font-semibold">
            Appointment fee: ₹{doctor.fees}
          </p>
        </div>
      </div>

     
      {doctor.schedule && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            Availability Schedule
          </h3>
          <ul className="divide-y divide-gray-200">
            {doctor.schedule.map((slot, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 text-gray-700"
              >
                <span className="font-medium">{slot.day}</span>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  {formatTime(slot.start)} – {formatTime(slot.end)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

    
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate(`/book/${doctor.id}`)}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
        >
          Book an appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorProfile;
