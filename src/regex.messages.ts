const REGEX_MESSAGES: any = Object.seal({
  // Mobile Numbers
  FRANCE_MOBILE_NUMBER: "Contains France mobile number",
  GERMAN_MOBILE_NUMBER: "Contains Germany mobile number",
  UK_MOBILE_NUMBER: "Contains UK mobile number",
  US_MOBILE_NUMBER: "Contains US mobile number",

  // Universal Regex
  EMAIL_ADDRESS: "Contains email address",
  BIRTH_DATE: "Contains birth date",
  IPV4_ADDRESS: "Contains IPV4 address",
  IPV6_ADDRESS: "Contains IPV6 address",

  // Address Regex
  US_STREET_ADDRESS: "Contains US address",

  // Financial Regex
  CREDT_CARD: "Contains Credit card number",

  AMEX_CARD: "Contains AMEX Credit card number",
  BCGLOABL_CARD: "Contains BC Global card number",
  DINERS_CLUB_CARD: "Contains Diners Club card number",
  CARTE_BLANCHE_CARD: "Contains Carte Blanche card number",
  DISCOVER_CARD: "Contains Discover card number",
  INSTA_PAYMENT_CARD: "Contains Insta Payment card number",
  JCB_CARD: "Contains JCB card number",
  KOREAN_LOCAL_CARD: "Contains Korean card number",
  LASER_CARD: "Contains Laser card number",
  MAESTRO_CARD: "Contains Maestro card number",
  MASTER_CARD: "Contains Master card number",
  SOLO_CARD: "Contains Solo card number",
  SWITCH_CARD: "Contains Switch card number",
  UNION_PAY_CARD: "Contains Union pay card number",
  VISA_CARD: "Contains Visa card number",
  VISA_MASTER_CARD: "Contains Visa Master card number",

  //   Transit Routes codes\b
  ABA_US: "Contains American Banker association number",

  // SWIFT CODE
  SWIFT_CODE: "Contains Swift code",

  // IBAN Codes
  IBAN_CODE: "Contains IBAN code",

  // Government Ids
  DNI_NUMBER: "Contains Argentina DNI number",
  TAX_FILE_NUMBER_AU: "Contains Australia Tax file number",
  PASSPORT_ID_CA: "Contains Canada passport id",
  VAT_ID_CROATIA: "Contains Croatia vat number",
  VAT_ID_CZECH: "Contains Czech vat number",
  PID_DENMARK: "Contains Denmark personal id",
  CNI_FRANCE: "Contains France national id",
  INSEE_SSN_FR: "Contains France SSN number",
  DRIVER_LICENSE_FR: "Contains France driver's license number",
  PASSPORT_ID_FR: "Contains France passport id",
  IDN_GERMANY: "Contains Germany ID number",
  PASSPORT_ID_GR: "Contains Germany passport id",
  DRIVER_GR: "Contains Germany driver's license number",
  PPS_IR: "Contains Ireland PPS number",
  BSN_NL: "Contains Netherlands BSN number",
  NID_POLAND: "Contains Poland national id",
  CCN_PORTUGAL: "Contains Portugal citizen card number",
  SSN_SPAIN: "Contains Spain SSN",
  PASSPORT_UK: "Contains UK passport number",

  NHS_UK: "Contains UK NHS number",
  SSN_US: "Contains US SSN",
});

export const REGEX_MESSAGE_KEYS = Object.keys(REGEX_MESSAGES);
