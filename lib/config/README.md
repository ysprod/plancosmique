# Architecture Mon Étoile - Documentation Complète

## 📋 Vue d'ensemble

Cette documentation décrit l'architecture complète de la plateforme **Mon Étoile**, incluant toutes les rubriques, consultations et le marché des offrandes.

## 🎯 Objectifs du projet

1. **Structure claire** : Organiser toutes les rubriques avec leurs sous-rubriques et consultations
2. **Lisibilité** : Avoir une vision claire de tous les services proposés
3. **Cohérence** : S'assurer que chaque consultation correspond aux bonnes offrandes
4. **Traçabilité** : Système de gestion admin (GÉNÉRER, ENVOYER, MODIFIER)
5. **Panier utilisateur** : Gestion précise des achats et dépenses

## 📁 Structure des fichiers

```
lib/config/
├── rubriques.config.ts          # Configuration complète des rubriques et consultations
├── offrandes.config.ts          # Configuration du marché des offrandes
└── README.md                    # Ce fichier

app/admin/rubriques/
└── overview/
    └── page.tsx                 # Interface de visualisation complète
```

## 🏗️ Architecture des Rubriques

### 1. ASTROLOGIE

#### 1.1. MA VIE PERSONNELLE
**Caractéristique** : Toutes les consultations se font **une seule fois dans la vie**

Consultations disponibles :
1. **Mission de Vie** - Découvrir sa mission d'incarnation
2. **Vocation Professionnelle** - Identifier le métier idéal
3. **Talents Cachés** - Révéler ses dons uniques
4. **Blessures Karmiques** - Guérir ses blocages émotionnels
5. **Manière d'Aimer** - Comprendre ses besoins affectifs
6. **Rapport à l'Argent** - Améliorer sa relation à la prospérité
7. **Stabilité Émotionnelle** - Trouver son équilibre intérieur
8. **Grands Cycles de Vie** - Anticiper les périodes importantes
9. **Monde Invisible** - Développer sa connexion spirituelle
10. **Thème Astral Complet** - Analyse complète de personnalité

#### 1.2. FAMILLE AMITIÉ ET COUPLE
**Caractéristique** : Nécessite **infos utilisateur + infos personne tierce**

Consultations disponibles :
1. **Compatibilité Amoureuse** - Analyse de la dynamique du couple
2. **Lien Familial** - Comprendre une relation familiale
3. **Analyse d'Amitié** - Explorer la nature d'une amitié

#### 1.3. MONDE PROFESSIONNEL
**3 consultations spécialisées**

1. **LEADERSHIP**
   - Pour soi-même ou pour quelqu'un d'autre
   - Révèle le potentiel de commandement
   - Style de leadership, gestion du stress, relation au pouvoir

2. **TALENTS & POTENTIEL**
   - Pour soi-même ou pour quelqu'un d'autre
   - Dévoile forces, faiblesses et rôle idéal
   - Place la bonne personne au bon endroit

3. **SYNERGIE D'ÉQUIPE**
   - **Consultation de groupe** (minimum 3 personnes)
   - Révèle compatibilités et tensions
   - Optimise l'organisation d'équipe
   - Offrandes multipliées par le nombre de membres

---

### 2. NUMÉROLOGIE

#### 2.1. INFORMATION GÉNÉRALE
**Année Universelle** : Information partagée à l'accueil (pas une consultation)

#### 2.2. VOS NOMBRES PERSONNELS
**Caractéristique** : Consultations **une seule fois dans la vie**

Consultations disponibles :
1. **Chemin de Vie** - Mission principale et direction
2. **Nombre d'Expression** - Talents et identité sociale
3. **Nombre Intime** - Motivations profondes et aspirations
4. **Nombre de Réalisation** - Potentiel de manifestation
5. **Profil Numérologique Complet** - Analyse globale complète

#### 2.3. VOS CYCLES PERSONNELS
**Caractéristique** : Consultations **cycliques**

1. **Année Personnelle**
   - Fréquence : **Chaque année**
   - Énergie des 12 prochains mois
   - Système de limitation : 1 fois/an

2. **Mois Personnel**
   - Fréquence : **Chaque mois**
   - Énergie du mois en cours
   - Système de limitation : 1 fois/mois

3. **Jour Personnel**
   - Fréquence : **Chaque jour**
   - Influence du jour actuel
   - Système de limitation : 1 fois/jour

---

## 💰 Marché des Offrandes

### Structure des Offrandes

#### CATÉGORIE ANIMAL 🐔
| Offrande | Prix CFA | Prix USD | ID |
|----------|----------|----------|-----|
| Poule | 5,000 | $8.50 | 6945ae01b8af14d5f56cec09 |
| Coq | 7,000 | $12.00 | 6945ae01b8af14d5f56cec0a |
| Chèvre | 15,000 | $25.00 | 6945ae01b8af14d5f56cec0c |
| Mouton | 20,000 | $34.00 | 6945ae01b8af14d5f56cec0d |
| Bœuf | 150,000 | $255.00 | 6945ae01b8af14d5f56cec0e |

