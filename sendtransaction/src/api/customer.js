const CustomerService = require('../services/customer-service');
const  UserAuth = require('./middlewares/auth');
const express = require('express')
const {body, validationResult}=require('express-validator')

module.exports = (app) => {
    
    const service = new CustomerService();

    app.post('/signup',[
        body("name","Enter Valid Name").isLength({min:2}),
        body("email","Enter Valid Email").isEmail(),
        body("password","Enter strong password ").isLength({min:8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("password must min 8 char long. At least one uppercase. At least one lower case. At least one special character"),
        body("phone","Enter Valid Phone no").isLength({min:10,max:10}).isNumeric(),
        body("accountno","Enter valid 12 digit account no").isNumeric().isLength({min:10},{max:12})
    ], async (req,res,next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const { email, password,accountno, phone } = req.body;    
            const { data } = await service.SignUp({ email, password,accountno, phone}); 
           return res.json(data);      
        } catch (err) {
            next(err)
        }
    });

    app.post('/login',[
        body("email","Enter Valid Email").isEmail(),
        body("password","Please enter correct password").isLength({min:8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage("password must min 8 char long. At least one uppercase. At least one lower case. At least one special character")
    ],  async (req,res,next) => {
        
        try {
            const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
            const { email, password } = req.body;
            const { data } = await service.SignIn({ email, password});
            return res.json(data);

        } catch (err) {
            next(err)
        }

    });
    app.get('/profile', UserAuth ,async (req,res,next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });
            return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
     

    app.get('/getTransaction', UserAuth, async (req,res,next) => {
        
        try {
            const { _id } = req.user;
           const { data } = await service.GetTransactionDetails(_id);
    
           return res.json(data.transaction);
            
        } catch (err) {
            next(err)
        }
    });
    
    app.get('/getCurrentBalance', UserAuth, async (req,res,next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetWishList( _id);
            return res.status(200).json(data);
        } catch (err) {
            next(err)
        }
    });
}