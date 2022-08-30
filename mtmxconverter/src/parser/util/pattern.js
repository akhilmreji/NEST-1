const XRegExp=require('xregexp')
var regexMap=new Map()
//character sets
const x="[a-zA-Z0-9/\-?()+,' ]";
const a="[A-Z]"
const c="[A-Z0-9]"
const H="[ADBCEDF0-9]"
const h="[abcdef0-9]"
const d="[0-9,]"
const y="[A-Z0-9.,\–()/=‘+:?!”%&*<>;]"
const n="[0-9]"

//Hash Map
//appheader Input
regexMap.set("appHI",XRegExp(`2:(?<ioId>I)(?<msgtype>${n}{3})(?<destAddr>${x}{12})(?<priority>[SUN])?(?<del>[123])?(?<obp>${n}{3})?`,'x'))
//appheader Output
regexMap.set("appHO",XRegExp(`2:(?<ioId>O)(?<msgtype>${n}{3})(?<inputtime>${n}{4})(?<mirdate>${n}{6})(?<mirlt>${c}{12})(?<mirsn>${n}{4})(?<mirseqnum>${n}{6})(?<outdate>${n}{6})(?<outtime>${n}{4})(?<priority>[SUN])?`,'x'))
//basic Header
regexMap.set("basicH",XRegExp(`^1:(?<appId>[FAL])(?<serviceId>01|21)(?<ltaddr>${x}{12})(?<sessnum>${n}{4}(?<seqnum>${n}{6}))$`,'x'))

//user header
regexMap.set("103",XRegExp(`^${a}{3}$`,'x'))
regexMap.set("113",XRegExp(`^${x}{4}$`,'x'))
regexMap.set("108",XRegExp(`^${x}{16}$`,'x'))
regexMap.set("119",XRegExp(`^${c}{0,8}$`,'x'))
regexMap.set("423",XRegExp(`^(?<date>${n}{6})(?<time>${n}{6})(?<ms>${n}{2})?$`,'x'))
regexMap.set("106",XRegExp(`^(?<date>${n}{6})(?<ltId>${x}{12})(?<sessnum>${n}{4})(?<seqnum>${n}{6})$`,'x'))
regexMap.set("424",XRegExp(`^${x}{0,16}$`,'x'))
regexMap.set("111",XRegExp(`^${n}{3}$`,'x'))
regexMap.set("121",XRegExp(`^${h}{8}-${h}{4}-4${h}{3}-[89ab]${h}{15}$`,'x'))
regexMap.set("115",XRegExp(`^(?<credittime>${n}{6})? (?<debittime>${n}{6})? (?<countrycode>${a}{2})? (?<SSP>${c}{12})$`,''))
regexMap.set("165",XRegExp(`^/${c}{3}/${x}{0,34}$`,'x'))
regexMap.set("433",XRegExp(`^/${a}{3}/?${x}{0,20}?$`,'x'))
regexMap.set("434",XRegExp(`^/${a}{3}/?${x}{0,20}?$`,'x'))

//Trailer
regexMap.set("CHK",XRegExp(`^${H}{12}$`,'x'))//Mandatory
regexMap.set("TNG",XRegExp('','x'))
regexMap.set("PDE",XRegExp(`^(?<timemir>${n}{4})(?<datemr>${n}{6})(?<ltIdmir>${x}{12})(?<sessnummir>${n}{4})(?<seqnummir>${n}{6})$`,'x'))
regexMap.set("DLM",XRegExp('','x'))
regexMap.set("MRF",XRegExp(`^(?<date>${n}{6})(?<time>${n}{4})(?<timemir>${n}{4})(?<datemir>${n}{6})(?<ltIdmir>${x}{12})(?<sessnummir>${n}{4})(?<seqnummir>${n}{6})$`,'x'))
regexMap.set("PDM",XRegExp(`^(?<time>${n}{4})(?<datemor>${n}{6})(?<ltIdmor>${x}{12})(?<brcode>${c}{3})(?<sessnummor>${n}{4})(?<seqnummir>${n}{6})$`,'x'))
regexMap.set("SYS",XRegExp(`^(?<time>${n}{4})(?<datemor>${n}{6})(?<ltIdmor>${x}{12})(?<brcode>${c}{3})(?<sessnummor>${n}{4})(?<seqnummir>${n}{6})$`,'x'))


//field
regexMap.set("20",XRegExp(`^(?<insId>${x}{0,16})$`),'x');
regexMap.set("13C",XRegExp(`^/(?<code> ${x} {0,8})/(?<timeindication>${n}{4})(?<sign> [\+\-])(?<offset>${n}{4})`,'x'))
regexMap.set("23B",XRegExp(`^(?<prop>${c}{4})$`),'x')
regexMap.set("32A", XRegExp(`^(?<date>${n}{6})(?<currency>${a}{3})(?<amount>${d}{0,15})$`,'x'))
regexMap.set("50A",[XRegExp(`/?(?<account>${x}{0,34})`,'x',),XRegExp(`(?<code>${a}{6}${c}{2})(?<continue> ${c}{3})?`,'x')])
regexMap.set("50F",[XRegExp(`(?<account> ${x}{0,35})`,'x'),XRegExp(`^(?<number>${n}{1}) / (?<value>${x}{1,33})$`,'x')])
regexMap.set("50F1",[XRegExp(`^/(?<account>${x}{0,35})$`,'x'),XRegExp(`(?<number>${n}{1}) / (?<value>${x}{1,33})`,'x')])
regexMap.set("50F2",[XRegExp(`(?<code>${a}{4})?/(?<countrycode>${a}{2})/(?<identifier>${x}{0,27})`,'x'),XRegExp(` (?<number> ${d}{1}) / (?<value> ${x}{0,33}) `,'x')])

regexMap.set("50K",[XRegExp(`^/(?<account>${x}{0,34})$`,'x'),XRegExp(`(?<account>${x}{0,34})`,'x')])
regexMap.set("59",[XRegExp(`(^/(?<account> ${x}{0,34})$)?`,'x'),XRegExp(`/? (?<address> ${x}{0,35}) `,'x')])
regexMap.set("59A",[XRegExp(`(^/(?<account> ${x}{0,35})$)?`,'x'),XRegExp(`(?<code>${a}{6}${c}{2})(?<continue> ${c}{3})?`,'x')])
regexMap.set("59F",[XRegExp(`(^/(?<account> ${x}{0,35})$)?`,'x'),XRegExp(`/? (?<number> ${d}{1}) /? (?<name> ${x}{0,33})  `,'x')])
regexMap.set("71A",XRegExp(`/? (?<code>${a}{3}) `,'x'))
module.exports=regexMap