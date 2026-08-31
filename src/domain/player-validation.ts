export type ValidationResult =
    | { isValid: true }
    | { isValid: false; message: string };

export function validatePlayerName(name: string): ValidationResult {
    if (name.trim().length === 0) {
        return {
            isValid: false,
            message: "Player name is required.",
        };
    }

    return { isValid: true };
}