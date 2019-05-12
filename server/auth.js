import jwt from "jsonwebtoken";

export const createTokens = user => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_JWT, {
    expiresIn: "15min"
  });

  const refreshToken = jwt.sign(
    { userId: user._id, count: user.count },
    process.env.REFRESH_JWT,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
