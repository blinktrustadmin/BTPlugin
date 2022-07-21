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
  gcpOath:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  gDriveApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  gDriveOath:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  gcpServiceKey: /\"type\": \"service_account\"/,
  gmailApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  gmailOath:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  gmailOathAccessToken: /ya29\\.[0-9A-Za-z\\-_]+/,
  youtubeApiKey: /AIza[0-9A-Za-z\\-_]{35}/,
  youtubeOath:
    /[0-9]+-[0-9A-Za-z_]{32}\\.apps\\.googleusercontent\\.com/,
  herokuApiKey:
    /[hH][eE][rR][oO][kK][uU].*[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/,
  mailChimpApiKey: /[0-9a-f]{32}-us[0-9]{1,2}/,
  mailGunApiKey: /key-[0-9a-zA-Z]{32}/,
  passwordInUrl:
    /[a-zA-Z]{3,10}:[^/\\s:@]{3,20}:[^/\\s:@]{3,20}@.{1,100}[\"'\\s]/,
  paypalKey:
    /access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}/,
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
});

export const REGEX_SET_KEYS = Object.keys(REGEX_SET);
