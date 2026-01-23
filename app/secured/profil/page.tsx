import ProfilPageClient from "@/components/secured/profil/ProfilPageClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // Récupération dynamique de l'utilisateur connecté
  // (nécessite que l'API /users/me fonctionne côté SSR, sinon fallback générique)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/users/me`,
      {
        headers: {
          // Si besoin, ajouter l'auth ici (cookie, etc.)
        },
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("User not found");
    const user = await res.json();
    const title = `${user.prenoms || ""} ${user.nom || ""} | Mon Profil | Mon Étoile`;
    const description = `Profil initiatique de ${user.prenoms || ""} ${user.nom || ""} : grade, parcours, informations personnelles et progression spirituelle.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.monetoile.org"}/secured/profil`,
        type: "profile",
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Mon Profil | Mon Étoile",
      description:
        "Accédez à votre profil initiatique, vos grades, vos informations personnelles et votre parcours spirituel sur Mon Étoile.",
      openGraph: {
        title: "Mon Profil | Mon Étoile",
        description:
          "Accédez à votre profil initiatique, vos grades, vos informations personnelles et votre parcours spirituel sur Mon Étoile.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.monetoile.org"}/secured/profil`,
        type: "profile",
      },
      twitter: {
        card: "summary",
        title: "Mon Profil | Mon Étoile",
        description:
          "Accédez à votre profil initiatique, vos grades, vos informations personnelles et votre parcours spirituel sur Mon Étoile.",
      },
    };
  }
}

export default function ProfilPage() {
  return <ProfilPageClient />;
}