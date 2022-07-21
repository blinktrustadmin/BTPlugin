export const REGEX_REASON: any = Object.seal({
  email: "Email address not allowed",
  ssn: "Social security number not allowed",
  ipAddress: "IP address not allowed",
  macAddress: "MAC address not allowed",
});

export const REGEX_REASON_KEYS = Object.keys(REGEX_REASON);
