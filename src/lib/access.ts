"use client";

export const accessPassword = "MICROPRO2026";
export const accessStorageKey = "micropro-colorimetria-access";

export function hasAccess() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(accessStorageKey) === "granted";
}

export function grantAccess() {
  window.localStorage.setItem(accessStorageKey, "granted");
}

export function revokeAccess() {
  window.localStorage.removeItem(accessStorageKey);
}
