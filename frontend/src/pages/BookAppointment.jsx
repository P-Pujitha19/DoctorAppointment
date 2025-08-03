import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

const TimePicker = ({ onChange }) => {
  const [time, setTime] = useState({
    hour: '09',
    minute: '00',
    period: 'AM',
  });

  useEffect(() => {
    const formatted = `${time.hour}:${time.minute} ${time.period}`;
    onChange(formatted);
  }, []);

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const updatedTime = { ...time, [name]: value };
    setTime(updatedTime);
    const formatted = `${updatedTime.hour}:${updatedTime.minute} ${updatedTime.period}`;
    onChange(formatted);
  };

  const hours = [...Array(12).keys()].map(i => String(i + 1).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];
  const periods = ['AM', 'PM'];

  return (
    <div>
      <label className="block mb-1 text-gray-700 font-medium">Time</label>
      <div className="flex gap-2">
        <select name="hour" value={time.hour} onChange={handleTimeChange} className="border border-gray-300 p-3 rounded-md w-full">
          {hours.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <select name="minute" value={time.minute} onChange={handleTimeChange} className="border border-gray-300 p-3 rounded-md w-full">
          {minutes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select name="period" value={time.period} onChange={handleTimeChange} className="border border-gray-300 p-3 rounded-md w-full">
          {periods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
    </div>
  );
};

const BookAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/doctors.json')
      .then(res => res.json())
      .then(data => {
        const matchedDoctor = data.find(doc => doc.id === Number(id));
        setDoctor(matchedDoctor);
      });
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.date) {
      newErrors.date = "Date is required.";
    } else if (formData.date < today) {
      newErrors.date = "Date cannot be in the past.";
    }

    if (!formData.time) {
      newErrors.time = "Time must be selected.";
    }

    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <div className="mb-4">
  <Link
    to="/"
    className="text-blue-600 hover:underline font-medium"
  >
    ← Back to Doctors
  </Link>
</div>
      {doctor && (
        <div className="mb-8 text-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-green-200"
          />
          <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
          <p className="text-gray-600 text-sm">{doctor.speciality}</p>
        </div>
      )}

      {submitted ? (
        <div className="text-center bg-green-100 text-green-900 p-6 rounded-md shadow-md space-y-3">
          <h2 className="text-xl font-semibold mb-6 text-center border-b pb-2">Booked Successfully!</h2>
          <h3 className="text-xl font-semibold">Appointment Confirmed ✅</h3>
          <p>Your appointment with <strong>{doctor?.name}</strong> has been scheduled.</p>
          <p><strong>Date:</strong> {formData.date} &nbsp; | &nbsp; <strong>Time:</strong> {formData.time}</p>
          <p>A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold mb-6 text-center border-b pb-2">Appointment Form</h2>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-md"
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Date</label>
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-3 rounded-md"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <TimePicker onChange={(formattedTime) => setFormData(prev => ({ ...prev, time: formattedTime }))} />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-all"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
