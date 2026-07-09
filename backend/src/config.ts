import "dotenv/config";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const config = {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 4444,
};

export default config;