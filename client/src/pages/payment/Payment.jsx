import React, { useState, useEffect } from "react";
import './Payment.scss';
import {useParams} from 'react-router-dom'
import newRequest from '../../context/newRequest'
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51MFJiZJCVuoDSNxsvkWVe5EbmcaIsyzAvmc2HCIVMZm11RaQYfJfLzU78CmLCe0f49Pq7o1geq365ON93OngHtEo00hGkcyscC");


function Payment() {
    const [clientSecret, setClientSecret] = useState("");

    const {id} = useParams() // gigId

    // Create PaymentIntent as soon as the page loads
    useEffect(() => {

        const makeRequest = async (req, res) => {

            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)

            } catch (error) {
                console.log(error);
            }
        }

        makeRequest()

    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="payment " style={{padding: "100px 200px"}}>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Payment