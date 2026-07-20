"use client";

import { useState } from "react";

export default function SettingsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Settings saved!");
    console.log({ name, email, notifications });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Settings</h2>

      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          id="notifications"
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        Email me updates
      </div>

      <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
        Save
      </button>
    </form>
  );
}
