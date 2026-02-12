"use server";

import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    subject: z.string().min(1, "Le sujet est requis"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactState = {
    success: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        subject?: string[];
        message?: string[];
    };
    message?: string;
};

export async function sendContactMessageAction(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
    };

    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Veuillez corriger les erreurs dans le formulaire.",
        };
    }

    // Simulate invalid server delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Save to database or send email
    console.log("Contact Message Received:", validatedFields.data);

    return {
        success: true,
        message: "Votre message a été envoyé avec succès.",
    };
}
