export function normalizePlayerName(name: string): string {
    const trimmed = name.trim();

    if (trimmed.length === 0) {
        return "";
    }

    return trimmed
        .split(/\s+/)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase(),
        )
        .join(" ");
}

export function normalizePlayerPhone(phone: string): string {
    return phone.trim().replace(/[\s()-]/g, "");
}