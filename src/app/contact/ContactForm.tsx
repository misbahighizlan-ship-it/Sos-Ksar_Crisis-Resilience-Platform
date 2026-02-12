"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { sendContactMessageAction, ContactState } from "./actions";
import { Loader2, Send } from "lucide-react";

export const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    subject: z.string().min(1, "Le sujet est requis"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

const initialState: ContactState = {
    success: false,
    message: "",
};

export default function ContactForm() {
    const { toast } = useToast();
    const [state, formAction, isPending] = useActionState(sendContactMessageAction, initialState);

    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    useEffect(() => {
        if (state.success) {
            toast({
                title: "Message envoyé",
                description: state.message,
                className: "bg-emerald-500 text-white border-none",
            });
            form.reset();
        } else if (state.message) {
            toast({
                title: "Erreur",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast, form]);

    return (
        <Card className="w-full border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Envoyer un message</CardTitle>
                <CardDescription>
                    Remplissez le formulaire ci-dessous. Nous répondons sous 24h.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom Complet</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Votre nom" className="bg-zinc-50 dark:bg-zinc-900" {...field} />
                                        </FormControl>
                                        <FormMessage>{state.errors?.name}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="votre@email.com" className="bg-zinc-50 dark:bg-zinc-900" {...field} />
                                        </FormControl>
                                        <FormMessage>{state.errors?.email}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sujet</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Objet de votre message" className="bg-zinc-50 dark:bg-zinc-900" {...field} />
                                    </FormControl>
                                    <FormMessage>{state.errors?.subject}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Détaillez votre demande..."
                                            className="min-h-[120px] bg-zinc-50 dark:bg-zinc-900"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage>{state.errors?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending} className="w-full h-12 text-lg font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg hover:shadow-red-900/20">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Envoi en cours...
                                </>
                            ) : (
                                <>
                                    Envoyer le message
                                    <Send className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
