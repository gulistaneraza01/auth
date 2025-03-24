import { baseUrl } from "./constaints";

const apiRoutes = {
  loginUrl: `${baseUrl}/auth/login`,
  signupUrl: `${baseUrl}/auth/signup`,
  logoutUrl: `${baseUrl}/auth/logout`,
  profileUrl: `${baseUrl}/auth/profile`,
  sendOtpUrl: `${baseUrl}/auth/sendotp`,
  verifyotpUrl: `${baseUrl}/auth/verifyotp`,
};

export default apiRoutes;
