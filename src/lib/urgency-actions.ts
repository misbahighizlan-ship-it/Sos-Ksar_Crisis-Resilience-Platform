"use server";

import { db } from "@/db";
import { urgency } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteUrgencyAction(urgencyId: string) {
    if (!urgencyId) return;
    await db.delete(urgency).where(eq(urgency.id, urgencyId));
    revalidatePath("/admin/urgencies");
    revalidatePath("/admin/profile");
}

export async function updateUrgencyAction(urgencyId: string, data: any) {
    if (!urgencyId || !data) return;
    await db.update(urgency).set({
        title: data.title,
        description: data.description,
        severity: data.severity as any,
        location: data.location,
        status: data.status as any,
        updatedAt: new Date(),
    }).where(eq(urgency.id, urgencyId));
    revalidatePath("/admin/urgencies");
    revalidatePath("/admin/profile");
}
