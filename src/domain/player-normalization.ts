export function normalizePlayerName(name: string): string {
    const trimmed = name.trim();

    if (trimmed.length === 0) {
        return "";
    }

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}