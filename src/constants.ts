/* eslint-disable @typescript-eslint/naming-convention */
export const apiBaseUrl = "http://apis-dev.blinktrust.com";

export const EXTENSION_ID = "blinkhubScanner";

export const VIEWS = {
  TODO_LIST: "blinkhubScanner.views.data.code.security", //'blinkhubScanner'
  TODO_REGULATORY: "blinkhubScanner.views.data.regulatory",
  TODO_PLATFORM: "blinkhubScanner.views.platform",
  TODO_HELP: "blinkhubScanner.views.support",
};

export const COMMANDS = {
  OPEN_LINK: EXTENSION_ID + ".openlink",
  REFRESH: EXTENSION_ID + ".refreshList",
  OPEN_FILE: EXTENSION_ID + ".openFile",
};

export const SEVERTITY = {
  information: 1,
  warning: 2,
  error: 3,
};

export const MAX_RESULTS = 512;

export const TODO = "TODO:";

export const REGEX = new RegExp(TODO, "g");

export const WELCOMEMSG =
  "Welcome to BlinkTrustAI Scanner for Visual Studio Code!";
export const DASHBOARDURL =
  "http://blinktrustai-web-lb-880995202.ap-south-1.elb.amazonaws.com/#discovery-section";
// export const DASHBOARDURL = 'https://www.blinktrustai.com/dashboard.html';

export const BLINKHUB_CONTEXT = {
  LOGGEDIN: "loggedIn",
  AUTHENTICATING: "authenticating",
  ERROR: "error",
};
export const BLINKHUB_ERROR_CODES = {
  TRANSIENT: "transient",
  BLOCKING: "blocking",
};

