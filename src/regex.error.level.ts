const REGEX_ERROR_LEVEL_OBJECT: any = Object.seal({
    // Mobile Numbers
    FRANCE_MOBILE_NUMBER: "Warning",
    GERMAN_MOBILE_NUMBER: "Warning",
    UK_MOBILE_NUMBER: "Warning",
    US_MOBILE_NUMBER: "Warning",
  
    // Universal Regex
    EMAIL_ADDRESS: "Warning",
    BIRTH_DATE: "medium",
    IPV4_ADDRESS: "Warning",
    IPV6_ADDRESS: "Warning",
  
    // Address Regex
    US_STREET_ADDRESS: "Error",
  
    // Financial Regex
    CREDT_CARD: "Error",
  
    AMEX_CARD: "Error",
    BCGLOABL_CARD: "Error",
    DINERS_CLUB_CARD: "Error",
    CARTE_BLANCHE_CARD: "Error",
    DISCOVER_CARD: "Error",
    INSTA_PAYMENT_CARD: "Error",
    JCB_CARD: "Error",
    KOREAN_LOCAL_CARD: "Error",
    LASER_CARD: "Error",
    MAESTRO_CARD: "Error",
    MASTER_CARD: "Error",
    SOLO_CARD: "Error",
    SWITCH_CARD: "Error",
    UNION_PAY_CARD: "Error",
    VISA_CARD: "Error",
    VISA_MASTER_CARD: "Error",
  
    //   Transit Routes codes\b
    ABA_US: "Warning",
  
    // SWIFT CODE
    SWIFT_CODE: "Warning",
  
    // IBAN Codes
    IBAN_CODE: "Warning",
  
    // Government Ids
    DNI_NUMBER: "Error",
  
    TAX_FILE_NUMBER_AU: "Error",
  
    PASSPORT_ID_CA: "Error",
  
    VAT_ID_CROATIA: "Error",
  
    VAT_ID_CZECH: "Error",
  
    PID_DENMARK: "Error",
  
    CNI_FRANCE: "Error",
  
    INSEE_SSN_FR: "Error",
  
    DRIVER_LICENSE_FR: "Error",
  
    PASSPORT_ID_FR: "Error",
  
    IDN_GERMANY: "Error",
  
    PASSPORT_ID_GR: "Error",
  
    DRIVER_GR: "Error",
  
    PPS_IR: "Error",
  
    BSN_NL: "Error",
  
    NID_POLAND: "Error",
  
    CCN_PORTUGAL: "Error",
  
    SSN_SPAIN: "Error",
  
    PASSPORT_UK: "Error",
  
    NHS_UK: "Error",
  
    SSN_US: "Error",
  });
  
  export const REGEX_ERROR_LEVELS = Object.keys(REGEX_ERROR_LEVEL_OBJECT);
  