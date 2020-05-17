const express  = require('express')

const stripe = require("stripe")("sk_test_SV2E0ncOi2ETBx4GhPwdjxMw00N6pQJdK0");

const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const Payment = require('../module/Payment')

router.get('/',(req,res)=> res.send("Payment Route"));

router.get('/generates',async (req,res)=>{
  // console.log("Request:", uuidv4());

  const state = uuidv4();

  try{
        data = new Payment({
            state
        });

        await data.save();

    return res.status(200).json({id:state});

  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Down"); 
  }
})

router.post("/oauth", async (req, res) => {
  const { code, state } = req.body;

  // Assert the state matches the state you provided in the OAuth link (optional).
  if(!stateMatches(state)) {
    return res.status(403).json({ error: 'Incorrect state parameter: ' + state });
  }

  // Send the authorization code to Stripe's API.
  stripe.oauth.token({
    grant_type: 'authorization_code',
    code
  }).then(
    (response) => {
      var connected_account_id = response.stripe_user_id;
      saveAccountId(connected_account_id,req,res);

      // Render some HTML or redirect to a different page.
      return res.status(200).json({userId: connected_account_id});
    },
    (err) => {
     // console.log(err.data);
      
      if (err.type === 'StripeInvalidGrantError') {
        return res.status(400).json({error: 'Invalid authorization code: ' + code});
      } else {
        return res.status(500).json({error: 'An unknown error occurred. '+err});
      }
    }
  );
});

const stateMatches = async (state_parameter) => {
  // Load the same state value that you randomly generated for your OAuth link.
  try{
    let data = await Payment.findOne({state:state_parameter});
    // console.log(data+" h");
    return data;
  }catch(err){
    return false;
    // console.log(err)
  }
}

const saveAccountId =async (id,req,res) => {

  const { code, state } = req.body;
  // Save the connected account ID from the response to your database.

  await Payment.updateOne({state:state},{$set:{userId:id,code:code}},(err, result) =>{

  if(err)
    return res.status(400).json({error: 'Invalid Status: ' + state});

  // console.log('Connected account ID: ' + id);
}) 
}

const calculateOrderAmount = (price) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return price
}

// Take a 10% cut.
const calculateApplicationFeeAmount = (amount) => .1 * amount;

router.post('/create-payment-intent', async (req, res) => {

  const {stripe_account,price,} = req.body;
  const amount = calculateOrderAmount(price)

  await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    description: 'Software development services',
    application_fee_amount: calculateApplicationFeeAmount(amount)
  }, {
    stripeAccount:stripe_account,
  }).then(function(paymentIntent) {
    try {
      // console.log(paymentIntent);
      
      return res.send({
        publishableKey: "pk_test_vvc0TFugJPptSp6tzuHr4Cr100zt85c8ql",
        clientSecret: paymentIntent.client_secret
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
  }); 
});

router.post("/checkout", async (req, res) => {

    //console.log("Request:", req.body);

    let error;
    let status;
    try {
      const { data, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const charge = await stripe.charges.create(
        {
          amount: data.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${data.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
    res.json({error, status});
  });

module.exports = router;