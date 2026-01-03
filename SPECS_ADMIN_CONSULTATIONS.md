# 🎯 Mon Étoile - Spécifications Admin Consultations

## 📌 Contexte

Actuellement, les consultations arrivent dans l'interface admin, mais le workflow complet **GÉNÉRER → MODIFIER → ENVOYER** doit être implémenté pour s'assurer que chaque consultation correspond exactement à ce qui a été demandé.

---

## 🔄 Workflow Admin Requis

### Étape 1: RÉCEPTION
```
Utilisateur demande une consultation
    ↓
Système crée une consultation avec status: "PENDING"
    ↓
Admin voit la nouvelle consultation dans la liste
```

### Étape 2: GÉNÉRATION
```
Admin clique sur "GÉNÉRER"
    ↓
Status passe à "GENERATING"
    ↓
IA génère le contenu de la consultation
    ↓
Résultat stocké dans consultation.resultData
    ↓
Status passe à "GENERATED" (nouveau status)
    ↓
Admin peut visualiser le résultat
```

### Étape 3: MODIFICATION (Optionnelle)
```
Admin clique sur "MODIFIER"
    ↓
Interface d'édition s'ouvre
    ↓
Admin modifie le contenu (texte, sections, etc.)
    ↓
Admin sauvegarde les modifications
    ↓
Résultat mis à jour dans consultation.resultData
    ↓
Status reste "GENERATED"
```

### Étape 4: ENVOI
```
Admin clique sur "ENVOYER"
    ↓
Status passe à "COMPLETED"
    ↓
Notification envoyée au client
    ↓
Client peut voir sa consultation
    ↓
Consultation archivée dans l'historique
```

---

## 🎨 Interface Admin - Proposition

### Vue Liste des Consultations

