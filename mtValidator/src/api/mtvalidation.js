const { verify } = require('jsonwebtoken');
const mtvalidationervice = require('../services/mtvalidation-service');
const { PublishCustomerEvent, PublishMtmxconversionEvent } = require('../utils');
const UserAuth = require('./middlewares/auth')

module.exports = (app) => {
    const service = new mtvalidationervice();
    app.post('/MT/validation', async(req,res,next) => {
        try {
            const { mt } = req.body; 
            return res.json({success:"verified successfully",MT:mt});
        } catch (err) {
            next(err)    
        }
    });
    
   
    
   
    app.put('/datavalidation', async (req,res,next) => {
        
        const { _id } = req.user;
        
        try {     

            // const { data } = await  service.GetProductPayload(_id, { productId: req.body._id, qty: req.body.qty },'ADD_TO_CART') 

            PublishCustomerEvent(data);
            PublishMtmxconversionEvent(data)

            const response = {
                product: data.data.product,
                unit: data.data.qty 
            }
    
            return res.status(200).json(response);
            
        } catch (err) {
            next(err)
        }
    });
    
   
    app.get('/', async (req,res,next) => {
        //check validation
        try {
            const { data} = await service.Getmtvalidation();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
        
    });
    
}