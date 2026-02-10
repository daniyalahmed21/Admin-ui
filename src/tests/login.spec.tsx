import { render, screen } from "@testing-library/react";
import LoginPage from "../features/auth/pages/login-page";
import { describe, expect, it } from "vitest";

describe("Login", () => {
    it("renders the login page", () => {
        render(<LoginPage />);
        expect(screen.getByText("Sign in")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
        expect(screen.getByRole("checkbox", { name: "Remember me" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Forgot password ?" })).toBeInTheDocument();
    });
});