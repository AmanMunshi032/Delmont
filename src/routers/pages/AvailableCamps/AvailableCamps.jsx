import React from 'react';
import UseAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import  { useState, useMemo } from "react";
import { FaTh, FaThLarge } from "react-icons/fa";
const AvailableCamps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("mostRegistered");
  const [isThreeColumn, setIsThreeColumn] = useState(true);
const axiosSecure = UseAxiosSecure()
  // Fetch camp data
    const {data: camps= []}=useQuery({
    
        querykey:['PopulerCamps'],
        queryFn : async ()=>{
          const res = await axiosSecure.get('/Alldata')
          return res.data
        }
       })

  // Filter and sort logic
  const filteredCamps = useMemo(() => {
    let result = [...camps];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (camp) =>
          camp.campName.toLowerCase().includes(term) ||
          camp.location.toLowerCase().includes(term) ||
          camp.doctor.toLowerCase().includes(term) ||
          camp.description.toLowerCase().includes(term) ||
          camp.dateTime.toLowerCase().includes(term)
      );
    }

    switch (sortBy) {
      case "mostRegistered":
        result.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case "campFees":
        result.sort((a, b) => a.campFees - b.campFees);
        break;
      case "alphabetical":
        result.sort((a, b) => a.campName.localeCompare(b.campName));
        break;
      default:
        break;
    }

    return result;
  }, [camps, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Available Medical Camps</h1>

      {/* Controls: Search, Sort, Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, location, date..."
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="mostRegistered">Most Registered</option>
          <option value="campFees">Camp Fees</option>
          <option value="alphabetical">Alphabetical (Name)</option>
        </select>

        <button
          className="btn btn-outline flex items-center gap-2"
          onClick={() => setIsThreeColumn(!isThreeColumn)}
        >
          {isThreeColumn ? (
            <>
              <FaTh className="text-lg" /> 2 Columns
            </>
          ) : (
            <>
              <FaThLarge className="text-lg" /> 3 Columns
            </>
          )}
        </button>
      </div>

      {/* Camp Cards */}
      <div
        className={`grid gap-6 ${
          isThreeColumn
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {filteredCamps.map((camp) => (
          <div
            key={camp._id}
            className="card bg-white border shadow-lg hover:shadow-2xl transition rounded-xl p-4"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="rounded-lg w-full h-40 object-cover mb-3"
            />
            <h2 className="text-xl font-semibold"> {camp.campName}</h2>
            <p className="text-gray-700">📅 
              <strong>Date & Time:</strong> {camp.dateTime}
            </p>
            <p className="text-gray-700">📍
              <strong>Location:</strong>{camp.location}
            </p>
            <p className="text-gray-700">🧑‍⚕️
              <strong>Healthcare Pro:</strong>{camp.doctor}
            </p>
            <p className="text-gray-700">👥
              <strong>Participants:</strong> {camp.participantCount}
            </p>
            <p className="text-gray-700">💸 
              <strong>Fees:</strong>{camp.campFees}
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              {camp.description.slice(0, 100)}...
            </p>

            <Link
              to={`/CampDetails/${camp._id}`}
              className="btn  bg-cyan-300 mt-4 w-full"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredCamps.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No camps found.</p>
      )}
    </div>
  );
};

export default AvailableCamps;
