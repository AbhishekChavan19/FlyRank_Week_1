import { z } from "zod";

export const TIMEZONES = ["UTC", "America/New_York", "Asia/Kolkata"] as const;

export const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  emailNotifications: z.boolean(),
  timezone: z.enum(TIMEZONES, { message: "Select a timezone" }),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export const settingsDefaultValues: SettingsFormValues = {
  displayName: "",
  email: "",
  emailNotifications: true,
  timezone: "UTC",
};
