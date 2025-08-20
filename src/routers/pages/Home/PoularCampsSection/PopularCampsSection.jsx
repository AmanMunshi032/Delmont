import {} from "react";
import { Link } from "react-router";
import UseAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PopularCampsSection = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: camps = [], isPending } = useQuery({
    querykey: ["Populer-Camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/organizer");
      return res.data;
    },
  });
  if (isPending) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  // Sort by participantCount in descending order and take top 6
  // const sorted = data
  //   .sort((a, b) => b.participantCount - a.participantCount)
  //   .slice(0, 6);

  // setCamps(sorted);

  return (
    <section className="py-12 dark ">
      <div className="max-w-7xl mx-auto px-4  shadow-md rounded-2xl">
        <h2 className="text-4xl font-bold text-center mb-8">
          Popular Medical Camps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white  flex flex-col justify-between shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800  ">{camp.campName}</h3>
                <p className=" text-gray-800">
                  <strong>Fees:</strong> ${camp.campFees}
                </p>
               
                <p className="text-gray-800 ">
                  <strong>Description:</strong>{camp.description.slice(0, 80)}...
                </p>
                <p className="text-blue-600 font-medium ">
                  👥 Participants: {camp.participantCount}
                </p>
                 <Link
                              to={`/CampDetails/${camp._id}`}
                              className="btn  bg-cyan-300 rounded-lg hover:bg-cyan-500 mt-1 w-full"
                            >
                              View Details
                            </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 ">
          <Link to="/AvailableCamps">
            <button className="bg-cyan-300 mb-5 px-6 py-2 text-black font-bold rounded-full hover:bg-cyan-300 transition">
              See All Camps
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCampsSection;
