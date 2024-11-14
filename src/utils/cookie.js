import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";

export const setCookie = ({ accessToken, refreshToken }) => {
  const accessDecoded = jwtDecode(accessToken);
  const accessExpire =
    (accessDecoded.exp * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 24);

  const refreshDecoded = jwtDecode(refreshToken);
  const refreshExpire =
    (refreshDecoded.exp * 1000 - new Date().getTime()) / (1000 * 60 * 60 * 24);

  Cookies.set("accessToken", accessToken, {
    expires: accessExpire,
    secure: true,
    sameSite: "Strict",
  });

  Cookies.set("refreshToken", refreshToken, {
    expires: refreshExpire,
    secure: true,
    sameSite: "Strict",
  });
};

export const getCookie = (cookieName) => {
  const token = Cookies.get(cookieName);
  return token;
};
