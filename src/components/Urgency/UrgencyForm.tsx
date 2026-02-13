"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createUrgency } from "@/app/actions/urgency";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner"; // Import from sonner

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    severity: z.enum(["low", "medium", "high", "critical"]),
    location: z.string().min(2, { message: "Location must be at least 2 characters." }),
    image: z
        .any()
        .optional(), // Optional image file
});

export function UrgencyForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            form.setValue("image", file);
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 1
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            severity: "medium",
            location: "",
            image: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            let imageUrl = undefined;
            if (values.image instanceof File) {
                // Convert file to base64
                const reader = new FileReader();
                imageUrl = await new Promise<string>((resolve) => {
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(values.image);
                });
            }

            await createUrgency({
                ...values,
                imageUrl,
            });
            toast.success("Emergency Reported Successfully", {
                description: "Responders have been notified.",
            });
            router.push("/urgency/list");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to Report Emergency", {
                description: "Please try again later or contact support.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* LEFT SIDE — IMAGE */}
            <div className="relative hidden lg:flex w-1/2 overflow-hidden">
                <Image
                    src="/natural-disaster-volcanic-eruption.jpg"
                    alt="Emergency"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />

                <div className="relative z-10 px-12 max-w-lg flex flex-col justify-end h-full pb-16">
                    <h2 className="text-5xl font-bold text-white leading-tight mb-4">
                        Protect Your Community
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                        Quickly report emergencies and help volunteers respond faster. Every second matters.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-16 bg-gray-100">
                <div className="w-full max-w-xl relative">

                    {/* Floating form container */}
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-gray-400/30 p-12 relative z-10
                          backdrop-blur-xl hover:shadow-3xl transition-all duration-300">

                        <Button
                            variant="ghost"
                            onClick={() => router.push("/")}
                            className="mb-8 pl-0 text-gray-500 hover:text-primary"
                        >
                            &larr; Back to Home
                        </Button>

                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                Report Emergency
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Fill in the details so responders can act immediately.
                            </p>
                        </div>

                        {/* Show image preview */}
                        {preview && (
                            <div className="mb-6 w-full h-48 relative rounded-xl overflow-hidden border border-gray-200 shadow-md">
                                <Image src={preview} alt="Preview" fill className="object-cover" />
                            </div>
                        )}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">Emergency Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Flash Flood in Downtown"
                                                    {...field}
                                                    className="h-12 rounded-xl border-gray-300 focus-visible:ring-primary"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="severity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium">Severity</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 rounded-xl border-gray-300">
                                                            <SelectValue placeholder="Select severity" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="low">Low</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="high">High</SelectItem>
                                                        <SelectItem value="critical">Critical</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 font-medium">Location</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., 123 Main St"
                                                        {...field}
                                                        className="h-12 rounded-xl border-gray-300 focus-visible:ring-primary"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe the situation in detail..."
                                                    {...field}
                                                    className="min-h-[140px] rounded-xl border-gray-300 focus-visible:ring-primary"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Image Upload with Drag & Drop */}
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 font-medium">Attach Image (optional)</FormLabel>
                                            <FormControl>
                                                <div
                                                    {...getRootProps()}
                                                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive
                                                        ? "border-primary bg-primary/5"
                                                        : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <input {...getInputProps()} />
                                                    {preview ? (
                                                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                                                            <Image src={preview} alt="Preview" fill className="object-cover" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                                                <p className="text-white font-medium">Click or Drop to change</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2 py-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <p className="text-sm text-gray-500">
                                                                {isDragActive
                                                                    ? "Drop the image here..."
                                                                    : "Drag & drop an image here, or click to select"}
                                                            </p>
                                                            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-12 text-lg rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-600/90 shadow-xl shadow-primary/30 transition-all hover:scale-[1.02]"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Emergency Report"}
                                </Button>

                            </form>
                        </Form>
                    </div>

                    {/* Optional floating shadow effect behind the form */}
                    <div className="absolute top-6 left-0 w-full h-full rounded-3xl bg-gradient-to-br from-white/0 to-gray-200/10 -z-10 blur-2xl" />
                </div>
            </div>
        </div>
    );
}
