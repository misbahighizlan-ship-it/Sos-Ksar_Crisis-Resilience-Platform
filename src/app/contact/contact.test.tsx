import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ContactPage from "./page";

// Mock dependencies
vi.mock("@/components/Navbars/Navbar", () => ({
    default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/Footer/Footer", () => ({
    default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("lucide-react", () => ({
    Loader2: () => <div data-testid="loader">Loader</div>,
    Send: () => <div data-testid="send">Send</div>,
    Phone: () => <div data-testid="phone">Phone</div>,
    Mail: () => <div data-testid="mail">Mail</div>,
    MapPin: () => <div data-testid="map-pin">MapPin</div>,
}));

vi.mock("@/components/ui/button", () => ({
    Button: (props: any) => <button {...props} />,
}));

vi.mock("@/components/ui/input", () => ({
    Input: (props: any) => <input {...props} />,
}));

vi.mock("@/components/ui/textarea", () => ({
    Textarea: (props: any) => <textarea {...props} />,
}));

vi.mock("@/components/ui/card", () => ({
    Card: ({ children }: any) => <div>{children}</div>,
    CardHeader: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <h1>{children}</h1>,
    CardDescription: ({ children }: any) => <p>{children}</p>,
    CardContent: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/form", () => ({
    Form: ({ children }: any) => <form>{children}</form>,
    FormControl: ({ children }: any) => <div>{children}</div>,
    FormField: ({ render }: any) => render({ field: {} }), // Simplified mock
    FormItem: ({ children }: any) => <div>{children}</div>,
    FormLabel: ({ children }: any) => <label>{children}</label>,
    FormMessage: () => <div></div>,
}));

// Mock useToast
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

// Mock server action
vi.mock("./actions", () => ({
    sendContactMessageAction: vi.fn(),
    contactSchema: {},
}));

// Mock useActionState/useFormStatus if necessary, but testing library usually handles client component renders fine.
// Since `useActionState` is React 19 / Canary, ensure test environment supports it or mock it.
// Next.js 15 uses React 19.

describe("ContactPage", () => {
    it("renders the contact form", () => {
        // Testing the page which contains the form
        render(<ContactPage />);

        expect(screen.getByRole("heading", { name: /Restons Connectés/i })).toBeInTheDocument();
        // Check if ContactForm is rendered (implied by fields)
        expect(screen.getByPlaceholderText(/Votre nom/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/votre@email.com/i)).toBeInTheDocument();
    });

    it("renders contact information", () => {
        render(<ContactPage />);
        expect(screen.getByText("05 39 00 00 00")).toBeInTheDocument();
        expect(screen.getByText("contact@sosksar.ma")).toBeInTheDocument();
    });

    // Note: Full integration test of Server Actions in Vitest + JSDOM is complex because `useActionState` relies on React internals handling promises. 
    // We verified structure and standard elements.
});
