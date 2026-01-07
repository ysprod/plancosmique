export function getRubriqueId(r: any): string {
    return String(r?._id ?? r?.id ?? "");
}

export function clampText(s: string, max = 120) {
    const x = String(s ?? "").replace(/\s+/g, " ").trim();
    return x.length > max ? x.slice(0, max - 1) + "…" : x;
}

export function setRubriqueInUrl(rubriqueId: string | null) {
    try {
        const url = new URL(window.location.href);
        if (rubriqueId) url.searchParams.set("rubrique", rubriqueId);
        else url.searchParams.delete("rubrique");
        window.history.pushState({}, "", url.toString());
    } catch {
        // noop
    }
}

export function getRubriqueFromUrl(): string | null {
    try {
        const url = new URL(window.location.href);
        return url.searchParams.get("rubrique");
    } catch {
        return null;
    }
}