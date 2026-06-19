export type SignupProfileInput = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  dateOfBirth: string;
  sourcePlatform?: string;
};

type SignupPayload = {
  user_info: Record<string, unknown>;
  private_info: Record<string, unknown>;
  skills: Array<Record<string, string>>;
};

const AGREEMENTS_VERSION = "v2,v1";

const toIsoDateString = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Please enter a valid date of birth.");
  }

  return parsed.toISOString();
};

const buildSignupPayload = (input: SignupProfileInput): SignupPayload => {
  const normalizedCountryCode = input.countryCode.toUpperCase();
  const verifyDate = new Date().toISOString();

  return {
    user_info: {
      agreements: AGREEMENTS_VERSION,
      currentActive: "poster",
      firstName: input.firstName,
      lastName: input.lastName,
      userId: input.uid,
      hasHero: true,
      hasCitizen: true,
      sourcePlatform: input.sourcePlatform ?? "",
      questTypePreference: "personal",
      location: "",
      location_metadata: {
        address: "",
        lat: 0,
        lng: 0,
      },
      sgid: "",
      image: "",
      email: input.email,
      verified: true,
      lat: 0,
      lng: 0,
      status: "active",
      heroAbout: "",
      minEarningThreshold: 0,
      verifyDate,
      dateOfBirth: toIsoDateString(input.dateOfBirth),
      countryCode: normalizedCountryCode,
    },
    private_info: {
      accID: "",
      accounts: [""],
      customerID: "",
      mobileNumber: "",
      token: null,
      userID: input.uid,
      countryCode: normalizedCountryCode,
    },
    skills: [],
  };
};

export async function signupUserViaApi(input: SignupProfileInput): Promise<void> {
  const payload = buildSignupPayload(input);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Unable to complete signup profile right now.");
  }
}
