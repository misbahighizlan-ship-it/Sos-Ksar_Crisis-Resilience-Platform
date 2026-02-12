import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AboutPage, { metadata } from "./page";

// Mock Child Components to strictly test AboutPage structure
vi.mock("@/components/Navbars/Navbar", () => ({
    default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/Footer/Footer", () => ({
    default: () => <div data-testid="footer">Footer</div>,
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
    default: (props: any) => <img {...props} />,
}));

describe("AboutPage", () => {
    it("exports correct metadata", () => {
        expect(metadata).toEqual({
            title: "À propos | SOS KSAR",
            description: "Plateforme critique de gestion des secours à Ksar El Kebir",
        });
    });

    it("renders the main hero title", () => {
        render(<AboutPage />);
        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toHaveTextContent(/Mission/i);
        expect(heading).toHaveTextContent(/SOS KSAR/i);
    });

    it("renders the urgency badge", () => {
        render(<AboutPage />);
        expect(screen.getByText(/Urgency Response/i)).toBeInTheDocument();
    });

    it("renders the mission section", () => {
        render(<AboutPage />);
        const missionHeading = screen.getByRole("heading", { name: /Resilience & Unity/i });
        expect(missionHeading).toBeInTheDocument();
        expect(screen.getByText(/Coordination en temps réel/i)).toBeInTheDocument();
    });

    it("renders the workflow steps", () => {
        render(<AboutPage />);
        expect(screen.getByText("Alerte")).toBeInTheDocument();
        expect(screen.getByText("Dispatch")).toBeInTheDocument();
        expect(screen.getByText("Secours")).toBeInTheDocument();
    });

    it("renders the CTA button with correct link", () => {
        render(<AboutPage />);
        const ctaButton = screen.getByRole("link", { name: /S'INSCRIRE - C'EST URGENT/i });
        expect(ctaButton).toBeInTheDocument();
        expect(ctaButton).toHaveAttribute("href", "/login");
    });

    it("renders Navbar and Footer", () => {
        render(<AboutPage />);
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
