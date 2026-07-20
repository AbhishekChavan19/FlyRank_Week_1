import SettingsForm from "@/components/SettingsForm";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col gap-4 px-6 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900">Account settings</h1>
      <SettingsForm />
    </main>
  );
}
