import React, {    useState } from 'react';
import useAuth from '../../../../../hooks/UseAuth';
import UseAxious from '../../../../../hooks/UseAxious';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
const formatDate = (iso) => new Date(iso).toLocaleString();
const Paymenthestory = () => {
     const [searchTerm, setSearchTerm] = useState("");
    const {user}=useAuth()
    const axiosSecure= UseAxious()
    const {isPending , data:Payments=[]}=useQuery({
        queryKey:['paymenthestory',user?.email],
        queryFn : async()=>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })
    console.log(user.email)
  
 const filteredCamps = useMemo (()=>{
     let result = [...Payments];
     if(searchTerm){
      const term = searchTerm.toLocaleLowerCase()
     result = result.filter((camp)=>camp.amount.toLowerCase().includes(term) 
   
  )
     }
     return result;

   },[Payments,searchTerm])

     if(isPending){
        return '.....Loading'
    }

    return (
        <div className='p-4'>
    <input
          type="text"
          placeholder="Search by Amount..."
          className="input input-bordered w-full md:w-1/3 mb-6 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
            <div className="overflow-x-auto shadow-md rounded-xl">
                 
                  
                 
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Amount</th>
                        <th>Transaction</th>
                        <th>Paid At</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCamps?.length > 0 ? (
                        filteredCamps.map((p, index) => (
                            <tr key={p.transactionId}>
                                <td>{index + 1}</td>
                                <td className="truncate" title={p.parcelId}>
                                    {p.ParticipantId}...
                                </td>
                                <td>৳ {p.amount}</td>
                                <td className="font-mono text-sm">
                                    <span title={p.transactionId}>
                                        {p.transactionId}...
                                    </span>
                                </td>
                                <td>{formatDate(p.paid_at_string)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Paymenthestory;