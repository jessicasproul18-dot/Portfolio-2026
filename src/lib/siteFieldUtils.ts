/** True when a config string should be shown in the UI (non-empty after trim). */
export const isFilledSiteField = (value: string | undefined | null): boolean =>
  typeof value === "string" && value.trim() !== "";
