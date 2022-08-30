const { verify } = require('jsonwebtoken');
const mtvalidationervice = require('../services/mtvalidation-service');
const { PublishCustomerEvent, PublishmtmxconverterEvent } = require('../utils');
const validate=require('../validator/validator')
const upload = require('./middlewares/file');
            const path=require('path')
            const fieldValidator=require('../validator/field-validator')
            var p=require('../utils/path')
            p=path.join(p,'/MT.txt')
            // const p=path.join(__dirname,'mtfiles/MT.txt')
            const parseFormat=require('../parser/swift-parser');      

module.exports = (app) => { 
    const service = new mtvalidationervice();
// console.log(fileUpload) 
// console.log(fileUpload.array("mtfile",10))

var obj=parseFormat(p)
const type=obj.basic_header.appId 
var errors=fieldValidator(obj.text,type).filter(f=>f!=null)
obj.errors.push(...new Set(errors)) 

              
    app.post('/mt/validation',upload.single('mtfile'),async(req,res)=>{
        try {
                const obj=validate(p)
             
            // PublishCustomerEvent(data);
            // PublishmtmxconverterEvent(data)
            return res.send(obj);
        } catch (err) {
            console.error(err)
            next(err)     
        }
    });
    // console.log(fileUpload); 
    // console.log("hello")
    
    
   
    
   
   

           
          
   
   
        

    
}