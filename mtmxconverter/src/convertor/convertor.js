var deo=require('./mxobj');
var deobj=deo.Document
const path=require('path')
const {create}=require('xmlbuilder2')
const p=path.join(__dirname,'../','parser/sample/MT.txt')
const validate=require('../validator/validator')
const fs=require('fs')

obj1={
    Id:{
        PrvId:{
            Othr:{
                
            }
        }
    }
}


const addressfun=(data,ar)=>{
    var str=""
              for(let j=ar;j<data.length;j++)
                      str+=data[j].value
        return str;
}
const addressfun1=(data,ar)=>{
    var str=""
              for(let j=ar;j<data.length;j++)
                      str+=data[j].account
        return str;
}

const sliptcountrycode=(str)=>
{
    switch(str){
        case "ARNU":
            return true;
        case "CCPT":
            return true;
        case "NIDN":
            return true;
        case "SOSE":
            return true;
        case "TXID":
            return true;

        return false
    }
}

module.exports=(val_obj)=>
{
    const text=val_obj.text
    
   
    for(let i=0;i<text.length;i++){
      switch(text[i].tag){
          case "20":
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.PmtId.InstrId=text[i].attr.insId;
              break;
          case "23B":
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.PmtTpInf.LclInstrm.Prtry=text[i].attr.prop;
              break;
          case "32A":
                var amount=text[i].attr.amount;
                console.log(amount)
                var j=amount.indexOf(',');
                if(j===(amount.length-1))amount=amount.slice(0,j);
                else
                amount=amount.slice(0,j)+"."+amount.slice(j+1,j+3);
                console.log(amount)
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.IntrBkSttlmAmt=amount;
              break;
          case "50F":
            console.log(text[i])
            console.log("hello wrold2")
            if(Object.keys(text[i].attr).length==1){
            deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.DbtrAcct.Id=text[i].attr.account
            deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr.Nm=text[i].data[0].value
            var str=addressfun(text[i].data,1)
            deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr.PstlAdr.AdrLine=str;
            }
            else{
                console.log(text[i].data)
                obj1.Id.PrvId.Othr={
                    Issr:text[i].attr.countrycode,
                    Id:text[i].attr.identifier,
                    SchmeNm:{
                            Cd:text[i].attr.code
                    }                   
                }
                deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr=obj1;
                if(sliptcountrycode(text[i].attr.code)){
                }
                else{
                    var str=text[i].attr.identifier;
                    var lis1=str.split('/')
                    obj1.Id.PrvId.Othr={
                        Issr:text[i].attr.countrycode+"/"+lis1[1],
                        Id:text[i].attr.countrycode+"/"+text[i].attr.identifier,
                        SchmeNm:{
                                Cd:text[i].attr.code
                        }                   
                    }
                    deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr=obj1;
                }

            }
            var name=""
            var str4=""
            for(var j=0;j<text[i].data.length;j++){
                if(text[i].data[j].number=='1'){
                        name+=text[i].data[j].value        
                }
                if(text[i].data[j].number=='2'||text[i].data[j].number=='4'||text[i].data[j].number=='3'){
                    {
                        str4+=text[i].data[j].value
                    }

            }
        }

            obj3={}
            if(name!="")
            obj3=Object.assign(obj3,{Nm:name})
            if(str4!="")
            obj3=Object.assign(obj3,{PstlAdr:{
                AdrLine: str4   
            }})
        // console.log(obj3)
        deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr=Object.assign(deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr,obj3)
        console.log(deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr)
            break;
          case "50A":
            console.log(text[i])
            delete deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr['PstlAdr'];
            deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.DbtrAcct.Id.Othr.Id=text[i].attr.account;
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr.Nm=text[i].data[0].code;
              break;
          case "50K" :
              console.log(text[i])
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.DbtrAcct.Id.Othr.Id=text[i].attr.account;
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr.Nm=text[i].data[0].account;
              console.log(text[i].data[0].code)
              
                var str=addressfun1(text[i].data,1)
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Dbtr.PstlAdr.AdrLine=str;
              break;
          case "59A":
            console.log(text[i])
            obj4={
                Id:{
                    OrgId:{
                        AnyBIC:text[i].data[0].code 
                    }
                }
            }
            deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Cdtr=obj4;
            deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.CdtAcct.Id.Othr.Id=text[i].attr.account;
            break;
          case "59":
            //console.log(text[i])
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.Cdtr.Nm=text[i].data[0].address;
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.CdtAcct.Id.Othr.Id=text[i].attr.account;
              break;
          case "71A":
              deobj.FIToFICstmrCdtTrf.CdtTrfTxInf.ChrgBr=text[i].attr.code;
              break;
        }
      
  }
  const doc= create({version: '1.0', encoding: "UTF-8", standalone:"yes"},deo);
  
  const xml=doc.end({prettyPrint:true})
  return xml;
  
  
}
