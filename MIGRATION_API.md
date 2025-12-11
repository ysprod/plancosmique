# Migration localStorage vers API Backend

## ✅ Modifications effectuées

Le projet n'utilise plus `localStorage` pour les consultations astrologiques. Toutes les opérations passent maintenant par des appels API vers votre backend.

## 📡 Endpoints API requis dans votre backend

### 1. **POST /api/consultations/{id}/save-analysis**
Sauvegarde l'analyse générée en base de données.

**Request Body:**
```typescript
{
  "analyse": AnalyseAstrologique,  // Objet complet de l'analyse
  "statut": "completed" | "error"
}
```

**Response:**
```typescript
{
  "success": boolean,
  "message"?: string,
  "consultationId"?: string
}
```

**Appelé depuis:** `app/protected/vie-personnelle/slidesection/Slide4Section.tsx` (ligne ~170)

---

### 2. **GET /api/consultations**
Récupère la liste de toutes les consultations de l'utilisateur.

**Query params (optionnels):**
- `userId`: ID de l'utilisateur
- `page`: Numéro de page
- `limit`: Nombre d'éléments par page

**Response:**
```typescript
{
  "success": boolean,
  "consultations": [
    {
      "id": string,
      "consultationId": string,
      "titre": string,
      "prenoms": string,
      "nom": string,
      "dateNaissance": string,
      "dateGeneration": string,
      "statut": "pending" | "generating_chart" | "generating_analysis" | "completed" | "error"
    }
  ],
  "total"?: number
}
```

**Appelé depuis:** `app/protected/consultations/page.tsx` (ligne ~40)

---

### 3. **GET /api/consultations/{id}**
Récupère une consultation spécifique avec son analyse complète.

**Response:**
```typescript
{
  "success": boolean,
  "consultation": {
    "id": string,
    "consultationId": string,
    "titre": string,
    "prenoms": string,
    "nom": string,
    "dateNaissance": string,
    "dateGeneration": string,
    "statut": string,
    "analyse": AnalyseAstrologique  // Objet complet avec toutes les sections
  }
}
```

**Appelé depuis:** 
- `app/protected/consultations/[id]/page.tsx` (ligne ~38)
- `app/api/consultations/[id]/download-pdf/route.ts` (ligne ~23)

---

## 🗂️ Structure de l'objet AnalyseAstrologique

Voir le fichier `types/astrology.types.ts` pour la structure complète. Sections principales :
- `carteDuCiel`: Carte natale avec signes, maisons, planètes, aspects
- `missionDeVie`: Objectifs et leçons de vie
- `talentsNaturels`: Dons et capacités innées
- `relations`: Dynamiques relationnelles et affectives
- `carriereVocation`: Orientation professionnelle
- `spiritualiteCroissance`: Éveil spirituel et transformation

---

## 📝 Types TypeScript disponibles

Fichier: `types/consultation-api.types.ts`

Interfaces exportées:
- `SaveAnalysisRequest` / `SaveAnalysisResponse`
- `GetConsultationsResponse` / `ConsultationListItem`
- `GetConsultationResponse` / `ConsultationDetail`

---

## 🔧 Fichiers modifiés

1. ✅ `app/protected/vie-personnelle/slidesection/Slide4Section.tsx` - Sauvegarde via API
2. ✅ `app/protected/consultations/page.tsx` - Chargement liste via API
3. ✅ `app/protected/consultations/[id]/page.tsx` - Chargement détail via API
4. ✅ `app/api/consultations/[id]/download-pdf/route.route.ts` - Suppression storageService
6. ✅ `types/consultation-api.types.ts` - Types d'API créés

---

## ⚠️ Notes importantes

1. **Authentication**: Assurez-vous que vos endpoints API vérifient l'authentification de l'utilisateur
2. **CORS**: Configurez CORS si votre backend est sur un domaine différent
3. **Variables d'environnement**: Ajoutez `NEXT_PUBLIC_API_URL` si votre backend n'est pas sur le même domaine
4. **localStorage subsistant**: Le localStorage est encore utilisé pour:
   - Tokens d'authentification (`lib/utils/token.utils.ts`)
   - Callback de paiement MoneyFusion (`app/callback/page.tsx`)

---

## 🧪 Test de la migration

1. Lancez votre backend et vérifiez qu'il répond aux 3 endpoints
2. Testez le flow complet:
   - Créer une consultation (`/protected/vie-personnelle`)
   - Générer l'analyse (2-5 minutes)
   - Vérifier la sauvegarde (devrait appeler `POST /api/consultations/{id}/save-analysis`)
   - Voir la liste (`/protected/consultations`) 
   - Voir le détail (`/protected/consultations/{id}`)
   - Télécharger le PDF

3. Vérifiez les logs de la console navigateur pour les appels API

---

## 🚀 Prochaines étapes

Implémentez les 3 endpoints dans votre backend avec:
- Base de données (MongoDB, PostgreSQL, etc.)
- Système d'authentification
- Gestion des erreurs
- Validation des données
