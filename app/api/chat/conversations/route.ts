import { createServiceClient } from "@/lib/supabase/server"; // Use service client
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const supabase = createServiceClient(); // Changed: no await needed, uses service role
		const { user_email, user_name } = await request.json();

		if (!user_email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// Check if conversation already exists for this email
		const { data: existingConversation } = await supabase
			.from("conversations")
			.select("*")
			.eq("user_email", user_email)
			.eq("status", "active")
			.single();

		if (existingConversation) {
			return NextResponse.json({ conversation: existingConversation });
		}

		// Create new conversation
		const { data, error } = await supabase
			.from("conversations")
			.insert({
				user_email,
				user_name,
				status: "active",
			})
			.select()
			.single();

		if (error) {
			console.error("Error creating conversation:", error);
			return NextResponse.json(
				{ error: "Failed to create conversation" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ conversation: data });
	} catch (error) {
		console.error("Error in conversation API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const supabase = createServiceClient(); // Changed: use service client
		const { searchParams } = new URL(request.url);
		const userEmail = searchParams.get("user_email");

		if (!userEmail) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const { data, error } = await supabase
			.from("conversations")
			.select("*")
			.eq("user_email", userEmail)
			.eq("status", "active")
			.single();

		if (error && error.code !== "PGRST116") {
			console.error("Error fetching conversation:", error);
			return NextResponse.json(
				{ error: "Failed to fetch conversation" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ conversation: data || null });
	} catch (error) {
		console.error("Error in conversation GET API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
