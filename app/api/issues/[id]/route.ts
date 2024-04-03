import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(
	req: NextRequest,
	{
		params,
	}: {
		params: {
			id: string;
		};
	}
) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}
	const body = await req.json();
	if (body.title == "" || body.description === "") {
		return NextResponse.json("Please provide title or description", {
			status: 400,
		});
	}
	const issue = await prisma.issue.findUnique({
		where: {
			id: params.id,
		},
	});
	if (!issue) {
		return NextResponse.json("Issue not found", {
			status: 404,
		});
	}
	const updatedIssue = await prisma.issue.update({
		where: {
			id: issue.id,
		},
		data: {
			title: body.title,
			description: body.description,
		},
	});
	return NextResponse.json(updatedIssue, {
		status: 200,
	});
}
export const DELETE = async (
	req: NextRequest,
	{
		params,
	}: {
		params: {
			id: string;
		};
	}
) => {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}
	const issue = await prisma.issue.findUnique({
		where: {
			id: params.id,
		},
	});
	if (!issue) {
		return NextResponse.json("Issue not found", {
			status: 404,
		});
	}
	await prisma.issue.delete({
		where: {
			id: issue.id,
		},
	});
	return NextResponse.json("Issue deleted", {
		status: 201,
	});
};
