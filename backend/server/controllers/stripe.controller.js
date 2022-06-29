require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_API_KEY);

module.exports.payment = async(req, res) => {
    try {
    const customer = await stripe.customers.create();

    let amount = req.body.amount;
    let id = req.body.id;
    let order_id = req.body.order_id;

    const paymentIntent = await stripe.paymentIntents.create({
        customer: id,
        setup_future_usage: 'off_session',
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            order_id: order_id,
        },
        confirm: true
    })
    console.log("Payment", paymentIntent)
		res.json({
			message: "Payment successful",
			success: true
		})
    } catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}

}