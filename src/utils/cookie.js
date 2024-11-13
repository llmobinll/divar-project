import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";

export const setCookie = ({ accessToken, refreshToken }) => {
  const accessDecoded = jwtDecode(accessToken);
  const accessExpireInSecond =
    accessDecoded.exp - Math.floor(Date.now() / 1000);
  const accessExpireInDay = accessExpireInSecond / (60 * 60 * 24);

  const refreshDecoded = jwtDecode(refreshToken);
  const refreshExpireInSecond =
    refreshDecoded.exp - Math.floor(Date.now() / 1000);
  const refreshExpireInDay = refreshExpireInSecond / (60 * 60 * 24);

  Cookies.set("accessToken", accessToken, {
    expires: accessExpireInDay,
    secure: true,
    sameSite: "Strict",
  });

  Cookies.set("refreshToken", refreshToken, {
    expires: refreshExpireInDay,
    secure: true,
    sameSite: "Strict",
  });
};

export const getCookie = (cookieName) => {
  const token = Cookies.get(cookieName);
  return token;
};
