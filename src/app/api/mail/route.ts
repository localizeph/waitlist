import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import WelcomeTemplate from "~/emails";
import { logger, getErrorMessage } from "~/lib/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
	redis,
	//  2 requests per minute from the same IP address in the a sliding window of  1 minute duration which
	// means that the window slides forward every second and the rate limit is reset every minute for each IP address
	limiter: Ratelimit.slidingWindow(2, "1 m"),
});

export async function POST(request: NextRequest) {
	const requestId = crypto.randomUUID();
	
	try {
		let ip: string;
		const xForwardedForHeader = request.headers.get("x-forwarded-for");

		if (xForwardedForHeader) {
			ip = xForwardedForHeader.split(",")[0].trim();
		} else {
			ip = request.headers.get("x-real-ip")?.trim() ?? "127.0.0.1";
		}

		logger.debug("mail-api", "Processing email request", { requestId, ip });

		const result = await ratelimit.limit(ip);

		if (!result.success) {
			logger.warn("mail-api", "Rate limit exceeded", { requestId, ip, limit: result.limit, remaining: result.remaining });
			return NextResponse.json({ error: "Too many requests!" }, { status: 429 });
		}

		const { email, name } = await request.json();

		if (!email) {
			logger.warn("mail-api", "Missing email in request", { requestId });
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		logger.debug("mail-api", "Sending email via Resend", { requestId, email, name });

		const { data, error } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL || "",
			to: [email],
			subject: "Welcome to Next.js + Notion CMS Waitlist",
			react: WelcomeTemplate({ userFirstname: name }),
		});

		if (error) {
			logger.error("mail-api", "Resend API error", new Error(error.message), { requestId, email, errorCode: error.name });
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		if (!data) {
			logger.error("mail-api", "Resend returned no data", undefined, { requestId, email });
			return NextResponse.json(
				{ error: "Failed to send email" },
				{ status: 500 },
			);
		}

		logger.info("mail-api", "Email sent successfully", { requestId, email, messageId: data.id });

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 },
		);
	} catch (error: unknown) {
		const errorMessage = getErrorMessage(error);
		logger.error("mail-api", "Unexpected error in mail API", error instanceof Error ? error : new Error(errorMessage), { requestId });
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
