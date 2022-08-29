const { verify } = require('jsonwebtoken');
const mtmxconverterervice = require('../services/mtmxconverter-service');
const { PublishCustomerEvent, PublishmtmxconverterEvent } = require('../utils');
const upload = require('./middlewares/file');
const path=require('path') 
var p=require('../utils/path')
p=path.join(p,'MT.txt')
const convert=require('../convertor/convertor')
const fieldValidator=require('../validator/field-validator')
const parseFormat=require('../parser/swift-parser'); 

module.exports = (app) => {
    const service = new mtmxconverterervice();


    app.post('/mtmxconvertor',upload.single('mtfile'), async(req,res,next) => { 
        try {
            var obj=parseFormat(p) 
                const type=obj.basic_header.appId
                var errors=fieldValidator(obj.text,type).filter(f=>f!=null)
                obj.errors.push(...new Set(errors))
              const response= convert(obj);
            return res.send(response); 
        } catch (err) {
            console.error(err)
            next(err)    
        }
    });
    
    app.post('/mtmxconvertor/obj', async(req,res,next) => { 
        try {
            const response= convert(req.body);
            return res.send(response);
        } catch (err) {
            console.error(err)
            next(err)    
        }
    });

   
    app.put('/datavalidation', async (req,res,next) => {
        
        const { _id } = req.user;
        
        try {     

            PublishCustomerEvent(data);
            PublishmtmxconverterEvent(data)

            const response = {
                product: data.data.product,
                unit: data.data.qty 
            }
    
            return res.status(200).json(response);
            
        } catch (err) {
            next(err)
        }
    });
    
   
    // app.get('/', async (req,res,next) => {
    //     //check validation
    //     try {
    //         const { data} = await service.Getmtmxconverter();        
    //         return res.status(200).json(data);
    //     } catch (error) {
    //         next(err)
    //     }
        
    // });
    
}