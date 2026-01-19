// JWT verification logic adapted from:
// https://dev.to/leapcell/implementing-jwt-middleware-in-nextjs-a-complete-guide-to-auth-1b2d
// Modifications were made to fit the project’s API structure

var jwt = require("jsonwebtoken");

export type JwtPayload = {
  uuid: string;
  username: string;
  iat?: number;
  exp?: number;
};

export function verifyJwt(token: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
}
