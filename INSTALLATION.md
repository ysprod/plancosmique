# 🚀 Guide d'Installation - Plan Cosmique

## 📋 Prérequis

Assurez-vous d'avoir installé :
- **Node.js** version 18.17 ou supérieure
- **npm** (inclus avec Node.js) ou **yarn**
- Un éditeur de code (VS Code recommandé)

## 🛠️ Installation Étape par Étape

### 1. Télécharger les Fichiers

Tous les fichiers du projet sont dans le dossier `/home/user/plan-cosmique/`.

Vous pouvez les télécharger ou les copier dans votre machine locale.

### 2. Ouvrir un Terminal

Ouvrez un terminal dans le dossier du projet :

```bash
cd plan-cosmique
```

### 3. Installer les Dépendances

Exécutez la commande suivante pour installer tous les packages nécessaires :

```bash
npm install
```

Cela va installer :
- Next.js 14
- React 18
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styles)
- TypeScript

⏱️ **Durée** : 2-5 minutes selon votre connexion internet

### 4. Lancer le Serveur de Développement

Une fois l'installation terminée, lancez :

```bash
npm run dev
```

Vous devriez voir un message comme :
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

### 5. Ouvrir dans le Navigateur

Ouvrez votre navigateur et allez à :

```
http://localhost:3000
```

🎉 **Félicitations !** L'application est maintenant en cours d'exécution !

## 🎨 Ce que Vous Allez Voir

### Page d'Accueil (`/`)
- Logo Plan Cosmique animé
- 6 services de voyance avec des cartes interactives
- Animations cosmiques (étoiles, orbes)
- Background gradient purple-indigo

### Page de Voyance (`/voyance`)
- Formulaire de consultation
- Sélection de catégorie (4 domaines)
- Génération de prédictions personnalisées
- Animations de révélation

## 🔧 Commandes Disponibles

```bash
# Développement (avec hot reload)
npm run dev

# Build pour production
npm run build

# Lancer en mode production
npm start

# Vérifier le code
npm run lint
```

## 📁 Structure des Fichiers

```
plan-cosmique/
│
├── app/                      # Pages et composants Next.js
│   ├── layout.tsx           # Layout principal de l'app
│   ├── page.tsx             # Page d'accueil
│   ├── globals.css          # Styles globaux
│   └── voyance/
│       └── page.tsx         # Page de voyance
│
├── public/                   # Fichiers statiques
│   └── (ajoutez vos images ici)
│
├── package.json             # Dépendances du projet
├── tsconfig.json            # Configuration TypeScript
├── tailwind.config.ts       # Configuration Tailwind CSS
├── next.config.js           # Configuration Next.js
├── postcss.config.js        # Configuration PostCSS
│
└── README.md                # Documentation
```

## 🎯 Prochaines Étapes

### 1. Personnaliser les Prédictions

Éditez le fichier `app/voyance/page.tsx` et modifiez l'objet `predictions` :

```typescript
const predictions: Record<string, string[]> = {
  amour: [
    "Votre première prédiction d'amour...",
    "Votre deuxième prédiction d'amour...",
    // Ajoutez autant que vous voulez
  ],
  carriere: [
    "Vos prédictions de carrière...",
  ],
  // etc...
};
```

### 2. Ajouter Plus de Pages

Créez de nouvelles pages dans le dossier `app/` :

```bash
app/
├── tarot/
│   └── page.tsx
├── astrologie/
│   └── page.tsx
└── numerologie/
    └── page.tsx
```

### 3. Personnaliser les Couleurs

Dans `tailwind.config.ts`, modifiez :

```typescript
colors: {
  cosmic: {
    purple: '#9333EA',  // Votre couleur purple
    indigo: '#4F46E5',  // Votre couleur indigo
    pink: '#EC4899',    // Votre couleur pink
  }
}
```

### 4. Changer le Logo

Remplacez l'URL dans `app/page.tsx` ligne ~85 :

```typescript
<Image
  src="/votre-logo.png"  // Mettez votre logo dans /public/
  alt="Plan Cosmique Logo"
  width={200}
  height={200}
/>
```

## 🐛 Résolution des Problèmes

### Erreur: "Cannot find module"
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Le port 3000 est déjà utilisé
```bash
# Utilisez un autre port
npm run dev -- -p 3001
```

### Problème de cache
```bash
rm -rf .next
npm run dev
```

### TypeScript errors
```bash
npm install --save-dev @types/node @types/react @types/react-dom
```

## 🌐 Déploiement

### Option 1: Vercel (Recommandé)

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez Vercel CLI :
```bash
npm install -g vercel
```
3. Déployez :
```bash
vercel
```

### Option 2: Build Local

```bash
npm run build
npm start
```

L'app sera disponible sur `http://localhost:3000`

## 📱 Responsive Design

L'application est optimisée pour :
- 📱 Mobile (320px+)
- 📱 Tablette (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1920px+)

## ⚡ Performances

- ✅ Optimisation images avec Next.js Image
- ✅ Code splitting automatique
- ✅ Server-side rendering (SSR)
- ✅ Animations GPU-accelerated
- ✅ Lazy loading des composants

## 🔐 Sécurité

Pour la production, ajoutez :
- Variables d'environnement dans `.env.local`
- HTTPS
- Rate limiting pour les API
- Validation des inputs utilisateur

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :

1. Vérifiez que Node.js est à jour : `node --version`
2. Vérifiez que npm fonctionne : `npm --version`
3. Supprimez node_modules et réinstallez
4. Vérifiez les logs d'erreur dans le terminal

## 🎓 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## ✨ Fonctionnalités Incluses

- ✅ Page d'accueil avec 6 services
- ✅ Page de voyance fonctionnelle
- ✅ Animations Framer Motion
- ✅ Design responsive
- ✅ Background cosmique animé
- ✅ TypeScript configuré
- ✅ Tailwind CSS setup
- ✅ Icons Lucide React

## 🚀 Prêt à Commencer !

Vous avez maintenant une application de voyance complète et fonctionnelle. 

N'hésitez pas à personnaliser, ajouter des fonctionnalités et créer votre propre expérience cosmique unique !

---

**Bon développement ! 🌟**
