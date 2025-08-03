import React, { useContext } from 'react';
import DoctorCard from '../components/DoctorCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { DoctorContext } from '../context/DoctorContext';

const Home = () => {
  const { doctors, search, setSearch } = useContext(DoctorContext);

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.speciality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Find & Book a Doctor</h1>
        <SearchBar value={search} onChange={setSearch} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredDoctors.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
