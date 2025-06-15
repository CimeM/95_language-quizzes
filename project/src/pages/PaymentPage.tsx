import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle, Loader2, Star, XCircle } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';
import { useApp } from '../context/AppContext';
import { API_URL, Plan, paypal_client } from '../types';
import { Info } from 'lucide-react';
const PaymentPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const { userProfile } = useApp();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const initialOptions = {
        clientId: paypal_client , // Use your env variable
        currency: 'EUR',
        intent: 'capture',
    };

    
    const [coupon, setCoupon] = React.useState('');
    const [couponApplied, setCouponApplied] = React.useState(false);
    const [couponError, setCouponError] = React.useState<string | null>(null);
    const [validatingCoupon, setValidatingCoupon] = useState(false);
    const [couponValid, setCouponValid] = useState(false);
    const [procentualDiscountValue, setProcentualDiscountValue] = useState(0);
    const [amountDiscountValue, setAmountDiscountValue] = useState(0);
    const [isFreeLicenseSuccessful, setIsFreeLicenseSuccessful] = useState(false);

    const handleValidateCoupon = async () => {
      if (!coupon) return;
      
      setValidatingCoupon(true);
      setCouponError(null);

      try {
        const response = await fetch(`${API_URL}/api/validate-coupon`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ couponCode: coupon.trim() })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Invalid coupon');
        }

        const { valid, discountAmount, discountType } = await response.json();
        setCouponValid(valid);
        if (valid) {
          if(discountType.includes('percent')){
            setProcentualDiscountValue(discountAmount);
          }else{
            setAmountDiscountValue(discountAmount)
          }
        } else {
          setProcentualDiscountValue(0);
          setAmountDiscountValue(0);
          setCouponError('This coupon is not valid');
        }
      } catch (error) {
        setCouponError(error instanceof Error ? error.message : 'Validation failed');
      } finally {
        setValidatingCoupon(false);
      }
    };

    function handleCouponInsert(e: { target: { value: string; }; }) {
      setCoupon(e.target.value.toUpperCase());
      setCouponError('');
    }

    useEffect(() => {
        const fetchPlans = async () => {
        try {
            const response = await fetch(API_URL+'/api/products');
            if (!response.ok) throw new Error("Failed to fetch plans");
            const data = await response.json();
            setPlans(data.plans); // assuming your endpoint returns { plans: [...] }
        } catch (err: any) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
        };
        fetchPlans();
    }, []);

  // Create order by calling your backend
  const handleCreateOrder = async (plan: Plan): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userProfile.email,
            product: 'premium_subscription',
            couponCode: coupon, // Optional
            planId: plan.id,
            amount: plan.price,
            currency: 'EUR',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const data = await response.json();
      
      // Case: free license
      if (data.isFreeLicense) {
        setIsFreeLicenseSuccessful(true);
        return ''; // Select button to provide feedback
      }
      return data.id;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  // Capture order by calling your backend
  const handleApproveOrder = async (orderID: string): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderID}/capture`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to capture order');
      }
      return await response.json();
    } catch (error) {
      console.error('Order capture error:', error);
      throw error;
    }
  };

  

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Layout title="Premium Access" showBack>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Unlock Full Potential</h2>
            <p className="text-primary-100 mb-6">Choose the perfect plan for your language learning journey</p>
            <div className="space-y-3">
              {plans[0].benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <Check className="text-accent-500" size={20} />
                  <span className="text-primary-50">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-gradient-to-br p-6 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Discount code</h2>
            <p className="mb-6">Insert the coupon code (optional):</p>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full px-4 py-2 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
                placeholder="Enter your coupon code"
                value={coupon}
                onChange={handleCouponInsert}
                disabled={couponApplied}
                maxLength={20}
                autoCapitalize="characters"
              />
              <button
                onClick={handleValidateCoupon}
                disabled={!coupon || couponApplied}
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {validatingCoupon ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Apply'
                )}
              </button>
              {coupon && (
                <div className="mt-3">
                  {couponValid ? (
                    <div className="flex items-center text-success-600">
                      <CheckCircle className="mr-2" />
                      Coupon applied!
                    </div>
                  ) : couponError ? (
                    <div className="flex items-center text-danger-500">
                      <XCircle className="mr-2" />
                      {couponError}
                    </div>
                  ) : (
                    <div className="flex items-center text-neutral-500">
                      <Info className="mr-2" />
                      Click apply to check the coupon
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card relative ${plan.popular ? 'border-2 border-primary-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Star size={14} className="mr-1" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className="text-neutral-600 mt-1">{plan.description}</p>
                  <div className="mt-4">
                    {procentualDiscountValue > 0 || amountDiscountValue > 0 ? <>
                      <div className="text-3xl font-bold">€{ plan.price - (plan.price*procentualDiscountValue/100) - amountDiscountValue }</div>
                    </>:<>
                      <div className="text-3xl font-bold">€{plan.price}</div>
                      <p className="text-success-600 text-sm">{plan.savings}</p>
                    </>}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check size={16} className="text-success-500 mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <h4 className="font-medium mb-2">Plan Includes:</h4>
                  <ul className="text-sm space-y-1 text-neutral-600">
                    <li>• {plan.limitations.maxQuizzes} quizzes</li>
                    <li>• Up to {plan.limitations.maxVocabSets} vocabulary sets</li>
                    {plan.limitations.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                
                {procentualDiscountValue >= 100? <>
                {/* product is free */}
                  <button
                    onClick={async () => {
                      handleCreateOrder(plan)
                    }}
                    disabled={ couponApplied || isFreeLicenseSuccessful }
                    className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  > 
                    {isFreeLicenseSuccessful? <>Success!</>:<>Select</> }
                    
                  </button>
                </>:<>
                  {/* display paypal button */}

                  <PayPalButtons
                    fundingSource={FUNDING.PAYPAL}
                    createOrder={async (data, actions) => {
                      return handleCreateOrder(plan);
                    }}
                    onApprove={async (data, actions) => {
                      if (data.orderID) {
                        try {
                          await handleApproveOrder(data.orderID);
                          toast.success('Payment completed! Thank you for your purchase.');
                          // Optionally: update subscription status here
                        } catch (err) {
                          toast.error('Payment completed, but there was an error updating your subscription.');
                        }
                      }
                    }}
                    onError={(err) => {
                      console.error('PayPal error:', err);
                      toast.error('Payment failed. Please try again.');
                    }}
                    style={{
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'rect',
                      label: 'pay',
                    }}
                  />

                </>}
              </motion.div>
            ))}
          </div>
        </div>
      </Layout>
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
