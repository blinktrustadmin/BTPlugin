const REGEX_ICONS_OBJECT: any = Object.seal({
  // Mobile Numbers
  FRANCE_MOBILE_NUMBER: "callhierarchy-incoming",
  GERMAN_MOBILE_NUMBER: "callhierarchy-incoming",
  UK_MOBILE_NUMBER: "callhierarchy-incoming",
  US_MOBILE_NUMBER: "callhierarchy-incoming",

  // Universal Regex
  EMAIL_ADDRESS: "key",
  BIRTH_DATE: "Contains birth date",
  IPV4_ADDRESS: "debug-disconnect",
  IPV6_ADDRESS: "debug-disconnect",

  // Address Regex
  US_STREET_ADDRESS: "symbol-text",

  // Financial Regex
  CREDT_CARD: "credit-card",

  AMEX_CARD: "credit-card",
  BCGLOABL_CARD: "credit-card",
  DINERS_CLUB_CARD: "credit-card",
  CARTE_BLANCHE_CARD: "credit-card",
  DISCOVER_CARD: "credit-card",
  INSTA_PAYMENT_CARD: "credit-card",
  JCB_CARD: "credit-card",
  KOREAN_LOCAL_CARD: "credit-card",
  LASER_CARD: "credit-card",
  MAESTRO_CARD: "credit-card",
  MASTER_CARD: "credit-card",
  SOLO_CARD: "credit-card",
  SWITCH_CARD: "credit-card",
  UNION_PAY_CARD: "credit-card",
  VISA_CARD: "credit-card",
  VISA_MASTER_CARD: "credit-card",

  //   Transit Routes codes\b
  ABA_US: "key",

  // SWIFT CODE
  SWIFT_CODE: "key",

  // IBAN Codes
  IBAN_CODE: "key",

  // Government Ids
  DNI_NUMBER: "key",

  TAX_FILE_NUMBER_AU: "key",

  PASSPORT_ID_CA: "key",

  VAT_ID_CROATIA: "key",

  VAT_ID_CZECH: "key",

  PID_DENMARK: "key",

  CNI_FRANCE: "key",

  INSEE_SSN_FR: "key",

  DRIVER_LICENSE_FR: "key",

  PASSPORT_ID_FR: "key",

  IDN_GERMANY: "key",

  PASSPORT_ID_GR: "key",

  DRIVER_GR: "key",

  PPS_IR: "key",

  BSN_NL: "key",

  NID_POLAND: "key",

  CCN_PORTUGAL: "key",

  SSN_SPAIN: "key",

  PASSPORT_UK: "key",

  NHS_UK: "key",

  SSN_US: "key",
});

export const REGEX_ICONS = Object.keys(REGEX_ICONS_OBJECT);
