export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpHTML = (otp) => `
    <h2>Your Verification Code<h2>
    <p>Your OTP is <strong>${otp}</strong></p>
    <p>This code expires in 10 minutes.</p>
`;
