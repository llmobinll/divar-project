export interface SendPhoneNumberRequest {
  phone: string;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}
