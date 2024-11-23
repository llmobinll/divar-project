import { divarApi } from "@/services/divarApi";

import {
  SendOtpRequest,
  SendOtpResponse,
  SendPhoneNumberResponse,
  UserProfile,
} from "./types";

const otpApi = divarApi.injectEndpoints({
  endpoints: (builder) => ({
    sendPhoneNumber: builder.mutation<SendPhoneNumberResponse, string>({
      query: (mobile) => ({
        url: "auth/send-otp",
        method: "POST",
        body: { mobile },
      }),
    }),
    checkOtpForLogin: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({
        url: "auth/check-otp",
        method: "POST",
        body,
      }),
    }),
    getUserProfile: builder.query<UserProfile, void>({
      query: () => "/user/whoami",
    }),
  }),
});

export const {
  useSendPhoneNumberMutation,
  useCheckOtpForLoginMutation,
  useGetUserProfileQuery,
} = otpApi;
