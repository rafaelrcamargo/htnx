import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge multiple class names into a single string.
 * @param inputs Class names to merge.
 * @returns A single string of class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
