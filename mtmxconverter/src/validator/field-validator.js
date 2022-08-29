var err_code;
const dataCodes=require('./data/codes')
function isValidDate(date)
{
    var y,m,d
    if(date.length==8)
    {
        y=parseInt(data.slice(0,4))
        m=parseInt(date.slice(4,6));
        d=parseInt(date.slice(6,8));
    }
    y=parseInt(date.slice(0,2));
    m=parseInt(date.slice(2,4));
    d=parseInt(date.slice(4,6));

    if(((y>0)&((m>=1)&&(m<=12))&(d>=1&&d<=31)))return 1
    else return 0
                
}
function isValidCCode(con_code)
{
    if(dataCodes.country_codes.includes(con_code))return 1
    else return 0
}
function isValidAmount(amount)
{
    var res=1;
    if(amount.indexOf(',')==-1)res=0
    if(amount.indexOf(',')==0)res=0;
    return res
}
function isValidCountryCode(country_code)
{
    const res=dataCodes.country_codes.includes(country_code)
    return res
}
const codes=["CREAD","CRTS","SPAY","SPRI","SSTD"]
const codes2=["BEN","OUR","SHA"];
const invalid_curr_codes=["XAU", "XAG", "XPD","XPT"]

const party_code=["ARNU" ,"CUST" ,"DRLC" ,"EMPL" ,"NIDN" ,"SOSE" ,"TXID" ]
module.exports=(fieldarray,type)=>{

    var errarray=[]
    
    for(var i=0;i<fieldarray.length;i++)
    {
        var field=fieldarray[i]
        var err=null
        switch(field.tag)
        {
            

            case "20":  
                        const insId=field.attr.insId
                        if(insId.charAt(0)==='/'||insId.charAt(insId.length-1)==='/'||insId.includes("//"))
                            err="T26"
                break;
            case "23B":
                        
                        const prop=field.attr.prop
                        if(prop==="CRTS")
                        {
                            if(type=="F")
                            err="CRTS cannot be used in FIN Network"
                        }
                        else
                        {
                            if(!dataCodes.codes.find(c=>c===prop))err="T36"
                        }
                        break;
            case "32A":
                        var date=field.attr.date;
                        var curr=field.attr.currency
                        var amount=field.attr.amount
                        
                        if(!isValidDate(date))err="T50"
                        if(dataCodes.invalid_curr_codes.includes(curr))err="C08"
                        else if(!dataCodes.curr_codes.includes(curr))err="T52"
                        if(!isValidAmount(amount))err="C03,T40,T43"
                    break;
                  
            case "50F":
                        var terr=[]
                        var attr=field.attr
                        const len=Object.keys(attr).length;
                        if(len>1)//50F2
                        {
                            if(!dataCodes.party_code.includes(attr.code))terr.push("T55")
                            if(!isValidCountryCode(attr.countrycode))terr.push("T55")
                        }
                        //validating data
                        const data=field.data;
                        //first line should be number 1
                        if(!data[0].number==="1")terr.push("T56")
                        //number should be between 1and 8
                        if(data.find(data=>(data.number>8||data.number<1)))terr.push("T56")
                        data.forEach(d => {
                            switch(d.number)
                            {
                            case "4":
                                        if(!isValidDate(d.value))terr.push("T56")
                                    break;
                            case "3":
                            case "5": 
                            case "6":
                            case "7":  
                                var cob=d.value.slice(0,2)
                                if(!isValidCountryCode(cob))terr.push("T56")
                                break;
                            case "8":
                                    if(len===1)terr.push("T56")
                                    break;
                            }
                        });
                        errarray.push(...new Set(terr))
                        break;
                        
            case "71A":
                        var attr=field.attr;
                        if(!dataCodes.codes2.includes(attr.code))err="T08"
                        break;
            default:
                }
                errarray.push(err)
            }
            return errarray; 
        }