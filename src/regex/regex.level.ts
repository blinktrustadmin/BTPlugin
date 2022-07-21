export const REGEX_LEVEL: any = Object.seal({
    email: "Warning",
    ssn: "Error",
    ipAddress: "Warning",
    macAddress: "Error",
  });
  
  export const REGEX_LEVEL_KEYS = Object.keys(REGEX_LEVEL);