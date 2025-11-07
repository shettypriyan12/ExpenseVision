export function localTime(utcDate, options = {}) {
    if (!utcDate) return "";

    const date = new Date(utcDate);

    return date.toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        ...options,
    });
}
