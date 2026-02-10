import { render, screen } from "@testing-library/react";
import LoginPage from "./login";
import { describe, expect, it } from "vitest";

describe("Login", () => {
    it("renders the login page", () => {
        render(<LoginPage />);
        expect(screen.getByText("login"))
    });
});