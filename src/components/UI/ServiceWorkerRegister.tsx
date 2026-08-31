"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) =>
          Promise.all(registrations.map((registration) => registration.unregister()))
        )
        .catch((err) => console.error("Failed to unregister service workers in development:", err));
      return;
    }

    navigator.serviceWorker.register("/sw.js")
      .then((reg) => console.log("Service Worker registered", reg))
      .catch((err) => console.error("SW registration failed:", err));
  }, []);

  return null;
}
