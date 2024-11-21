export interface SendPhoneNumberResponse {
  message: string;
}

export interface SendOtpRequest {
  code: string;
  mobile: string;
}

export interface SendOtpResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserProfile {
  _id: string;
  mobile: string;
  role: string;
  createdAt?: string;
}
