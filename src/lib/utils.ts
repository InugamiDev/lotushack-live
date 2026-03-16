import clsx from "clsx";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
