const path=require('path')
const fieldValidator=require('./field-validator')
const p=path.join(__dirname,'../','parser/sample/MT.txt')
const parseFormat=require('../parser/swift-parser');
//const convertor=require('../convertor/convertor')
module.exports=(pt)=>
{
    const mobj=parseFormat(pt);
    
    if(mobj.basic_header)
    {
        const type=mobj.basic_header.appId
        const text=mobj.text
        var errors=fieldValidator(text,type).filter(f=>f!=null)
        
    }
    else
    {
        mobj.errors.push("Invalid Basic Header")
    }
    mobj.errors.push(...new Set(errors))
//console.log(mobj.errors)
    return mobj

}

   

