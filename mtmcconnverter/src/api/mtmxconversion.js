const { verify } = require('jsonwebtoken');
const mtmxconversionervice = require('../services/mtmxconversion-service');
const { PublishCustomerEvent, PublishShoppingEvent } = require('../utils');
const UserAuth = require('./middlewares/auth')

module.exports = (app) => {
    const service = new mtmxconversionervice();
    app.post('/MT/validation', async(req,res,next) => {
        try {
            const { mt } = req.body; 
            return res.json({success:"verified successfully",MT:mt});
        } catch (err) {
            next(err)    
        }
    });
    app.post('/datavalidation', async(req,res,next) => {
        try {
            const {  } = req.body; 
            // const { data } =  await service.CreateProduct({ });
            return res.json({success:"verified successfully"});
        } catch (err) {
            next(err)    
        }
    });
   
    app.post('/mtmx/conversion', async(req,res,next) => {
        try {
            const {  } = req.body; 
            const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <Document>
                <FIToFICstmrCdtTrf>
                    <CdtTrfTxInf>
                        <PmtId>
                            <InstrId>0061350113089908</InstrId>
                        </PmtId>
                        <PmtTpInf>
                            <LclInstrm>
                                <Prtry>CRED</Prtry>
                            </LclInstrm>
                        </PmtTpInf>
                        <IntrBkSttlmAmt>100000</IntrBkSttlmAmt>
                        <Dbtr>
                            <Nm>AGENTES DE BOLSA FOO AGENCIA</Nm>
                            <PstlAdr>
                                <AdrLine>AV XXXXX 123 BIS 9 PL
            12345 BARCELONA</AdrLine>
                            </PstlAdr>
                        </Dbtr>
                        <DbtrAcct>
                            <Id>
                                <Othr>
                                    <Id>/12345678</Id>
                                </Othr>
                            </Id>
                        </DbtrAcct>
                        <Cdtr>
                            <Nm>FOO AGENTES DE BOLSA ASOC</Nm>
                        </Cdtr>
                        <CdtrAcct>
                            <Id>
                                <Othr>
                                    <Id>/ES0123456789012345671234</Id>
                                </Othr>
                            </Id>
                        </CdtrAcct>
                    </CdtTrfTxInf>
                </FIToFICstmrCdtTrf>
            </Document>`;
            // const { data } =  await service.MtMxConversion({  });
            return res.json(xml);
        } catch (err) {
            next(err)    
        }
    });


   
    app.put('/datavalidation', async (req,res,next) => {
        
        const { _id } = req.user;
        
        try {     

            // const { data } = await  service.GetProductPayload(_id, { productId: req.body._id, qty: req.body.qty },'ADD_TO_CART') 

            PublishCustomerEvent(data);
            PublishShoppingEvent(data)

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
            const { data} = await service.Getmtmxconversion();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
        
    });
    
}