"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  settingsDefaultValues,
  settingsSchema,
  TIMEZONES,
  type SettingsFormValues,
} from "@/lib/settings-schema";

export default function SettingsForm() {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settingsDefaultValues,
  });

  async function onSubmit(values: SettingsFormValues) {
    setSubmitMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (process.env.NODE_ENV === "development") {
      console.log("Settings saved:", values);
    }

    setSubmitMessage("Settings saved successfully.");
    reset(values);
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-md flex-col gap-5 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      aria-label="Account settings"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="displayName" className="text-sm font-medium text-zinc-800">
          Display name
        </label>
        <input
          id="displayName"
          type="text"
          autoComplete="name"
          aria-invalid={errors.displayName ? "true" : "false"}
          aria-describedby={
            errors.displayName ? "displayName-error" : undefined
          }
          className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          {...register("displayName")}
        />
        {errors.displayName ? (
          <p id="displayName-error" role="alert" className="text-sm text-red-600">
            {errors.displayName.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-zinc-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="text-sm text-red-600">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="timezone" className="text-sm font-medium text-zinc-800">
          Timezone
        </label>
        <select
          id="timezone"
          aria-invalid={errors.timezone ? "true" : "false"}
          aria-describedby={errors.timezone ? "timezone-error" : undefined}
          className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          {...register("timezone")}
        >
          {TIMEZONES.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
        {errors.timezone ? (
          <p id="timezone-error" role="alert" className="text-sm text-red-600">
            {errors.timezone.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="emailNotifications"
          type="checkbox"
          className="h-4 w-4 rounded border-zinc-300"
          {...register("emailNotifications")}
        />
        <label htmlFor="emailNotifications" className="text-sm text-zinc-800">
          Email me product updates
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : "Save settings"}
      </button>

      {submitMessage ? (
        <p role="status" className="text-sm font-medium text-emerald-700">
          {submitMessage}
        </p>
      ) : null}
    </form>
  );
}
