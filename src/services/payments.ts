import { supabase } from '../lib/supabase';
import { stripe } from '../lib/stripe';

export const createPaymentIntent = async (amount: number, donorId: string, studentId: string) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, donorId, studentId }),
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

export const processPayment = async (paymentMethodId: string, amount: number) => {
  try {
    const { error } = await stripe!.confirmCardPayment(paymentMethodId, {
      payment_method: paymentMethodId,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

export const createDonation = async (donorId: string, studentId: string, amount: number) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .insert({
        donor_id: donorId,
        student_id: studentId,
        amount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Donation creation error:', error);
    throw error;
  }
};