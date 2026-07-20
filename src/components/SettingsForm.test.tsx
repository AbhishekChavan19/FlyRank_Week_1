import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import SettingsForm from "./SettingsForm";

afterEach(() => {
  cleanup();
});

describe("SettingsForm", () => {
  it("rejects an empty display name", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(
      await screen.findByText(/display name must be at least 2 characters/i),
    ).toBeInTheDocument();
  });

  it("rejects an invalid email", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/display name/i), "Abhishek");
    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(
      await screen.findByText(/enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it("accepts valid input and shows a success message", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/display name/i), "Abhishek");
    await user.type(screen.getByLabelText(/^email$/i), "abhi@example.com");
    await user.selectOptions(screen.getByLabelText(/timezone/i), "Asia/Kolkata");
    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(
      await screen.findByText(/settings saved successfully/i),
    ).toBeInTheDocument();
  });
});
