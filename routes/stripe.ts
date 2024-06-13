const stripe = require('stripe')('sk_test_51PQVHVP6Zmlr8FhPVKXdmpTbPLqgXc1UXIowtDvuroptAPgdByKKHJ1hEqjJV2pd8GzxFy5xDb6nfqTpEwU7T1w7009xbUGgnQ');
import express from 'express'

const PREFIX = '/stripe'
const router = express.Router()

const YOUR_DOMAIN = 'http://localhost:3000/success';

router.post(`${PREFIX}/create-checkout-session`, async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.status(200).json({ data: session });
});

router.post('/create-portal-session', async (req, res) => {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  
    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = YOUR_DOMAIN;
  
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
  
    res.redirect(303, portalSession.url);
  });


export default router
