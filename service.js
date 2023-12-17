var CryptoJS = require("crypto-js");
const stripe = require('stripe')('sk_test_51O7a2xSFs63i9Cz0QI4bEycUKQDJVcvFI5LtJoMOryBpyZ8Q4AmL9qQZVmXUNFt4jSonfbUhbhShOKoQYlr1LplX00gY134Rsj');
const service = {}

service.customer = async (req, res) => {
   try {

      const customer = await stripe.paymentIntents.search({ query: 'customer:"cus_PA2n6reGYAIYqP"', });
      res.send(customer)

   } catch (error) {
      console.log(error);
      res.send(error)
   }
}

service.refund = async (req, res) => {
   try {
      const rfund = await stripe.refunds.create({
         payment_intent: 'pi_3ONboRENZiCcn60E1aJmuSw5',
      });
      res.send(rfund)
   } catch (error) {
      console.log(error);
      res.sen(error)
   }
}

service.createProduct = async (req, res) => {
   try {
      const productDto = req.body;
      const product = await stripe.products.create(productDto);
      res.send(product);
   } catch (error) {
      res.send(error);
   }
}

service.retrivedProduct = async (req, res) => {
   try {
      const productDto = req.body;
      const productDetails = await stripe.products.retrieve(productDto.id);
      res.send(productDetails);
   } catch (error) {
      res.send(error);
   }
}

service.updateProduct = async (req, res) => {
   try {
      const productDto = req.body;
      const productDetails = await stripe.products.update(productDto.id, { name: 'Koushik' });
      res.send(productDetails);
   } catch (error) {
      res.send(error);
   }
}

service.updateProductAndPrice = async (req, res) => {
   try {
      const productDto = req.body;
      const price = await stripe.prices.retrieve(productDto.priceId);
      if (price.unit_amount != productDto.unit_amount) {

         const priceData = await stripe.prices.create({
            currency: 'usd',
            unit_amount: productDto.unit_amount,
            recurring: {
               interval: 'month',
               interval_count: 1
            },
            product: productDto.id
         });

         console.log('priceData=>>>>>', priceData);

         if (priceData.id) {
            const updateProduct = await stripe.products.update(
               productDto.id,
               {
                  description: 'Hello Product $300',
                  default_price: priceData.id
               }
            );

            console.log('updateProduct=>>>>>>>>>>>>', updateProduct);

            if (updateProduct.id) {
               const price = await stripe.prices.update(
                  productDto.priceId,
                  {
                     active: false
                  }
               );
               console.log('Inactiveprice=>>>>', price);
            }
            res.send(updateProduct);
         }

      }


   } catch (error) {
      res.send(error)
   }
}

service.updatePrice = async (req, res) => {
   try {
      const price = await stripe.prices.update(
         'price_1OOMBRSFs63i9Cz0I1QXQQSa',
         {
            active: false
         }
      );
      res.send(price);
   } catch (error) {
      res.send(error)
   }
}

service.list = async (req, res) => {
   try {
      const price = await stripe.prices.list({ active: false });
      res.send(price);
   } catch (error) {
      res.send(error)
   }
}
module.exports = service;