```
┌────────────────────────────────────────────────────────────────────────┐
│  CONSULTATIONS                                      [+ Nouvelle]         │
├────────────────────────────────────────────────────────────────────────┤
│  Filtres:                                                               │
│  [Toutes ▼] [ASTROLOGIE ▼] [Ma Vie Personnelle ▼]  [🔍 Recherche...]  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🔵 PENDING    │ Mission de Vie                  │ Jean Dupont          │
│               │ client@email.com                │ 2 janv 2026 10:30   │
│               └─ [GÉNÉRER] ───────────────────────────────────────────│
│                                                                         │
│  🟡 GENERATING │ Compatibilité Amoureuse         │ Marie Martin        │
│               │ marie@email.com                 │ 2 janv 2026 09:15   │
│               └─ ⏳ Génération en cours...                            │
│                                                                         │
│  🟢 GENERATED  │ Thème Astral Complet            │ Paul Dubois         │
│               │ paul@email.com                  │ 1 janv 2026 18:45   │
│               └─ [VOIR] [MODIFIER] [ENVOYER] ──────────────────────── │
│                                                                         │
│  ✅ COMPLETED  │ Chemin de Vie                   │ Sophie Bernard      │
│               │ sophie@email.com                │ 1 janv 2026 14:20   │
│               └─ [VOIR CONSULTATION] ──────────────────────────────── │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Vue Détail d'une Consultation

```
┌────────────────────────────────────────────────────────────────────────┐
│  ← Retour                    CONSULTATION #12345                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📋 INFORMATIONS                                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                         │
│  Type de consultation: Mission de Vie                                  │
│  Rubrique: Astrologie → Ma Vie Personnelle                            │
│  Status: 🟢 GENERATED                                                  │
│  Date demande: 2 janvier 2026 à 10:30                                 │
│                                                                         │
│  👤 CLIENT                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                         │
│  Nom: Jean Dupont                                                      │
│  Email: jean.dupont@email.com                                          │
│  Téléphone: +225 07 12 34 56 78                                       │
│                                                                         │
│  📝 INFORMATIONS DE NAISSANCE                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                         │
│  Date: 15 mars 1990                                                    │
│  Lieu: Abidjan, Côte d'Ivoire                                         │
│  Heure: 14:30                                                          │
│                                                                         │
│  💎 OFFRANDE CHOISIE                                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                         │
│  🌿 Banane Plantain × 1 (Alternative Végétal)                         │
│  Prix: 1,500 CFA / $2.50                                              │
│  Status: ✅ Déduite du wallet                                          │
│                                                                         │
│  📄 RÉSULTAT GÉNÉRÉ                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  VOTRE MISSION DE VIE                                            │ │
│  │                                                                  │ │
│  │  [Contenu généré par l'IA affiché ici...]                       │ │
│  │                                                                  │ │
│  │  • Section 1: Introduction                                       │ │
│  │  • Section 2: Votre chemin spirituel                            │ │
│  │  • Section 3: Dons et talents                                    │ │
│  │  • Section 4: Défis à surmonter                                 │ │
│  │  • Section 5: Conseils pratiques                                │ │
│  │                                                                  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ⚙️ ACTIONS                                                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                         │
│  [📝 MODIFIER]  [📤 ENVOYER AU CLIENT]  [🗑️ SUPPRIMER]               │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Implémentation Technique

### 1. Mise à jour du Modèle de Données

#### Ajout de nouveaux status
```typescript
export type ConsultationStatus = 
  | 'PENDING'      // En attente de génération
  | 'GENERATING'   // En cours de génération
  | 'GENERATED'    // Généré, en attente d'envoi
  | 'COMPLETED'    // Envoyé au client
  | 'FAILED';      // Échec de génération
```

#### Ajout de métadonnées
```typescript
interface Consultation {
  // ... champs existants
  
  // Nouveaux champs
  consultationChoiceId: string;        // ID de la consultation choisie
  consultationTitle: string;           // Titre exact (ex: "Mission de Vie")
  rubrique: string;                    // Ex: "astrologie"
  sousRubrique: string;                // Ex: "vie-personnelle"
  
  generatedAt?: Date;                  // Date de génération
  modifiedAt?: Date;                   // Date de dernière modification
  sentAt?: Date;                       // Date d'envoi au client
  
  generationMetadata?: {
    model: string;                     // Modèle IA utilisé
    tokensUsed: number;
    processingTime: number;
    version: string;
  };
  
  modifications?: Array<{              // Historique des modifications
    timestamp: Date;
    adminId: string;
    changes: string;
  }>;
}
```

### 2. API Endpoints à créer/modifier

#### POST `/api/admin/consultations/:id/generate`
```typescript
// Génère la consultation avec l'IA
{
  consultationId: string
} 
→ 
{
  success: boolean;
  resultData: any;
  metadata: GenerationMetadata;
}
```

#### PUT `/api/admin/consultations/:id/modify`
```typescript
// Modifie le contenu généré
{
  consultationId: string;
  modifications: any;
} 
→ 
{
  success: boolean;
  updatedConsultation: Consultation;
}
```

#### POST `/api/admin/consultations/:id/send`
```typescript
// Envoie la consultation au client
{
  consultationId: string;
} 
→ 
{
  success: boolean;
  notificationSent: boolean;
}
```

### 3. Composants à créer

#### `ConsultationAdminCard.tsx`
```typescript
interface ConsultationAdminCardProps {
  consultation: Consultation;
  onGenerate: (id: string) => void;
  onModify: (id: string) => void;
  onSend: (id: string) => void;
}
```

#### `ConsultationEditor.tsx`
```typescript
interface ConsultationEditorProps {
  consultation: Consultation;
  onSave: (modifications: any) => void;
  onCancel: () => void;
}
```

#### `ConsultationViewer.tsx`
```typescript
interface ConsultationViewerProps {
  consultation: Consultation;
  readOnly?: boolean;
}
```

---

## 🎯 Validation des Consultations

### Vérifications à implémenter

#### 1. Vérifier la correspondance
```typescript
function validateConsultation(consultation: Consultation): ValidationResult {
  // Vérifier que le type demandé correspond au type reçu
  const config = getConsultationById(consultation.consultationChoiceId);
  
  if (!config) {
    return {
      valid: false,
      error: 'Configuration de consultation introuvable'
    };
  }
  
  // Vérifier que les offrandes correspondent
  if (!config.offering.alternatives.some(alt => 
    alt.offeringId === consultation.offeringsUsed[0].offeringId
  )) {
    return {
      valid: false,
      error: 'Offrande non valide pour cette consultation'
    };
  }
  
  return { valid: true };
}
```

#### 2. Vérifier les informations requises
```typescript
function validateFormData(
  consultation: Consultation, 
  config: ConsultationConfig
): ValidationResult {
  
  // Si consultation nécessite infos tierces
  if (config.typeParticipants === 'AVEC_TIERS') {
    if (!consultation.formData.tiersPerson) {
      return {
        valid: false,
        error: 'Informations de la personne tierce manquantes'
      };
    }
  }
  
  // Si consultation de groupe
  if (config.typeParticipants === 'GROUPE') {
    if (!consultation.formData.teamMembers || 
        consultation.formData.teamMembers.length < 3) {
      return {
        valid: false,
        error: 'Minimum 3 membres requis pour une consultation d\'équipe'
      };
    }
  }
  
  return { valid: true };
}
```

---

## 📊 Filtres Admin

### Filtres à implémenter

```typescript
interface ConsultationFilters {
  status?: ConsultationStatus[];
  rubrique?: string;            // 'astrologie' | 'numerologie'
  sousRubrique?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;              // Recherche par nom client ou email
  consultant?: string;          // Filtrer par admin assigné
}
```

### Interface de filtres

```
┌────────────────────────────────────────────────────────────┐
│  FILTRES                                                    │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Status:                                                    │
│  [ ] Pending  [ ] Generating  [ ] Generated  [ ] Completed │
│                                                             │
│  Rubrique:                                                  │
│  [Toutes ▼]  [Astrologie]  [Numérologie]                  │
│                                                             │
│  Sous-rubrique:                                            │
│  [Toutes ▼]  [Ma Vie Personnelle]  [Famille Couple]  ...  │
│                                                             │
│  Date:                                                      │
│  [01/01/2026] → [31/01/2026]                              │
│                                                             │
│  [Appliquer]  [Réinitialiser]                              │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 📧 Notifications

### Notifications client à envoyer

#### 1. Consultation générée
```
Sujet: Votre consultation est prête ! ✨

Bonjour {nom},

Excellente nouvelle ! Votre consultation "{titre}" a été générée 
et sera bientôt disponible.

Notre équipe vérifie actuellement le contenu pour s'assurer 
de sa qualité avant de vous l'envoyer.

À très bientôt,
L'équipe Mon Étoile
```

#### 2. Consultation envoyée
```
Sujet: 🌟 Votre consultation "{titre}" est disponible !

Bonjour {nom},

Votre consultation est maintenant disponible dans votre espace 
personnel.

[Voir ma consultation]

Que les étoiles vous guident,
L'équipe Mon Étoile
```

---

## ✅ Checklist Implémentation Admin

### Base de données
- [ ] Ajouter champs `consultationChoiceId`, `rubrique`, `sousRubrique`
- [ ] Ajouter status `GENERATING`, `GENERATED`
- [ ] Ajouter champs `generatedAt`, `modifiedAt`, `sentAt`
- [ ] Ajouter `generationMetadata` et `modifications`

### API
- [ ] Créer endpoint `/api/admin/consultations/:id/generate`
- [ ] Créer endpoint `/api/admin/consultations/:id/modify`
- [ ] Créer endpoint `/api/admin/consultations/:id/send`
- [ ] Mettre à jour `/api/admin/consultations` avec filtres

### Interface
- [ ] Créer `ConsultationAdminCard` avec boutons d'action
- [ ] Créer `ConsultationEditor` pour modifications
- [ ] Créer `ConsultationViewer` pour visualisation
- [ ] Implémenter filtres (status, rubrique, date)
- [ ] Ajouter recherche par nom/email

### Logique
- [ ] Fonction de validation des consultations
- [ ] Fonction de validation des formData
- [ ] Gestion des erreurs de génération
- [ ] Historique des modifications
- [ ] Système de notifications

### Tests
- [ ] Tester workflow complet GÉNÉRER → MODIFIER → ENVOYER
- [ ] Tester filtres
- [ ] Tester validation des données
- [ ] Tester notifications

---

## 🎬 Scénario d'utilisation complet

```
1. Client demande "Mission de Vie"
   → Consultation créée avec status PENDING
   
2. Admin ouvre la liste des consultations
   → Voit nouvelle consultation avec badge 🔵 PENDING
   
3. Admin clique sur la consultation
   → Voit tous les détails (client, infos naissance, offrande)
   
4. Admin clique sur "GÉNÉRER"
   → Status → 🟡 GENERATING
   → IA génère le contenu (30-60 secondes)
   → Status → 🟢 GENERATED
   → Admin voit le résultat généré
   
5. Admin vérifie le contenu
   → Soit satisfait → clique "ENVOYER"
   → Soit modifications nécessaires → clique "MODIFIER"
   
6. Si modifications:
   → Interface d'édition s'ouvre
   → Admin modifie le texte
   → Admin sauvegarde
   → Retour à la vue détail
   
7. Admin clique "ENVOYER"
   → Status → ✅ COMPLETED
   → Notification envoyée au client
   → Client reçoit email + notification in-app
   → Consultation disponible dans espace client
```

---

**Date:** 2 janvier 2026  
**Version:** 1.0  
**Statut:** Spécifications définies

🌟 **Mon Étoile** - Interface Admin Consultations 🌟
