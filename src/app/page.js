'use client'; // Use client-side rendering

import React, { useState, useEffect } from 'react';

// Fetch car data function
const fetchCarData = async () => {
  const res = await fetch(
    'https://longdrivecarz.in/util/testing-home?limit=200'
  );
  const data = await res.json();
  return data.data.results; // Adjust based on actual response structure
};

const CarsPage = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('carsData', carsData);
  const [view, setView] = useState('card'); // 'card' or 'table'

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchCarData();
        setCarsData(data);
      } catch (error) {}
      setLoading(false);
    };

    getData();
  }, []);

  const toggleView = () => {
    setView(view === 'card' ? 'table' : 'card');
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Car List</h1>
      <button
        onClick={toggleView}
        className='bg-blue-500 text-white px-4 py-2 rounded mb-6'
      >
        Toggle to {view === 'card' ? 'Table' : 'Card'} View
      </button>
      {view === 'card' ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <span>Loading Cars Data !....</span>
          ) : (
            <>
              {carsData?.length &&
                carsData.map((car, index) => (
                  <div
                    key={index}
                    className='border rounded-lg p-4 shadow-md bg-gray-50'
                  >
                    <img
                      src={car?.car_image_front_view || 'https://s3.ap-south-2.amazonaws.com/ld-prod-image-urls/9182450770/images/car_image_back_inner_3228c8c3f54b4a21adef030dcd65fdc1.jpeg'}
                      alt='Car Front'
                      width={500}
                      height={400}
                      className='w-full h-48 object-cover rounded'
                    />
                    <h2 className='text-xl font-bold mt-4'>
                      {car?.maker_model}
                    </h2>
                    <p className='text-gray-600'>Owner: {car?.owner_name}</p>
                    <p className='text-gray-600'>
                      Location: {car?.geo_address}
                    </p>
                    <p className='text-gray-600'>
                      Price (6 hrs): ${car?.price_6_hours}
                    </p>
                    <p className='text-gray-600'>
                      Transmission: {car?.transmission_type}
                    </p>
                    <p className='text-gray-600'>Fuel Type: {car?.fuel_type}</p>
                    <p className='text-gray-600'>Seats: {car?.seater}</p>
                    <p className='text-gray-600'>
                      Distance: {car?.distance?.toFixed(2)} km
                    </p>
                    <p className='text-gray-600'>
                      Verified: {car?.is_rc_verified}
                    </p>
                  </div>
                ))}
            </>
          )}
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border'>
            <thead>
              <tr className='w-full bg-gray-100'>
                <th className='py-2 px-4 border'>Model</th>
                <th className='py-2 px-4 border'>Owner</th>
                <th className='py-2 px-4 border'>Location</th>
                <th className='py-2 px-4 border'>Price (6 hrs)</th>
                <th className='py-2 px-4 border'>Transmission</th>
                <th className='py-2 px-4 border'>Fuel Type</th>
                <th className='py-2 px-4 border'>Seats</th>
                <th className='py-2 px-4 border'>Distance (km)</th>
                <th className='py-2 px-4 border'>Verified</th>
              </tr>
            </thead>
            <tbody>
              {carsData?.length &&
                carsData.map((car, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='py-2 px-4 border'>{car?.maker_model}</td>
                    <td className='py-2 px-4 border'>{car?.owner_name}</td>
                    <td className='py-2 px-4 border'>{car?.geo_address}</td>
                    <td className='py-2 px-4 border'>${car?.price_6_hours}</td>
                    <td className='py-2 px-4 border'>
                      {car?.transmission_type}
                    </td>
                    <td className='py-2 px-4 border'>{car?.fuel_type}</td>
                    <td className='py-2 px-4 border'>{car?.seater}</td>
                    <td className='py-2 px-4 border'>
                      {car?.distance?.toFixed(2)}
                    </td>
                    <td className='py-2 px-4 border'>{car?.is_rc_verified}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
