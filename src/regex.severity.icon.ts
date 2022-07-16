const REGEX_SEVERITY_ICONS_OBJECT: any = Object.seal({
  // Mobile Numbers
  FRANCE_MOBILE_NUMBER: "medium",
  GERMAN_MOBILE_NUMBER: "medium",
  UK_MOBILE_NUMBER: "medium",
  US_MOBILE_NUMBER: "medium",

  // Universal Regex
  EMAIL_ADDRESS: "medium",
  BIRTH_DATE: "medium",
  IPV4_ADDRESS: "low",
  IPV6_ADDRESS: "low",

  // Address Regex
  US_STREET_ADDRESS: "high",

  // Financial Regex
  CREDT_CARD: "high",

  AMEX_CARD: "high",
  BCGLOABL_CARD: "high",
  DINERS_CLUB_CARD: "high",
  CARTE_BLANCHE_CARD: "high",
  DISCOVER_CARD: "high",
  INSTA_PAYMENT_CARD: "high",
  JCB_CARD: "high",
  KOREAN_LOCAL_CARD: "high",
  LASER_CARD: "high",
  MAESTRO_CARD: "high",
  MASTER_CARD: "high",
  SOLO_CARD: "high",
  SWITCH_CARD: "high",
  UNION_PAY_CARD: "high",
  VISA_CARD: "high",
  VISA_MASTER_CARD: "high",

  //   Transit Routes codes\b
  ABA_US: "low",

  // SWIFT CODE
  SWIFT_CODE: "low",

  // IBAN Codes
  IBAN_CODE: "low",

  // Government Ids
  DNI_NUMBER: "high",

  TAX_FILE_NUMBER_AU: "high",

  PASSPORT_ID_CA: "high",

  VAT_ID_CROATIA: "high",

  VAT_ID_CZECH: "high",

  PID_DENMARK: "high",

  CNI_FRANCE: "high",

  INSEE_SSN_FR: "high",

  DRIVER_LICENSE_FR: "high",

  PASSPORT_ID_FR: "high",

  IDN_GERMANY: "high",

  PASSPORT_ID_GR: "high",

  DRIVER_GR: "high",

  PPS_IR: "high",

  BSN_NL: "high",

  NID_POLAND: "high",

  CCN_PORTUGAL: "high",

  SSN_SPAIN: "high",

  PASSPORT_UK: "high",

  NHS_UK: "high",

  SSN_US: "high",
});

export const REGEX_SEVERITY_ICONS = Object.keys(REGEX_SEVERITY_ICONS_OBJECT);
