const XRegExp = require('xregexp');
const fieldParse=require('./fieldParser')
const regexMap=require('./util/pattern')
const isBasicHeader=(blocks)=>
{
    var res=0;
    blocks.forEach(block=>
        {
            if(block.charAt(0)==="1")res=1;
            
        })
    return res
}
const createBlocks=(data)=>
{
    const stack=[];
    const blocks=[];
    var str=""
    for(var i=0;i<data.length;i++)
    {
        
        const len=stack.length
        if(data[i]==='{' )
        {
            if(stack[0]==='{')str=str+data[i];
            stack.push('{')
            
        }
        
        else if(data[i]==="}")
        {
            
            if(stack.length==1)
            {
                stack.pop()
                blocks.push(str)
                str=""
            }
            else
            {
                stack.pop()
                str=str+data[i];
            }
        }
        else if(!((data[i]=='\n'||data[i]=='\r') & stack.length==0))str=str+data[i];
         
    }
    
    return blocks
    
}

module.exports=class MT
{
    constructor(basic_header,app_header,user_header,text,trailer,errors)
    {
        this.basic_header=basic_header;
        this.app_header=app_header;
        this.user_header=user_header;
        this.text=text;
        this.trailer=trailer
        this.errors=[]
    }
    setBHeader(header)
    {
        
        var attr=XRegExp.exec(header,regexMap.get("basicH"))
           
        if(!attr)
        {
            this.errors.push("Invalid Basic Header")
            
        }
        else
        this.basic_header=attr.groups
        }
    setAppHeader(header)
    {
        //let app_header={};
        var attr=XRegExp.exec(header,regexMap.get("appHI"))
        if(!attr)
        {
            attr=XRegExp.exec(header,regexMap.get("appHO"))
            if(!attr)
            {
                console.log("err")
                this.errors.push("Invalid Application Header")
            }
        }
        if(attr)this.app_header=attr.groups
        
    }
    setUserHeader(header)
    {
        const blocks=createBlocks(header.slice(2));
        var fields=[]
        var validFields=[]
        blocks.forEach(block => {
                const arr=block.split(':')
                fields.push({tag:arr[0],value:arr[1]})
        });
        if(!fields.find(f=>f.tag==="103"))this.errors.push("Mandatory Tag in User Header not present");
        else
        {
            fields.forEach(field=>
                {
                    var mp=regexMap.get(field.tag)
                    if(mp)
                    {var res=XRegExp.exec(field.value,regexMap.get(field.tag))
                    if(!res)this.errors.push("Error in Tag:"+field.tag)
                    else
                    {
                        validFields.push(field)
                    }}
                    else
                    {
                        this.errors.push("Invalid User Header Tag:"+field.tag)
                    }
                })
        }
        this.user_header=validFields
    }
    setText(text)
    {
        var fp=fieldParse(text)
        this.errors.push(...fp.errors)
        this.text=fp.fieldarr
    }
    setTrailer(trailer)
    {
        var trailerBlocks=createBlocks(trailer.slice(2))
        var td=[]
        trailerBlocks.forEach(block=>{
            var b=block.split(":")
            td.push({tag:b[0],value:b[1]})
        })
        if(!td.find(t=>t.tag==="CHK"))this.errors.push("CHK not present in trailer")
        td.forEach(t=>
            {
               //console.log(t.tag)
                var mapval=regexMap.get(t.tag)
                if(mapval)
                {
                    var attr=XRegExp.exec(t.value,mapval)
                    if(!attr)this.errors.push("Error in tag:"+t.tag)
                }
                else this.errors.push("Invalid Trailer Tag:"+t.tag)
                
                
            })
        
        this.trailer=td;
    }
    static consMTObj(fileData)
    {
        const strdata=fileData.toString();
        const blocks=createBlocks(strdata);
        var mt=new MT()
        //if basic header is not present ,terminate
        if(!isBasicHeader(blocks))
        {
            
        }
        else
        {
            const basic_header=blocks.find(block=>block.charAt(0)==="1")
            const app_header=blocks.find(block=>block.charAt(0)==="2")
            const user_header=blocks.find(block=>block.charAt(0)==="3")
            const text=blocks.find(block=>block.charAt(0)==="4")
            const trailer=blocks.find(block=>block.charAt(0)==="5")
            if(basic_header)mt.setBHeader(basic_header)
            if(app_header)
            {
                mt.setAppHeader(app_header)
                
            }
            if(user_header)mt.setUserHeader(user_header) 
            if(text)mt.setText(text)
            if(trailer)mt.setTrailer(trailer)
        }
        return mt
        
    }
     
}