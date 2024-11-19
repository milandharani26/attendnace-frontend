import { Button, Typography } from '@mui/material';
import React from 'react';

// Define the type for the Razorpay response
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Extend the window object to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment: React.FC = () => {
  const amount = 500;
  const currency = "INR";
  const reciptId = "qwsaql";

  const paymentButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Fetch order details from your API
    const response = await fetch("http://localhost:3000/api/v1/payment/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        recipt: reciptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order = await response.json();

    // Define the options for Razorpay
    const options = {
      key: "YOUR_KEY_ID", // Replace with your Razorpay Key ID
      amount, // Amount in subunits (e.g., 50000 paise for INR)
      currency,
      name: "Acme Corp", // Your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo", // Your logo URL
      order_id: order.id, // The order ID obtained from your API response
      handler: async function (response: RazorpayResponse) {
        const body = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        // Send the payment details to your server for verification
        const validateResponse = await fetch("http://localhost:3000/api/v1/payment/validate", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonRes = await validateResponse.json();
      },
      prefill: {
        name: "milan Dharani", // Customer's name
        email: "milandharani@example.com", // Customer's email
        contact: "9586449885", // Customer's phone number
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Initialize Razorpay and handle payment failures
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    // Open Razorpay checkout modal
    rzp1.open();
  };

  return (
    <div>
      <Button type="button" onClick={paymentButtonHandler}>
        <Typography>Pay</Typography>
      </Button>
    </div>
  );
};

export default Payment;
