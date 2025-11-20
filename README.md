# 🌌 Mon Etoile - Application de Voyance et Prédictions

Application Next.js mystique pour les prédictions cosmiques, voyance, tarot et astrologie.

## ✨ Fonctionnalités

- 🔮 **Voyance Personnelle** - Prédictions personnalisées par domaine (Amour, Carrière, Finances, Famille)
- 🌟 **Tarot Cosmique** - Tirage des cartes guidé par l'univers
- 🌙 **Astrologie** - Analyse de thème astral complet
- 🔢 **Numérologie** - Secrets cachés dans les nombres
- 🧭 **Guidance Spirituelle** - Orientation cosmique
- 📅 **Prédictions 2024** - Ce que les astres réservent

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Créer le projet**
```bash
cd plan-cosmique
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

3. **Ouvrir le navigateur**
```
http://localhost:3000
```

## 📁 Structure du Projet

```
plan-cosmique/
├── app/
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   ├── globals.css          # Styles globaux
│   └── voyance/
│       └── page.tsx         # Page de voyance
├── public/
│   └── logo.png             # Logo Mon Etoile
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Technologies Utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utility-first
- **Framer Motion** - Animations fluides
- **Lucide React** - Icons modernes

## 🌟 Pages Principales

### Page d'Accueil (`/`)
- Hero section avec logo animé
- 6 services de voyance
- Design cosmique avec étoiles animées
- Navigation vers les différentes sections

### Voyance Personnelle (`/voyance`)
- Sélection de catégorie (Amour, Carrière, Finances, Famille)
- Formulaire de consultation
- Génération de prédictions personnalisées
- Animations cosmiques

## 🎯 Pages à Développer

Les pages suivantes peuvent être créées sur le même modèle :

1. `/tarot` - Tirage de tarot cosmique
2. `/astrologie` - Thème astral
3. `/numerologie` - Calculs numérologiques
4. `/guidance` - Guidance spirituelle
5. `/predictions` - Prédictions annuelles

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `tailwind.config.ts` :
- Purple: #9333EA
- Indigo: #4F46E5
- Pink: #EC4899

### Prédictions
Les prédictions sont stockées dans `/app/voyance/page.tsx` dans l'objet `predictions`. 
Vous pouvez les personnaliser ou les connecter à une base de données.

### Logo
Remplacez l'URL du logo dans `/app/page.tsx` :
```typescript
src="https://www.genspark.ai/api/files/s/uhLAQBUN"
```

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel deploy
```

### Build Production
```bash
npm run build
npm start
```

## 🔮 Fonctionnalités Futures

- [ ] Authentification utilisateur
- [ ] Historique des prédictions
- [ ] Paiement pour consultations premium
- [ ] Chat en direct avec voyant
- [ ] Notifications push pour prédictions quotidiennes
- [ ] Intégration API d'astrologie
- [ ] Calendrier lunaire interactif
- [ ] Journal cosmique personnel

## 📝 Scripts Disponibles

```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Vérification du code
```

## 🌌 Design System

### Animations
- **Float** : Mouvement vertical doux
- **Glow** : Pulsation lumineuse
- **Sparkle** : Étoiles scintillantes
- **Shine** : Effet de brillance traversant

### Composants Réutilisables
- Cards de service avec hover effects
- Boutons avec gradients animés
- Background cosmique avec étoiles
- Formulaires mystiques

## 🎭 Expérience Utilisateur

L'application offre une expérience immersive avec :
- Animations fluides Framer Motion
- Effets de parallaxe
- Transitions douces entre pages
- Feedback visuel instantané
- Design responsive mobile-first

## 📞 Support

Pour toute question ou suggestion, créez une issue sur le repository.

## 📄 Licence

MIT License - Libre d'utilisation et de modification

---

**Créé avec 🌟 par l'équipe Mon Etoile**

*"L'univers vous guide vers votre destinée"*
