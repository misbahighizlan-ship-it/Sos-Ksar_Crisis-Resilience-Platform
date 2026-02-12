"use server";

import { db } from "@/db";
import { urgency } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function createUrgency(data: {
    title: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    location: string;
    imageUrl?: string;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const newUrgency = await db
        .insert(urgency)
        .values({
            id: nanoid(),
            ...data,
            userId: session.user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning();

    return newUrgency[0];
}

export async function getUrgencies(userId?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const userRole = session.user.role;

    // If citizen, return only their urgencies
    if (userRole === "citizen") {
        return await db
            .select()
            .from(urgency)
            .where(eq(urgency.userId, session.user.id))
            .orderBy(desc(urgency.createdAt));
    }

    // If volunteer or admin, return all urgencies, or filter by userId if provided
    if (userId) {
        return await db
            .select()
            .from(urgency)
            .where(eq(urgency.userId, userId))
            .orderBy(desc(urgency.createdAt));
    }

    return await db.select().from(urgency).orderBy(desc(urgency.createdAt));
}