#### CATÉGORIE VÉGÉTAL 🌿
| Offrande | Prix CFA | Prix USD | ID |
|----------|----------|----------|-----|
| Noix de Cola | 500 | $0.85 | 6945ae01b8af14d5f56cec10 |
| Igname | 2,000 | $3.40 | 6945ae01b8af14d5f56cec12 |
| Banane Plantain | 1,500 | $2.50 | 6945ae01b8af14d5f56cec13 |
| Manioc | 1,000 | $1.70 | 6945ae01b8af14d5f56cec14 |
| Arachide | 800 | $1.35 | 6945ae01b8af14d5f56cec15 |
| Maïs | 1,200 | $2.00 | 6945ae01b8af14d5f56cec17 |

#### CATÉGORIE BOISSON 🍶
| Offrande | Prix CFA | Prix USD | ID |
|----------|----------|----------|-----|
| Vin de Palme | 1,500 | $2.50 | 6945ae01b8af14d5f56cec11 |
| Sodabi | 2,500 | $4.25 | 6945ae01b8af14d5f56cec0b |
| Eau | 300 | $0.50 | 6945ae01b8af14d5f56cec15 |
| Tchoukoutou | 1,000 | $1.70 | 6945ae01b8af14d5f56cec16 |
| Bissap | 800 | $1.35 | 6945ae01b8af14d5f56cec18 |
| Gin | 3,000 | $5.00 | 6945ae01b8af14d5f56cec19 |
| Vin Rouge | 5,000 | $8.50 | 6945ae01b8af14d5f56cec1a |

### Associations Consultation → Offrandes

Chaque consultation propose **3 alternatives** (une par catégorie) :
- 1 offrande animale
- 1 offrande végétale
- 1 offrande boisson

L'utilisateur choisit **UNE** des trois alternatives.

**Exemple** : Pour "Mission de Vie"
- Alternative 1 : Banane Plantain × 1
- Alternative 2 : Manioc × 1
- Alternative 3 : Arachide × 1

---

## 🔧 Utilisation du Code

### Importer la configuration des rubriques

```typescript
import { 
  DOMAINES, 
  getConsultationById, 
  getConsultationsBySousRubrique,
  getPlatformStats 
} from '@/lib/config/rubriques.config';

// Récupérer une consultation spécifique
const consultation = getConsultationById('mission');

// Statistiques de la plateforme
const stats = getPlatformStats();
console.log(stats);
// {
//   totalDomaines: 1,
//   totalRubriques: 2,
//   totalSousRubriques: 5,
//   totalConsultations: 24,
//   consultationsUneFoisVie: 18,
//   consultationsCycliques: 6
// }
```

### Importer la configuration des offrandes

```typescript
import { 
  OFFRANDES_CATALOGUE,
  getOfferingById,
  getOfferingsByCategory,
  calculateCartTotal,
  formatPriceCFA
} from '@/lib/config/offrandes.config';

// Récupérer une offrande
const offering = getOfferingById('6945ae01b8af14d5f56cec09');

// Calculer le total d'un panier
const cartItems = [
  { offeringId: '...', quantity: 2, name: 'Poule', price: 5000, category: 'animal', icon: '🐔' }
];
const total = calculateCartTotal(cartItems);
console.log(formatPriceCFA(total)); // "10 000 CFA"
```

### Visualiser l'architecture complète

Accédez à l'interface admin de visualisation :
```
/admin/rubriques/overview
```

Cette page affiche :
- ✅ Statistiques globales (domaines, rubriques, sous-rubriques, consultations)
- ✅ Structure hiérarchique complète (accordéon)
- ✅ Détails de chaque consultation (fréquence, participants, offrandes)
- ✅ Notes d'implémentation

---

## 🎨 Interface Admin - Gestion des Consultations

### Workflow Admin

Lorsqu'une consultation est reçue, l'administrateur dispose de 3 actions :

1. **GÉNÉRER** : Créer la consultation avec l'IA
2. **MODIFIER** : Éditer la consultation générée avant envoi
3. **ENVOYER** : Transmettre la consultation au client

### Implémentation à venir

```typescript
// Dans le composant admin
interface ConsultationAdminActions {
  onGenerate: (consultationId: string) => Promise<void>;
  onModify: (consultationId: string, newContent: any) => Promise<void>;
  onSend: (consultationId: string) => Promise<void>;
}
```

---

## 💳 Gestion du Panier Utilisateur

### Structure du Panier

```typescript
interface UserCart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  offeringId: string;
  quantity: number;
  name: string;
  price: number;
  category: OfferingCategory;
  icon: string;
}
```

### Vérifications à implémenter

