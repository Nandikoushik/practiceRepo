
const stripe = require('stripe')('sk...');

const webhooks = async (req, res) => {
   const sig = req.headers['stripe-signature'];
   const endpointSecret = 'whsec_x94kql5F3UMancicIIDDfbFDAbuXD3jC';
   try {
      let event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log('event==>', event);
      let customerObject = {};
      let customer_details={};
      switch (event.type) {
         case 'customer.created':
            customerObject = event.data.object;
            break;   

         case 'customer.subscription.created':
            customerObject = event.data.object;
            customer_details = await stripe.customers.retrieve(customerObject.customer);
            customer_details.type=event.type;
            console.log(customer_details);
            break;

         case 'customer.subscription.deleted':
            customerObject = event.data.object;
            customer_details = await stripe.customers.retrieve(customerObject.customer);
            customer_details.type=event.type;
            console.log(customer_details);  
            break;

         case 'customer.subscription.updated':
            customerObject = event.data.object;
             customer_details = await stripe.customers.retrieve(customerObject.customer);
             customer_details.type=event.type;
             console.log(customer_details);
            break;

         case 'checkout.session.completed':
            customerObject = event.data.object;
            customer_details = await stripe.customers.retrieve(customerObject.customer);
            customer_details.type=event.type;
            console.log(customer_details);
            break;

         case 'product.created':
            customerObject = event.data.object;

         case 'product.updated':
            customerObject = event.data.object;
            break;

         case 'invoice.payment_succeeded':
            customerObject = event.data.object;
            break;

         case 'invoice.payment_failed':
            customerObject = event.data.object;
            break;

         default:
            console.log(`Unhandled event type ${event.type}`)
            break;
      }
      console.log();
      res.status(200).send(event)
   } catch (error) {
      console.log('Event error', error);
   }

}

const productPRICE = async (req, res) => {
   try {
      const productData = {
         name: "Test product",
         default_price_data: {
            currency: "inr",
            recurring: {
               interval: "week"
            },
            unit_amount: 3
         }
      }
      const product = await stripe.products.create(productData);
      console.log(product);
      res.status(200).send(product);

   } catch (error) {
      console.log('err', error);
   }
}

module.exports = { webhooks, productPRICE };
