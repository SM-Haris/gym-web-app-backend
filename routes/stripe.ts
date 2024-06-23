const stripe = require('stripe')(
  'sk_test_51PQVHVP6Zmlr8FhPVKXdmpTbPLqgXc1UXIowtDvuroptAPgdByKKHJ1hEqjJV2pd8GzxFy5xDb6nfqTpEwU7T1w7009xbUGgnQ'
)
import express from 'express'
import StripeController from '../app/stripe/StripeController'

const PREFIX = '/stripe'
const router = express.Router()

router.post(`${PREFIX}/create-checkout-session`, StripeController.checkout)
router.post('/create-portal-session', StripeController.portalSession)

export default router
