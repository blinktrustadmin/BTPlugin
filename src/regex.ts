const REGEX_PII: any = Object.seal({
  // Mobile Numbers
  FRANCE_MOBILE_NUMBER: /\b([0O]?[1lI][1lI])?[3E][3E][0O]?[\dOIlZEASB]{9}\b/gim,
  GERMAN_MOBILE_NUMBER: /\b[\d\w]\d{2}[\d\w]{6}\d[\d\w]\b/gim,
  UK_MOBILE_NUMBER: /\b([0O]?[1lI][1lI])?[4A][4A][\dOIlZEASB]{10,11}\b/gim,
  US_MOBILE_NUMBER:
    /\b((\+|\b)[1l][\-\. ])?\(?\b[\dOlZSB]{3,5}([\-\. ]|\) ?)[\dOlZSB]{3}[\-\. ][\dOlZSB]{4}\b/gim,

  // Universal Regex
  EMAIL_ADDRESS: /\b[a-z0-9._%\+\-—|]+@[a-z0-9.\-—|]+\.[a-z|]{2,6}\b/gim,
  BIRTH_DATE:
    /\b(birth|birthdate|birthday|dob|born)\W+(?:\w+\W+){0,5}?(?<REDACT>(\d{4}|\d{1,2})[\/\-]\d{1,2}[\/\-](\d{4}|\d{1,2}))\b/gim,
  IPV4_ADDRESS: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/gim,
  IPV6_ADDRESS: /\b([\d\w]{4}|0)(\:([\d\w]{4}|0)){7}\b/gim,

  // Address Regex
  US_STREET_ADDRESS:
    /\b\d{1,8}\b[\s\S]{10,100}?\b(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)\b\s\d{5}\b/gim,

  // Financial Regex
  CREDT_CARD:
    /\b((4\d{3}|5[1-5]\d{2}|2\d{3}|3[47]\d{1,2})[\s\-]?\d{4,6}[\s\-]?\d{4,6}?([\s\-]\d{3,4})?(\d{3})?)\b/gim,

  AMEX_CARD: /\b3[47][0-9]{13}\b/gim,
  BCGLOABL_CARD: /\b(6541|6556)[0-9]{12}\b/gim,
  DINERS_CLUB_CARD: /\b3(?:0[0-5]|[68][0-9])[0-9]{11}\b/gim,
  CARTE_BLANCHE_CARD: /\b389[0-9]{11}\b/gim,
  DISCOVER_CARD:
    /\b65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})\b/gim,
  INSTA_PAYMENT_CARD: /\b63[7-9][0-9]{13}\b/gim,
  JCB_CARD: /\b(?:2131|1800|35\d{3})\d{11}\b/gim,
  KOREAN_LOCAL_CARD: /\b9[0-9]{15}\b/gim,
  LASER_CARD: /\b(6304|6706|6709|6771)[0-9]{12,15}\b/gim,
  MAESTRO_CARD: /\b(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}\b/gim,
  MASTER_CARD:
    /\b(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})\b/gim,
  SOLO_CARD:
    /\b(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}\b/gim,
  SWITCH_CARD:
    /\b(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}\b/gim,
  UNION_PAY_CARD: /\b(62[0-9]{14,17})\b/gim,
  VISA_CARD: /\b4[0-9]{12}(?:[0-9]{3})?\b/gim,
  VISA_MASTER_CARD: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\b/gim,

  //   Transit Routes codes\b
  ABA_US:
    /\b((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})\b/gim,

  // SWIFT CODE
  SWIFT_CODE: /\b[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?\b/gim,

  // IBAN Codes
  IBAN_CODE:
    /(?:(?:IT|SM)\d{2}[\w]\d{22}|CY\d{2}[\w]\d{23}|NL\d{2}[\w]{4}\d{10}|LV\d{2}[\w]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[\w]{4}\d{14}|GI\d{2}[\w]{4}\d{15}|RO\d{2}[\w]{4}\d{16}|KW\d{2}[\w]{4}\d{22}|MT\d{2}[\w]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})/gim,

  // Government Ids
  DNI_NUMBER: /\d{2}\.\d{3}\.\d{3}/gim,
  TAX_FILE_NUMBER_AU: /TFN(:|:\s|\s|)(?<redact>(\d{8,9}))/gim,
  PASSPORT_ID_CA: /\b[\w]{2}[\d]{6}\b/gim,
  VAT_ID_CROATIA: /\bHR\d{11}\b/igm,
  VAT_ID_CZECH: /\bCZ\d{8,10}\b/igm,
  PID_DENMARK: /\b\d{10}|\d{6}[-\s]\d{4}\b/igm,
  CNI_FRANCE: /\b\b\d{12}\b\b/igm,
  INSEE_SSN_FR: /\b\d{13}|\d{13}\s\d{2}\b/igm,
  DRIVER_LICENCE_FR: /\b\d{12}\b/igm,
  PASSPORT_ID_FR: /\b\d{2}11\d{5}\b/igm,
  IDN_GERMANY: /\b[cfghjk]\d{3}\w{5}\d\b/igm,
  PASSPORT_ID_GR: /\b[\d\w]\d{2}[\d\w]{6}\d[\d\w]\b/igm,
  DRIVER_GR: /\b[\d\w]\d{2}[\d\w]{6}\d[\d\w]\b/igm,
  PPS_IR: /\b\d{7}\w{1,2}\b/igm,
  BSN_NL: /\b\d{8}|\d{3}[-\.\s]\d{3}[-\.\s]\d{3}\b/igm,
  NID_POLAND: /\b\d{11}\b/igm,
  CCN_PORTUGAL: /\d{9}[\w\d]{2}|\d{8}-\d[\d\w]{2}\d/igm,
  SSN_SPAIN: /\b\d{2}\/?\d{8}\/?\d{2}\b/igm,
  PASSPORT_UK: /\b\d{9}\b/igm,
  NHS_UK: /\b\d{3}\s\d{3}\s\d{4}\b/igm,
  SSN_US: /\b[\dlZEASBO]{3} [\dlZEASBO]{2} [\dlZEASBO]{4}|([\dlZEASBO] ?){3}[\—\-_] ?([\dlZEASBO] ?){2}[\—\-_] ?([\dlZEASBO] ?){4}\b/igm,

});


export const REGEX_KEYS = Object.keys(REGEX_PII);