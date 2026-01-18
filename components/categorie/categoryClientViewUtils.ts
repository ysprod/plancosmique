export function setRubriqueInUrl(rubriqueId: string | null) {
    try {
        const url = new URL(window.location.href);
        if (rubriqueId) url.searchParams.set("rubrique", rubriqueId);
        else url.searchParams.delete("rubrique");
        window.history.pushState({}, "", url.toString());
    } catch {
       
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