//  import { useParams } from "react-router-dom";

import JoinCampModal from "../JoinCampModal/JoinCampModal";
import {  useState } from "react";
// import JoinCampModal from "./JoinCampModal";

const CampDetails = () => {
//   const { campId } = useParams();

//    const [camp, setCamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetch(`/api/camps/${campId}`) // Replace with your API
//       .then((res) => res.json())
//       .then((data) => setCamp(data));
//   }, [campId]);

//   if (!camp) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src=''  className="rounded-xl w-full mb-4" />
      <h1 className="text-3xl font-bold">hello</h1>
      <p className="mt-2"><strong>Fees:</strong> $ 400</p>
      <p><strong>Date & Time:</strong> 4:24</p>
      <p><strong>Location:</strong> Faridpur</p>
      <p><strong>Healthcare Professional:</strong> fgrfgrgsdfg</p>
      <p><strong>Participants Joined:</strong> ddsgdsfgdsfg</p>
      <p className="mt-4">fgsdgsdgdsgsdfgsdf</p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
      >
        Join Camp
      </button>

      {isModalOpen && (
        <JoinCampModal
        //   camp={camp}
        //   user={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CampDetails;
