
const express  = require('express')

const stripe = require("stripe")("sk_test_SV2E0ncOi2ETBx4GhPwdjxMw00N6pQJdK0");

const router = express.Router();

router.get('/',(req,res)=> res.send("Payment Route"));

router.post("/checkout", async (req, res) => {

    console.log("Request:", req.body);

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