import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();
const isTestRateLimit = process.env.testRateLimit === "true";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: isTestRateLimit
    ? Ratelimit.slidingWindow(2, "10 s")
    : Ratelimit.slidingWindow(10, "60 s"),
});

export default rateLimit;
