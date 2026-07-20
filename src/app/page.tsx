import SettingsForm from "@/components/SettingsForm";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-zinc-900">Account settings</h1>
        <p className="text-sm text-zinc-600">
          Update how your profile appears and how we contact you.
        </p>
      </header>
      <SettingsForm />
    </main>
  );
}
