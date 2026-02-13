import { UrgencyForm } from "@/components/Urgency/UrgencyForm";

export default function CreateUrgencyPage() {
    return (
        <div className="container mx-auto py-10 pt-20">
            <h1 className="text-3xl font-bold mb-6 text-center">Report an Emergency</h1>
            <UrgencyForm />
        </div>
    );
}
