import rateLimit from "../config/upstash.js";

export default async function rateLimiter(request, response, next) {
    try {
        const {success} = await rateLimit.limit("my-limit-key")

        if(!success){
            return response.status(429).json({message: "Too many request at a time. Please try bit latter;"})
        }
        next()
    } catch (error) {
        console.error("Rate limit error. ", error);
        next(error)
    }
}
