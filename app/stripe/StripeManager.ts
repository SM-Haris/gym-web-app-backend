const stripe = require('stripe')(
  'sk_test_51PQVHVP6Zmlr8FhPVKXdmpTbPLqgXc1UXIowtDvuroptAPgdByKKHJ1hEqjJV2pd8GzxFy5xDb6nfqTpEwU7T1w7009xbUGgnQ'
)
import { UserRequest } from '../../interfaces/Auth'
require('dotenv').config()

const YOUR_DOMAIN = process.env.DOMAIN

class StripeManager {
  static async checkout(req: UserRequest) {
    const prices = await stripe.prices.list({
      lookup_keys: [req.body.lookup_key],
      expand: ['data.product'],
    })

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}cancel?canceled=true`,
    })

    return session
  }

  static async createPortalSession(req: UserRequest) {
    const { session_id } = req.body
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    const returnUrl = YOUR_DOMAIN

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    })

    return portalSession.url
  }
}

export default StripeManager
