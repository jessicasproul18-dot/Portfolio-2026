"use client";

import { useEffect } from "react";

/** Clears any previously installed service workers (no registration). */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(registrations.map((registration) => registration.unregister())),
      )
      .catch((err) =>
        console.error("Failed to unregister service workers:", err),
      );
  }, []);

  return null;
}
