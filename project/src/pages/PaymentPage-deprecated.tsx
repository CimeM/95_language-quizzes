import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Layout from '../components/Layout';
import paymentConfig from '../config/payments.json';

const PaymentPage: React.FC = () => {
  const { plans } = paymentConfig;

  const initialOptions = {
    clientId: "AaqHQ1f9YpMiuzBzWGudEy9jxBtc_FzbGZb_KgjjzM336IDwR4kz6Ga9ldZIUuzUICkx2M3hsWOM7I2-",
    currency: "EUR",
    intent: "capture",
  };

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
                    <div className="text-3xl font-bold">${plan.price}</div>
                    <p className="text-success-600 text-sm">{plan.savings}</p>
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
                
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        invoice_id: plan.paypalInvoiceId,
                        amount: {
                          value: plan.price.toString(),
                          currency_code: "EUR"
                        },
                        description: `${plan.title} Subscription`
                      }]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      // Handle successful payment
                      alert('Payment completed! Thank you for your purchase.');
                      // You would typically update the user's subscription status here
                    });
                  }}
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "pay"
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Layout>
    </PayPalScriptProvider>
  );
};

export default PaymentPage;