export const VALIDATOR_REGEXPS: { [key: string]: any } = Object.seal({
  // Adapted from source: https://github.com/solvvy/redact-pii/blob/da5f16f/src/built-ins/simple-regexp-patterns.ts
  // DATABASE: /(?<name>[^=;,]+)=(?<val>[^;,]+(,\d+)?)/,
  EMAIL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, //\b[\w][\w+.-]+(@|%40)[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+\b
  PROPERTY_UNIT_NUMBER:
    /([0-9]+)?(\s+([0-9]?[a-zA-Z]+\s+)+)[a-zA-Z]+(,)?(((\s+)?)+)[ ]((?:[Aa](?:la(?:(?:bam|sk)a)|merican [Ss]amoa|r(?:izona|kansas))|(?:^(?![Bb]aja )[Cc]alifornia)|[Cc]o(?:lorado|nnecticut)|[Dd](?:elaware|istrict of [Cc]olumbia)|[Ff]lorida|[Gg](?:eorgia|uam)|[Hh]awaii|[Ii](?:daho|llinois|ndiana|owa)|[Kk](?:ansas|entucky)|[Ll]ouisiana|[Mm](?:a(?:ine|ryland|ssachusetts)|i(?:chigan|nnesota|ss(?:(?:issipp|our)i))|ontana)|[Nn](?:e(?:braska|vada|w (?:[Hh]ampshire|[Jj]ersey|[Mm]exico|[Yy]ork))|orth (?:(?:[Cc]arolin|[Dd]akot)a))|[Oo](?:hio|klahoma|regon)|[Pp](?:ennsylvania|uerto [Rr]ico)|[Rr]hode [Ii]sland|[Ss]outh (?:(?:[Cc]arolin|[Dd]akot)a)|[Tt](?:ennessee|exas)|[Uu]tah|[Vv](?:ermont|irgin(?:ia| [Ii]sland(s?)))|[Ww](?:ashington|est [Vv]irginia|isconsin|yoming)|A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))?(\s+)(\d{5}(?:[- ]?\d{4})?)/, ///(apt|bldg|dept|fl|hngr|lot |pier|rm|ste|slip|trlr|unit |#)\s*\.?#?\s*[0-9]+[a-z0-9-]*\b/i,
  PROPERTY_ADDRESS:
    /\d+(\s+[nsew]\.?)?(\s+\w+){1,}\s+(?:st(?:\.|reet)?|dr(?:\.|ive)?|pl(?:\.|ace)?|ave(?:\.|nue)?|rd|road|lane|boulevard|blvd|loop|way|circle|cir|court|ct|plaza|square|run|parkway|point|pike|square|driveway|trace|park|terrace)(\s|[^a-z]|$)/,
  PROPERTY_STREET_ADDRESS:
    / (Road|Rd|Square|Street|St\.?|Parkway|Pkwy\.?|Ave\.?|Avenue|Broadway|Boulevard|Blvd.?|Lane|Terrace|Place|Gardens|Yard|Court|Way|Drive|Dr\.?|lazy)( (north|west|south|east))?$/,
  // PROPERTY_ADDRESS_UK:
  //   /.*([A-IK-PR-UWYZ]?[A-H,K-Y][0-9]?[0-9A-HJKMNP-Y][ ]?[0-9][ABD-HJLNP-UW-Z][ABD-HJLNP-UW-Z]([,]?[ ]?[A-Z]{2})?)/,
  // PROPERTY_ADDRESS_AU:
  //   /((\b(?:(?!\s{2,}|\$|\:|\.\d).)*\s(?:Alley|Ally|Arcade|Arc|Avenue|Ave|Boulevard|Bvd|Bypass|Bypa|Circuit|Cct|Close|Cl|Corner|Crn|Court|Ct|Crescent|Cres|Cul-de-sac|Cds|Drive|Dr|Esplanade|Esp|Green|Grn|Grove|Gr|Highway|Hwy|Junction|Jnc|Lane|Lane|Link|Link|Mews|Mews|Parade|Pde|Place|Pl|Ridge|Rdge|Road|Rd|Square|Sq|Street|St|Terrace|Tce|ALLEY|ALLY|ARCADE|ARC|AVENUE|AVE|BOULEVARD|BVD|BYPASS|BYPA|CIRCUIT|CCT|CLOSE|CL|CORNER|CRN|COURT|CT|CRESCENT|CRES|CUL-DE-SAC|CDS|DRIVE|DR|ESPLANADE|ESP|GREEN|GRN|GROVE|GR|HIGHWAY|HWY|JUNCTION|JNC|LANE|LANE|LINK|LINK|MEWS|MEWS|PARADE|PDE|PLACE|PL|RIDGE|RDGE|ROAD|RD|SQUARE|SQ|STREET|ST|TERRACE|TCE))\s.*?(?=\s{2,}))|(\b(?:(?!\s{2,}).)*)\b(VIC|NSW|ACT|QLD|NT|SA|TAS|WA).?\s*(\b\d{4})/,
  SSN: /\b\d{3}[ -.]\d{2}[ -.]\d{4}\b/, //\b\d{3}[\s+-]\d{2}[\s+-]\d{4}\b
  IPADDRESS: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
  //CREDITCARD: /\b[3456]\d{3}[\s+-]\d{4}[\s+-]\d{4}[\s+-]\d{4}\b/, ///\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}|\d{4}[ -]?\d{6}[ -]?\d{4}\d?/g
  CREDITCARD:
    /\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}|\d{4}[ -]?\d{6}[ -]?\d{4}\d?/, ///\b[3456]\d{15}\b/,
  TOKEN: /ya29\..{60,200}/,
  PHONE_US:
    /(\(?\+?[0-9]{1,2}\)?[-. ]?)?(\(?[0-9]{3}\)?|[0-9]{3})[-. ]?([0-9]{3}[-. ]?[0-9]{4}|\b[A-Z0-9]{7}\b)/g, //\b(\+\d{1,2}\s)?\(?\d{3}\)?[\s+.-]\d{3}[\s+.-]\d{4}\b
  // PHONE_INDIA: /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,
  // PHONE_INDIA:
  //   /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/gim,
  // PHONE_AU:
  //   /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
  // POSTAL_CODE_US:
  //   /\b((Chicago,?|Houston,?|Philadelphia,?|Phoenix,?|Alabama,?|Alaska,?|Arizona,?|Arkansas,?|California,?|Colorado,?|Connecticut,?|Delaware,?|Florida,?|Georgia,?|Hawaii,?|Idaho,?|Illinois,?|Indiana,?|Iowa,?|Kansas,?|Kentucky,?|Louisiana,?|Maine,?|Maryland,?|Massachusetts,?|Michigan,?|Minnesota,?|Mississippi,?|Missouri,?|Montana,?|North Carolina,?|North Dakota,?|Nebraska,?|Nevada,?|New Hampshire,?|New Jersey,?|New Mexico,?|New York,?|Ohio,?|Oklahoma,?|Oregon,?|Pennsylvania,?|Rhode Island,?|South Carolina,?|South Dakota,?|Tennessee,?|Texas,?|Utah,?|Vermont,?|Virginia,?|Washington,?|West Virginia,?|Wisconsin,?|Wyoming,?|American Samoa,?|D\.C\.,?|Guam,?|Puerto Rico,?|AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NC|ND|NE|NV|NH|NJ|NM|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|AS|DC|GU|MP|PR|VI)\s+\d{5}(-\d{4})?)\b/,
  // POSTAL_CODE_UK:
  //   /^([ ]?["]?[A-PR-UWYZ](([0-9](([0-9]|[A-HJKSTUW])?)?)|([A-HK-Y][0-9]([0-9]|[ABEHMNPRVWXY])?)) ?[0-9][ABD-HJLNP-UW-Z]{2}["]?)$/,
  //POSTAL_CODE_CA: /^[a-zA-Z]\d{1}[a-zA-Z](\-| |)\d{1}[a-zA-Z]\d{1}$/,
  // POSTAL_CODE_BR: /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/,
  // POSTAL_CODE_FR:
  //   /(^[0-8]\d\d{3}$)|(^9[0-5]\d{3}$)|(^97[1-6]\d{2}$)|(^98[46-8]\d{2}$)/,
  MAC_ADDRESS:
    /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/,
  // LICENSE_PLATE_NUMBERS: /\b[0-9A-Z]{3}([^ 0-9A-Z]|\s)?[0-9]{4}\b/,
  DOB: /\b(birth|birthdate|birthday|dob|born)\W+(?:\w+\W+){0,5}?(?<REDACT>(\d{4}|\d{1,2})[\/\-]\d{1,2}[\/\-](\d{4}|\d{1,2}))\b/,

  // ZIPCODE: /\b\d{5}\b(-\d{4})?\b/g,
  USDL: /\b[A-Za-z]{1}[0-9]{7}\b/,
  UKDL: /\b[\w9]{5}\d{6}[\w9]{2}\d{5}\b/,
  INDL: /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
  SLACK_TOKEN: /^(xox[pborsa]-[0-9]{12}-[0-9]{12}-[0-9]{12}-[a-z0-9]{32})$/,
  AWS_API_KEY:
    /((?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16})/,
  AMAZON_MWS_AUTH_TOKEN:
    /amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  AWS_APPSYNC_GRAPHQL_KEY: /da2-[a-z0-9]{26}/,
  FACEBOOK_ACCESS_TOKEN: /EAACEdEose0cBA[0-9A-Za-z]+/,
  FACEBOOK_OAUTH: /[fF][aA][cC][eE][bB][oO][oO][kK].*['|\"][0-9a-f]{32}['|\"]/,
  GITHUB: /[gG][iI][tT][hH][uU][bB].*['|\"][0-9a-zA-Z]{35,40}['|\"]/,
  GENERIC_API_KEY: /[aA][pP][iI]_?[kK][eE][yY].*['|\"][0-9a-zA-Z]{32,45}['|\"]/,
  GENERIC_SECRET: /[sS][eE][cC][rR][eE][tT].*['|\"][0-9a-zA-Z]{32,45}['|\"]/,
  GOOGLE_API_KEY: /AIza[0-9A-Za-z\\-_]{35}/,
  GOOGLE_CLOUD_PLATFORM_API_KEY: /AIza[0-9A-Za-z\\-_]{35}/,
  GOOGLE_CLOUD_PLATFORM_OAUTH:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  GOOGLE_DRIVE_API_KEY: /AIza[0-9A-Za-z\\-_]{35}/,
  GOOGLE_DRIVE_OAUTH:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  GOOGLE_GCP_SERVICE_ACCOUNT: /\"type\": \"service_account\"/,
  GOOGLE_GMAIL_API_KEY: /AIza[0-9A-Za-z\\-_]{35}/,
  GOOGLE_GMAIL_OAUTH:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  GOOGLE_OAUTH_ACCESS_TOKEN: /ya29\\.[0-9A-Za-z\\-_]+/,
  GOOGLE_YOUTUBE_API_KEY: /AIza[0-9A-Za-z\\-_]{35}/,
  GOOGLE_YOUTUBE_OAUTH:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  HEROKU_API_KEY:
    /[hH][eE][rR][oO][kK][uU].*[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/,
  MAILCHIMP_API_KEY: /[0-9a-f]{32}-us[0-9]{1,2}/,
  MAILGUN_API_KEY: /key-[0-9a-zA-Z]{32}/,
  PASSWORD_IN_URL:
    /[a-zA-Z]{3,10}:[^/\\s:@]{3,20}:[^/\\s:@]{3,20}@.{1,100}[\"'\\s]/,
  PAYPAL_BRAINTREE_ACCESS_TOKEN:
    /access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}/,
  PICATIC_API_KEY: /sk_live_[0-9a-z]{32}/,
  STRIPE_API_KEY: /sk_live_[0-9a-zA-Z]{24}/,
  STRIPE_RESTRICTED_API_KEY: /rk_live_[0-9a-zA-Z]{24}/,
  SQUARE_ACCESS_TOKEN: /sq0atp-[0-9A-Za-z\\-_]{22}/,
  SQUARE_OAUTH_SECRET: /sq0csp-[0-9A-Za-z\\-_]{43}/,
  TELEGRAM_BOT_API_KEY: /[0-9]+:AA[0-9A-Za-z\\-_]{33}/,
  TWILIO_API_KEY: /SK[0-9a-fA-F]{32}/,
  TWITTER_ACCESS_TOKEN:
    /[tT][wW][iI][tT][tT][eE][rR].*[1-9][0-9]+-[0-9a-zA-Z]{40}/,
  TWITTER_OAUTH: /[tT][wW][iI][tT][tT][eE][rR].*['|\"][0-9a-zA-Z]{35,44}['|\"]/,
  // UK_PASSPORT: /\d{9}\D/,
  // VIN: /^(?=.*[0-9])(?=.*[A-z])[0-9A-z-]{17}$/,
});

export const VALIDATOR_REGEXPS_KEYS = Object.keys(VALIDATOR_REGEXPS);

export const VALIDATOR_ERROR_MESSAGES: { [key: string]: any } = Object.seal({
  DATABASE: "Contains an database connection string",
  EMAIL: "Contains an email address",
  PROPERTY_UNIT_NUMBER: "Contains an US address",
  PROPERTY_ADDRESS: "Contains an address address",
  POSTAL_CODE_US: "Contains an US postal code number",
  POSTAL_CODE_UK: "Contains an UK postal code number",
  POSTAL_CODE_CA: "Contains an CA postal code number",
  POSTAL_CODE_BR: "Contains an BR postal code number",
  POSTAL_CODE_FR: "Contains an FR postal code number",
  PROPERTY_STREET_ADDRESS: "Contains a street address",
  PROPERTY_ADDRESS_UK: "Contains an UK address address",
  PROPERTY_ADDRESS_AU: "Contains an AU address address",
  SSN: "Contains a social-security number",
  IPADDRESS: "Contains an IP address",
  CREDITCARD: "Contains a credit card number",
  TOKEN: "Contains a auth token",
  PHONE_US: "Contains a US phone number",
  PHONE_INDIA: "Contains a indian phone number",
  PHONE_AU: "Contains a AU phone number",
  MAC_ADDRESS: "Contains a MAC address",
  LICENSE_PLATE_NUMBERS: "Contain a license plate number",
  ZIPCODE: "Contains an zip code number",
  USDL: "Contains a driving license (US)",
  SLACK_TOKEN: "Contains a Slack Token",
  RSA_PRIVATE_KEY: "Contains a RSA private key",
  SSH_DSA_PRIVATE_KEY: "Contains a SSH (DSA) private key",
  SSH_EC_PRIVATE_KEY: "Contains a SSH (EC) private key",
  PGP_PRIVATE_KEY_BLOCK: "Contains a PGP private key block",
  AWS_API_KEY: "Contains an AWS API Key",
  AMAZON_MWS_AUTH_TOKEN: "Contains an Amazon MWS Auth Token",
  AWS_APPSYNC_GRAPHQL_KEY: "Contains an AWS AppSync GraphQL Key",
  FACEBOOK_ACCESS_TOKEN: "Contains a Facebook Access Token",
  FACEBOOK_OAUTH: "Contains a Facebook OAuth",
  GITHUB: "Contains a GitHub",
  GENERIC_API_KEY: "Contains a Generic API Key",
  GENERIC_SECRET: "Contains a Generic Secret",
  GOOGLE_API_KEY: "Contains a Google API Key",
  GOOGLE_CLOUD_PLATFORM_API_KEY: "Contains a Google Cloud Platform API Key",
  GOOGLE_CLOUD_PLATFORM_OAUTH: "Contains a Google Cloud Platform OAuth",
  GOOGLE_DRIVE_API_KEY: "Contains a Google Drive API Key",
  GOOGLE_DRIVE_OAUTH: "Contains a Google Drive OAuth",
  GOOGLE_GCP_SERVICE_ACCOUNT: "Contains a Google (GCP) Service-account",
  GOOGLE_GMAIL_API_KEY: "Contains a Google Gmail API Key",
  GOOGLE_GMAIL_OAUTH: "Contains a Google Gmail OAuth",
  GOOGLE_OAUTH_ACCESS_TOKEN: "Contains a Google OAuth Access Token",
  GOOGLE_YOUTUBE_API_KEY: "Contains a Google YouTube API Key",
  GOOGLE_YOUTUBE_OAUTH: "Contains a Google YouTube OAuth",
  HEROKU_API_KEY: "Contains a Heroku API Key",
  MAILCHIMP_API_KEY: "Contains a MailChimp API Key",
  MAILGUN_API_KEY: "Contains a Mailgun API Key",
  PASSWORD_IN_URL: "Contains a Password in URL",
  PAYPAL_BRAINTREE_ACCESS_TOKEN: "Contains a PayPal Braintree Access Token",
  PICATIC_API_KEY: "Contains a Picatic API Key",
  STRIPE_API_KEY: "Contains a Stripe API Key",
  STRIPE_RESTRICTED_API_KEY: "Contains a Stripe Restricted API Key",
  SQUARE_ACCESS_TOKEN: "Contains a Square Access Token",
  SQUARE_OAUTH_SECRET: "Contains a Square OAuth Secret",
  TELEGRAM_BOT_API_KEY: "Contains a Telegram Bot API Key",
  TWILIO_API_KEY: "Contains a Twilio API Key",
  TWITTER_ACCESS_TOKEN: "Contains a Twitter Access Token",
  TWITTER_OAUTH: "Contains a Twitter OAuth",
  VIN: "Contains Vehicle identification Number",
  DOB: "Contains personal information DOB",
});

export const VALIDATOR_SEVERTY_ICON: { [key: string]: any } = Object.seal({
  DATABASE: "critical",
  EMAIL: "medium",
  PROPERTY_UNIT_NUMBER: "medium",
  PROPERTY_ADDRESS: "high",
  POSTAL_CODE_US: "medium",
  POSTAL_CODE_UK: "high",
  POSTAL_CODE_CA: "medium",
  POSTAL_CODE_BR: "medium",
  POSTAL_CODE_FR: "high",

  PROPERTY_STREET_ADDRESS: "medium",
  PROPERTY_ADDRESS_UK: "medium",
  PROPERTY_ADDRESS_AU: "high",

  SSN: "critical",
  IPADDRESS: "low",
  CREDITCARD: "high",
  TOKEN: "high",
  MAC_ADDRESS: "high",
  LICENSE_PLATE_NUMBERS: "high",

  PHONE_US: "medium",
  PHONE_INDIA: "high",
  PHONE_AU: "high",

  ZIPCODE: "symbol-text",
  USDL: "default-view-icon",
  SLACK_TOKEN: "key",
  RSA_PRIVATE_KEY: "key",
  SSH_DSA_PRIVATE_KEY: "key",
  SSH_EC_PRIVATE_KEY: "gist-secret",
  PGP_PRIVATE_KEY_BLOCK: "gist-secret",
  AWS_API_KEY: "key",
  AMAZON_MWS_AUTH_TOKEN: "key",
  AWS_APPSYNC_GRAPHQL_KEY: "keyt",
  FACEBOOK_ACCESS_TOKEN: "gist-secret",
  FACEBOOK_OAUTH: "gist-secret",
  GITHUB: "github",
  GENERIC_API_KEY: "key",
  GENERIC_SECRET: "key",
  GOOGLE_API_KEY: "key",
  GOOGLE_CLOUD_PLATFORM_API_KEY: "key",
  GOOGLE_CLOUD_PLATFORM_OAUTH: "key",
  GOOGLE_DRIVE_API_KEY: "key",
  GOOGLE_DRIVE_OAUTH: "key",
  GOOGLE_GCP_SERVICE_ACCOUNT: "key",
  GOOGLE_GMAIL_API_KEY: "key",
  GOOGLE_GMAIL_OAUTH: "key",
  GOOGLE_OAUTH_ACCESS_TOKEN: "key",
  GOOGLE_YOUTUBE_API_KEY: "key",
  GOOGLE_YOUTUBE_OAUTH: "key",
  HEROKU_API_KEY: "key",
  MAILCHIMP_API_KEY: "key",
  MAILGUN_API_KEY: "key",
  PASSWORD_IN_URL: "keybindings-edit",
  PAYPAL_BRAINTREE_ACCESS_TOKEN: "key",
  PICATIC_API_KEY: "key",
  STRIPE_API_KEY: "key",
  STRIPE_RESTRICTED_API_KEY: "key",
  SQUARE_ACCESS_TOKEN: "key",
  SQUARE_OAUTH_SECRET: "key",
  TELEGRAM_BOT_API_KEY: "key",
  TWILIO_API_KEY: "key",
  TWITTER_ACCESS_TOKEN: "key",
  TWITTER_OAUTH: "key",
  VIN: "medium",
  DOB: "medium",
});

export const VALIDATOR_ICON: { [key: string]: any } = Object.seal({
  DATABASE: "database",
  EMAIL: "key",
  PROPERTY_UNIT_NUMBER: "symbol-text",
  PROPERTY_ADDRESS: "symbol-text",
  POSTAL_CODE_US: "symbol-text",
  POSTAL_CODE_UK: "symbol-text",
  PROPERTY_STREET_ADDRESS: "symbol-text",
  PROPERTY_ADDRESS_UK: "symbol-text",
  SSN: "default-view-icon",
  IPADDRESS: "debug-disconnect",
  CREDITCARD: "credit-card",
  TOKEN: "key",
  PHONE: "callhierarchy-incoming",

  ZIPCODE: "symbol-text",
  USDL: "default-view-icon",
  SLACK_TOKEN: "key",
  RSA_PRIVATE_KEY: "key",
  SSH_DSA_PRIVATE_KEY: "key",
  SSH_EC_PRIVATE_KEY: "gist-secret",
  PGP_PRIVATE_KEY_BLOCK: "gist-secret",
  AWS_API_KEY: "key",
  AMAZON_MWS_AUTH_TOKEN: "key",
  AWS_APPSYNC_GRAPHQL_KEY: "keyt",
  FACEBOOK_ACCESS_TOKEN: "gist-secret",
  FACEBOOK_OAUTH: "gist-secret",
  GITHUB: "github",
  GENERIC_API_KEY: "key",
  GENERIC_SECRET: "key",
  GOOGLE_API_KEY: "key",
  GOOGLE_CLOUD_PLATFORM_API_KEY: "key",
  GOOGLE_CLOUD_PLATFORM_OAUTH: "key",
  GOOGLE_DRIVE_API_KEY: "key",
  GOOGLE_DRIVE_OAUTH: "key",
  GOOGLE_GCP_SERVICE_ACCOUNT: "key",
  GOOGLE_GMAIL_API_KEY: "key",
  GOOGLE_GMAIL_OAUTH: "key",
  GOOGLE_OAUTH_ACCESS_TOKEN: "key",
  GOOGLE_YOUTUBE_API_KEY: "key",
  GOOGLE_YOUTUBE_OAUTH: "key",
  HEROKU_API_KEY: "key",
  MAILCHIMP_API_KEY: "key",
  MAILGUN_API_KEY: "key",
  PASSWORD_IN_URL: "keybindings-edit",
  PAYPAL_BRAINTREE_ACCESS_TOKEN: "key",
  PICATIC_API_KEY: "key",
  STRIPE_API_KEY: "key",
  STRIPE_RESTRICTED_API_KEY: "key",
  SQUARE_ACCESS_TOKEN: "key",
  SQUARE_OAUTH_SECRET: "key",
  TELEGRAM_BOT_API_KEY: "key",
  TWILIO_API_KEY: "key",
  TWITTER_ACCESS_TOKEN: "key",
  TWITTER_OAUTH: "key",
});

export const VALIDATOR_ERROR_LEVEL: { [key: string]: any } = Object.seal({
  DATABASE: "Error",
  EMAIL: "Warning",
  PROPERTY_UNIT_NUMBER: "Warning",
  PROPERTY_ADDRESS: "Error",
  POSTAL_CODE_US: "Warning",
  POSTAL_CODE_UK: "Warning",
  POSTAL_CODE_CA: "Warning",
  POSTAL_CODE_BR: "Error",
  POSTAL_CODE_FR: "Error",

  PROPERTY_STREET_ADDRESS: "Warning",
  PROPERTY_ADDRESS_UK: "Warning",
  PROPERTY_ADDRESS_AU: "Error",
  SSN: "Error",
  IPADDRESS: "Warning",
  CREDITCARD: "Error",
  TOKEN: "Error",
  PHONE_US: "Warning",
  PHONE_INDIA: "Error",
  PHONE_AU: "Error",
  MAC_ADDRESS: "Error",
  LICENSE_PLATE_NUMBERS: "Error",

  ZIPCODE: "symbol-text",
  USDL: "default-view-icon",
  SLACK_TOKEN: "key",
  RSA_PRIVATE_KEY: "key",
  SSH_DSA_PRIVATE_KEY: "key",
  SSH_EC_PRIVATE_KEY: "gist-secret",
  PGP_PRIVATE_KEY_BLOCK: "gist-secret",
  AWS_API_KEY: "key",
  AMAZON_MWS_AUTH_TOKEN: "key",
  AWS_APPSYNC_GRAPHQL_KEY: "keyt",
  FACEBOOK_ACCESS_TOKEN: "gist-secret",
  FACEBOOK_OAUTH: "gist-secret",
  GITHUB: "github",
  GENERIC_API_KEY: "key",
  GENERIC_SECRET: "key",
  GOOGLE_API_KEY: "key",
  GOOGLE_CLOUD_PLATFORM_API_KEY: "key",
  GOOGLE_CLOUD_PLATFORM_OAUTH: "key",
  GOOGLE_DRIVE_API_KEY: "key",
  GOOGLE_DRIVE_OAUTH: "key",
  GOOGLE_GCP_SERVICE_ACCOUNT: "key",
  GOOGLE_GMAIL_API_KEY: "key",
  GOOGLE_GMAIL_OAUTH: "key",
  GOOGLE_OAUTH_ACCESS_TOKEN: "key",
  GOOGLE_YOUTUBE_API_KEY: "key",
  GOOGLE_YOUTUBE_OAUTH: "key",
  HEROKU_API_KEY: "key",
  MAILCHIMP_API_KEY: "key",
  MAILGUN_API_KEY: "key",
  PASSWORD_IN_URL: "keybindings-edit",
  PAYPAL_BRAINTREE_ACCESS_TOKEN: "key",
  PICATIC_API_KEY: "key",
  STRIPE_API_KEY: "key",
  STRIPE_RESTRICTED_API_KEY: "key",
  SQUARE_ACCESS_TOKEN: "key",
  SQUARE_OAUTH_SECRET: "key",
  TELEGRAM_BOT_API_KEY: "key",
  TWILIO_API_KEY: "key",
  TWITTER_ACCESS_TOKEN: "key",
  TWITTER_OAUTH: "key",
  // VIN: "Warning",
  // DOB: "Warning",
});

export const VALIDATOR_ERROR_REASONS: { [key: string]: any } = Object.seal({
  DATABASE: "Database connection string disallowed",
  EMAIL: "Email addresses disallowed!",
  PROPERTY_UNIT_NUMBER: "Address disallowed!",
  PROPERTY_ADDRESS: "Addresses disallowed!",
  POSTAL_CODE_US: "Postal code disallowed!",
  POSTAL_CODE_UK: "Postal code disallowed!",
  POSTAL_CODE_CA: "Addresses disallowed!",
  POSTAL_CODE_BR: "Addresses disallowed!",
  POSTAL_CODE_FR: "Addresses disallowed!",
  PROPERTY_STREET_ADDRESS: "Street addresses disallowed!",
  PROPERTY_ADDRESS_UK: "Address disallowed!",
  PROPERTY_ADDRESS_AU: "Addresses disallowed!",
  SSN: "Social-Security Numbers disallowed!",
  IPADDRESS: "IP Address disallowed!",
  CREDITCARD: "Credit Card Numbers disallowed!",
  TOKEN: "oAuth Token disallowed!",
  PHONE_US: "Phone Numbers disallowed!",
  PHONE_INDIA: "Phone Numbers disallowed!",
  PHONE_AU: "Phone Numbers disallowed!",
  MAC_ADDRESS: "MAC Address disallowed!",
  LICENSE_PLATE_NUMBERS: "License Plate Number disallowed!",

  ZIPCODE: "Zip Code Numbers disallowed!",
  USDL: "Driving Licenses disallowed!",
  SLACK_TOKEN: "Contains a Slack Token",
  RSA_PRIVATE_KEY: "Contains a RSA private key",
  SSH_DSA_PRIVATE_KEY: "Contains a SSH (DSA) private key",
  SSH_EC_PRIVATE_KEY: "Contains a SSH (EC) private key",
  PGP_PRIVATE_KEY_BLOCK: "Contains a PGP private key block",
  AWS_API_KEY: "Contains an AWS API Key",
  AMAZON_MWS_AUTH_TOKEN: "Contains an Amazon MWS Auth Token",
  AWS_APPSYNC_GRAPHQL_KEY: "Contains an AWS AppSync GraphQL Key",
  FACEBOOK_ACCESS_TOKEN: "Contains a Facebook Access Token",
  FACEBOOK_OAUTH: "Contains a Facebook OAuth",
  GITHUB: "Contains a GitHub",
  GENERIC_API_KEY: "Contains a Generic API Key",
  GENERIC_SECRET: "Contains a Generic Secret",
  GOOGLE_API_KEY: "Contains a Google API Key",
  GOOGLE_CLOUD_PLATFORM_API_KEY: "Contains a Google Cloud Platform API Key",
  GOOGLE_CLOUD_PLATFORM_OAUTH: "Contains a Google Cloud Platform OAuth",
  GOOGLE_DRIVE_API_KEY: "Contains a Google Drive API Key",
  GOOGLE_DRIVE_OAUTH: "Contains a Google Drive OAuth",
  GOOGLE_GCP_SERVICE_ACCOUNT: "Contains a Google (GCP) Service-account",
  GOOGLE_GMAIL_API_KEY: "Contains a Google Gmail API Key",
  GOOGLE_GMAIL_OAUTH: "Contains a Google Gmail OAuth",
  GOOGLE_OAUTH_ACCESS_TOKEN: "Contains a Google OAuth Access Token",
  GOOGLE_YOUTUBE_API_KEY: "Contains a Google YouTube API Key",
  GOOGLE_YOUTUBE_OAUTH: "Contains a Google YouTube OAuth",
  HEROKU_API_KEY: "Contains a Heroku API Key",
  MAILCHIMP_API_KEY: "Contains a MailChimp API Key",
  MAILGUN_API_KEY: "Contains a Mailgun API Key",
  PASSWORD_IN_URL: "Contains a Password in URL",
  PAYPAL_BRAINTREE_ACCESS_TOKEN: "Contains a PayPal Braintree Access Token",
  PICATIC_API_KEY: "Contains a Picatic API Key",
  STRIPE_API_KEY: "Contains a Stripe API Key",
  STRIPE_RESTRICTED_API_KEY: "Contains a Stripe Restricted API Key",
  SQUARE_ACCESS_TOKEN: "Contains a Square Access Token",
  SQUARE_OAUTH_SECRET: "Contains a Square OAuth Secret",
  TELEGRAM_BOT_API_KEY: "Contains a Telegram Bot API Key",
  TWILIO_API_KEY: "Contains a Twilio API Key",
  TWITTER_ACCESS_TOKEN: "Contains a Twitter Access Token",
  TWITTER_OAUTH: "Contains a Twitter OAuth",
  VIN: "Contains a Virtual identification number",
  DOB: "Contains personal information DOB",
});

export const INCLUDE = [
  "**/*.js",
  "**/*.ts",
  "**/*.jsx",
  "**/*.tsx",
  "**/*.html",
  "**/*.vue",
  "**/*.sass",
  "**/*.less",
  "**/*.styl",
  "**/*.py",
  "**/*.php",
  "**/*.md",
];

export const EXCLUDE = [
  "**/node_modules/**",
  "**/bower_components/**",
  "**/dist/**",
  "**/out/**",
  "**/build/**",
  "**/.*/**",
  "**/env/**"
];

export enum ExtensionCommand {
  SHOW_INFORMATION_MESSAGE = "show.information.message",
  SHOW_WARNING_MESSAGE = "show.warning.message",
  SHOW_ERROR_MESSAGE = "show.error.message",
  SHOW_ALL_MESSAGES = "show.all.messages",
  START_PROGRESS_BADGE = "start.progress.badge",
  STOP_PROGRESS_BADGE = "stop.progress.badge",
}

// VS Code configuration settings
// Ensure consistency with package.json when changing these constants
exports.CONFIGURATION_IDENTIFIER = "blinkhubScanner";
exports.TOKEN_SETTING = `${exports.CONFIGURATION_IDENTIFIER}.token`;
exports.YES_WELCOME_NOTIFICATION_SETTING = `${exports.CONFIGURATION_IDENTIFIER}.yesWelcomeNotification`;
exports.ADVANCED_AUTOSCAN_DATA_SECURITY_SETTING = `${exports.CONFIGURATION_IDENTIFIER}.autoScanDataSecurity`;

export const JsApiComment = "/*  Hello I am comment  */";
