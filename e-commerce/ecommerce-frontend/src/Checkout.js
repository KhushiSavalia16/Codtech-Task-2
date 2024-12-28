// Checkout.js
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const response = await axios.post('http://localhost:5000/api/checkout', {
          paymentMethodId: id,
        });
        console.log(response.data);
      } catch (err) {
        console.error('Error processing payment:', err);
      }
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default Checkout;
