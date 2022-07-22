export const REGEX_SET: any = Object.seal({
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  ssn: /\b\d{3}[ -.]\d{2}[ -.]\d{4}\b/,
  ipAddress: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  macAddress:
    /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/,
  creditCard:
    /\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}|\d{4}[ -]?\d{6}[ -]?\d{4}\d?/,
  slackToken: /^(xox[pborsa]-[0-9]{12}-[0-9]{12}-[0-9]{12}-[a-z0-9]{32})$/,
  awsApiKey:
    /((?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16})/,
  awsMwsAuthToken:
    /amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  awsAppsyncGraphqlKey: /da2-[a-z0-9]{26}/,
  fbAccessToken: /EAACEdEose0cBA[0-9A-Za-z]+/,
  fbOath: /[fF][aA][cC][eE][bB][oO][oO][kK].*['|\"][0-9a-f]{32}['|\"]/,
  github: /[gG][iI][tT][hH][uU][bB].*['|\"][0-9a-zA-Z]{35,40}['|\"]/,
  genericApiKey: /[aA][pP][iI]_?[kK][eE][yY].*['|\"][0-9a-zA-Z]{32,45}['|\"]/,
  genericSecret: /[sS][eE][cC][rR][eE][tT].*['|\"][0-9a-zA-Z]{32,45}['|\"]/,
  googleApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  gcpApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  gcpOath: /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  gDriveApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  gDriveOath: /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  gcpServiceKey: /\"type\": \"service_account\"/,
  gmailApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  gmailOath: /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  gmailOathAccessToken: /ya29\\.[0-9A-Za-z\\-_]+/,
  youtubeApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  youtubeOath: /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  herokuApiKey:
    /[hH][eE][rR][oO][kK][uU].*[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/,
  mailChimpApiKey: /[0-9a-f]{32}-us[0-9]{1,2}/,
  mailGunApiKey: /key-[0-9a-zA-Z]{32}/,
  passwordInUrl:
    /[a-zA-Z]{3,10}:[^/\\s:@]{3,20}:[^/\\s:@]{3,20}@.{1,100}[\"'\\s]/,
  paypalKey: /access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}/,
  picaticApiKey: /sk_live_[0-9a-z]{32}/,
  stripeApiKey: /sk_live_[0-9a-zA-Z]{24}/,
  stripeRestrictedApiKey: /rk_live_[0-9a-zA-Z]{24}/,
  squareAccessToken: /sq0atp-[0-9A-Za-z\\-_]{22}/,
  squareOath: /sq0csp-[0-9A-Za-z\\-_]{43}/,
  telegramBotApiKey: /[0-9]+:AA[0-9A-Za-z\\-_]{33}/,
  twillioApiKey: /SK[0-9a-fA-F]{32}/,
  twitterAccessToken:
    /[tT][wW][iI][tT][tT][eE][rR].*[1-9][0-9]+-[0-9a-zA-Z]{40}/,
  twitterOath: /[tT][wW][iI][tT][tT][eE][rR].*['|\"][0-9a-zA-Z]{35,44}['|\"]/,
  license:
    /[0-7][0-9]{2}[\W\s-][0-9]{2}[\W\s-][0-9]{4}|[\s\W][0-7][0-9]{8}[\s\W]/g,
  francePhone: /\b([0O]?[1lI][1lI])?[3E][3E][0O]?[\dOIlZEASB]{9}\b/g,
  germanPhone: /\b[\d\w]\d{2}[\d\w]{6}\d[\d\w]\b/g,
  ukPhone: /\b([0O]?[1lI][1lI])?[4A][4A][\dOIlZEASB]{10,11}\b/g,
  usPhone:
    /\b((\+|\b)[1l][\-\. ])?\(?\b[\dOlZSB]{3,5}([\-\. ]|\) ?)[\dOlZSB]{3}[\-\. ][\dOlZSB]{4}\b/g,
  usStreetAddress:
    /\b\d{1,8}\b[\s\S]{10,100}?\b(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)\b\s\d{5}\b/,
  ibanCode:
    /(?:(?:IT|SM)\d{2}[\w]\d{22}|CY\d{2}[\w]\d{23}|NL\d{2}[\w]{4}\d{10}|LV\d{2}[\w]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[\w]{4}\d{14}|GI\d{2}[\w]{4}\d{15}|RO\d{2}[\w]{4}\d{16}|KW\d{2}[\w]{4}\d{22}|MT\d{2}[\w]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})/g,
  passportCanada: /\b[\w]{2}[\d]{6}\b/g,
  nationalIdFrance: /\b\b\d{12}\b\b/g,
  driverLicenseFrance: /\b\d{12}\b/g,
  germanyPassport: /\b[cfghjk]\d{3}\w{5}\d\b/g,
  germanyLicense: /\b[\d\w]\d{2}[\d\w]{6}\d[\d\w]\b/g,
  ukPassport: /\b\d{9}\b/g,
  nhsUk: /\b\d{3}\s\d{3}\s\d{4}\b/g,
  ssnUs:
    /\b[\d]{3} [\d]{2} [\d]{4}|([\d] ?){3}[\—\-_] ?([\d] ?){2}[\—\-_] ?([\d] ?){4}\b/g,
  californiaAddress: /(?:^|\W)rocket(?:$|\W)/gi,
  ukAddress:
    /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/gi,
  address:
    /^(\\d{1,}) [a-zA-Z0-9\\s]+(\\,)? [a-zA-Z]+(\\,)? [A-Z]{2} [0-9]{5,6}$/,
});

export const REGEX_SET_KEYS = Object.keys(REGEX_SET);
