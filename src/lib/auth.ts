import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "default_super_secret_for_dev";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function signAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(encodedKey);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return payload.role === "admin";
  } catch (error) {
    return false;
  }
}
