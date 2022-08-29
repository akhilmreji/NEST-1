const MT=require('./mtobj')
const fs=require("fs");
module.exports=(path,cb)=>
{
    const data=fs.readFileSync(path,'utf-8')
    const mtObj=MT.consMTObj(data);
    return mtObj;
    

}