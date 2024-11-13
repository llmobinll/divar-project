export interface CategoryResponse {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  parents: [];
  children: [];
}

export interface SendPhoneNumberRequest {
  phone: string;
}

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
  createdAt: string;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