1. ✅ Chaque consultation a ses offrandes spécifiques
2. ✅ Chaque utilisateur a son propre panier
3. ⚠️ Vérifier que l'utilisateur a acheté les offrandes nécessaires avant de faire une consultation
4. ⚠️ Déduire les offrandes du wallet après utilisation
5. ⚠️ Historique des transactions et dépenses

---

## 🗄️ Structure Base de Données

### Collections nécessaires

#### `rubriques`
```javascript
{
  _id: ObjectId,
  id: String,
  titre: String,
  description: String,
  categorie: String, // 'astrologie' | 'numerologie'
  consultationChoices: [{
    id: String,
    titre: String,
    description: String,
    frequence: String,
    typeParticipants: String,
    typeTechnique: String,
    offering: {
      alternatives: [{
        category: String,
        offeringId: String,
        quantity: Number
      }]
    }
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### `offerings`
```javascript
{
  _id: ObjectId,
  id: String,
  name: String,
  price: Number,
  priceUSD: Number,
  category: String, // 'animal' | 'vegetal' | 'beverage'
  icon: String,
  description: String,
  isActive: Boolean,
  stock: Number, // Optionnel
  createdAt: Date,
  updatedAt: Date
}
```

#### `user_wallets`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  offerings: [{
    offeringId: ObjectId,
    quantity: Number,
    acquiredAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### `user_carts`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    offeringId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String, // 'active' | 'completed' | 'abandoned'
  createdAt: Date,
  updatedAt: Date
}
```

#### `consultations`
```javascript
{
  _id: ObjectId,
  clientId: ObjectId,
  consultantId: ObjectId,
  type: String,
  consultationChoiceId: String,
  status: String, // 'PENDING' | 'GENERATING' | 'COMPLETED'
  formData: Object,
  result: Object,
  resultData: Object,
  offeringsUsed: [{
    offeringId: ObjectId,
    quantity: Number
  }],
  price: Number,
  isPaid: Boolean,
  createdAt: Date,
  completedDate: Date,
  updatedAt: Date
}
```

---

## 📊 Statistiques Plateforme

### Totaux actuels

- **1** Domaine (Sciences Divinatoires)
- **2** Rubriques (Astrologie, Numérologie)
- **5** Sous-rubriques
- **24** Consultations au total
  - **18** Consultations uniques (une fois dans la vie)
  - **6** Consultations cycliques (annuelle, mensuelle, quotidienne)
- **18** Offrandes disponibles
  - **5** Offrandes animales
  - **6** Offrandes végétales
  - **7** Offrandes boissons

---

## ✅ Prochaines Étapes

### Phase 1 : Configuration ✅
- [x] Créer configuration des rubriques
- [x] Créer configuration des offrandes
- [x] Créer interface de visualisation
- [x] Documenter l'architecture

### Phase 2 : Interface Admin 🔄
- [ ] Mettre à jour l'interface admin consultations
- [ ] Implémenter GÉNÉRER / MODIFIER / ENVOYER
- [ ] Créer système de validation des consultations
- [ ] Ajouter filtres par rubrique/sous-rubrique

### Phase 3 : Interface Utilisateur 🔄
- [ ] Mettre à jour les pages des rubriques
- [ ] Implémenter les formulaires avec infos tierces (Famille/Couple)
- [ ] Implémenter les formulaires de groupe (Synergie d'Équipe)
- [ ] Ajouter système de limitation des consultations cycliques
- [ ] Améliorer le marché des offrandes avec les nouvelles infos

### Phase 4 : Base de Données 📝
- [ ] Vérifier/créer les collections manquantes
- [ ] Migrer les données existantes
- [ ] Créer les indexes nécessaires
- [ ] Implémenter les contraintes de validation

### Phase 5 : Logique Métier 📝
- [ ] Vérifier offrandes disponibles avant consultation
- [ ] Déduire offrandes du wallet après usage
- [ ] Historique des transactions
- [ ] Système de notifications

---

## 🆘 Support

Pour toute question ou amélioration, contactez l'équipe de développement.

**Date de dernière mise à jour** : 2 janvier 2026

---

## 📝 Notes Importantes

1. **Fréquence des consultations** : Le système doit empêcher les utilisateurs de refaire certaines consultations (UNE_FOIS_VIE) et limiter les consultations cycliques selon leur fréquence.

2. **Offrandes et consultations** : Vérifier que l'utilisateur possède les offrandes nécessaires AVANT de lancer une consultation.

3. **Formulaires spéciaux** :
   - **Famille/Couple** : Ajouter champs pour personne tierce
   - **Synergie d'Équipe** : Permettre ajout de 3-10 membres
   - **Leadership/Talents** : Option "Pour moi" ou "Pour quelqu'un d'autre"

4. **Workflow Admin** : TOUJOURS passer par GÉNÉRER → MODIFIER (optionnel) → ENVOYER

5. **Panier et Wallet** : Deux concepts différents :
   - **Panier** : Ce que l'utilisateur veut acheter
   - **Wallet** : Ce que l'utilisateur possède déjà

---

**Fin de la documentation** 🌟
