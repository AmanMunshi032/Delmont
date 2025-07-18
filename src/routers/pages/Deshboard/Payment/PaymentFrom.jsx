import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
//  import { useNavigate } from 'react-router';

// import Swal from 'sweetalert2';
import UseAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/UseAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { ParticipantId } = useParams();
  console.log(ParticipantId);
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  //  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { isPending, data: ParticipantInfo = {} } = useQuery({
    queryKey: ["Participants", ParticipantId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Participants/${ParticipantId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "...loading";
  }

  console.log(ParticipantInfo);
  const amount = ParticipantInfo.campFees;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    // step- 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
      //create payment Entend
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        ParticipantId,
      });
      const clientSecret = res.data.clientSecret;
      // step-3: confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          // const transactionId = result.paymentIntent.id;
          const paymentData = {
            ParticipantId,
            amount ,
            email: user.email,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            // ✅ Show SweetAlert with transaction ID
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
            //   html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go to My Parcels",
            });
          }
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-3 border rounded"></CardElement>
        <button
          type="submit"
          className="btn bg-cyan-300 text-black w-full"
          disabled={!stripe}
        >
          Pay <span className="text-xl font-bold">৳</span> {amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
