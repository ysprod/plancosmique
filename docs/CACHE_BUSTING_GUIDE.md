# Système de Cache Busting - OFFOLOMOU

Ce guide explique comment le système de cache busting a été implémenté dans le projet OFFOLOMOU.

## 📋 Vue d'Ensemble

Le cache busting est un mécanisme qui force les navigateurs et CDNs à rechargement les ressources lorsqu'une nouvelle version du site est déployée. Cela garantit que les utilisateurs reçoivent toujours les derniers fichiers au lieu de versions mises en cache.

## 🎯 Composants du Système

### 1. **next.config.js** - Configuration Next.js
- **generateBuildId**: Génère un ID de build unique pour chaque déploiement
  - Utilise `BUILD_VERSION` (depuis .env.local) ou un timestamp ISO
  - Exemple: `2024-01-15T14-30-45` ou `v1.2.3`

- **Header Cache-Control optimisés**:
  - **Assets statiques** (`/_next/static`): cache 1 an (immutable)
  - **Images/Medias**: cache 1 an + stale-while-revalidate (1 jour)
  - **Fonts**: cache 1 an
  - **Pages HTML**: cache court terme (60s en CDN) + stale-while-revalidate (1h)
  - **API routes**: no-store (pas de cache)
  - **Service Worker**: no-cache (check serveur à chaque fois)

- **Headers de sécurité**:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: restrictions caméra/micro/géolocalisation

### 2. **.env.local.example** - Configuration d'Environnement
```env
# Cache Busting Configuration
BUILD_VERSION=2024-01-15T14-30-45

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=https://www.monetoile.org

# Cache Settings
CACHE_BUST_ASSETS=true      # Ajoute ?v=VERSION aux assets
CACHE_BUST_TTL=3600         # TTL en secondes avant rechecking buildId
```

### 3. **lib/cache/cacheBusting.ts** - Utilitaires de Cache
Fournit des fonctions utilitaires:
- `CACHE_STRATEGIES`: Stratégies de cache prédéfinies
- `generateCacheControlHeader()`: Génère les headers Cache-Control
- `getBuildVersion()`: Récupère la version actuelle
- `getBustingUrl()`: Ajoute ?v=VERSION aux URLs

### 4. **vercel.json** - Configuration Vercel (Déploiement)
- Headers de sécurité pour Vercel
- Configuration du framework et Node version
- Variables d'environnement pour Vercel

### 5. **scripts/generate-build-version.js** - Script de Génération
- Script Node qui génère automatiquement BUILD_VERSION
- Met à jour .env.local avant le build

## 🚀 Utilisation

### Développement Local
```bash
npm run dev
```
↳ Cache minimisé en dev (TTL=0 pour images)

### Build Production
```bash
npm run build
npm start
```
↳ Cache maximum activé (TTL=31536000 = 1 an)

### Build avec Version Personnalisée
```bash
BUILD_VERSION=v1.2.3 npm run build
```
↳ Utilise la version personnalisée au lieu du timestamp

### Générer une Nouvelle Version
```bash
node scripts/generate-build-version.js
npm run build
```
↳ Génère automatiquement un BUILD_VERSION basé sur timestamp

## 📊 Stratégies de Cache

| Type | Max-Age | S-MaxAge | Immutable | SWR | Cas d'Usage |
|------|---------|----------|-----------|-----|------------|
| Assets statiques | 1 an | 1 an | ✅ | ❌ | JS/CSS bundles |
| Images | 1 an | 1 an | ✅ | 1 jour | Images optimisées |
| Fonts | 1 an | 1 an | ✅ | ❌ | Police d'écriture |
| Pages HTML | 0 | 60s | ❌ | 1h | Contenu dynamique |
| API | 0 | ❌ | ❌ | ❌ | Données en temps réel |
| Service Worker | 0 | ❌ | ❌ | ❌ | Updates immédiats |

**Légende:**
- **Max-Age**: Cache navigateur (en secondes)
- **S-MaxAge**: Cache CDN/proxy (en secondes)
- **Immutable**: Asset ne changera jamais
- **SWR**: Stale-While-Revalidate (servir ancien + revalider en arrière-plan)

## 🔄 Comment Ça Fonctionne

1. **À la Compilation**:
   - `generateBuildId` crée un ID unique (ex: `2024-01-15T14-30-45`)
   - Next.js ajoute cet ID aux URL des assets
   - Les assets statiques deviennent: `/_next/static/chunks/main-<buildId>.js`

2. **Au Déploiement**:
   - Les headers Cache-Control sont appliqués
   - Les assets statiques: cache 1 an (immutable)
   - Les pages HTML: cache 60s (revalidate souvent)

3. **Quand l'Utilisateur Visite**:
   - Navigateur reçoit l'HTML mises en cache
   - Après 60s, le navigateur revalide auprès du CDN
   - Si nouvel ID (nouveau build), HTML est rechargée
   - Les assets avec ancien ID n'existent plus (erreur 404 → nouveau téléchargement)
   - Les assets avec nouvel ID sont automatiquement utilisés

4. **Stale-While-Revalidate**:
   - Navigateur peut servir une version mises en cache
   - Parallèlement, vérifie une nouvelle version
   - Si nouveau contenu, l'utilisateur l'obtient à la prochaine visite
   - Améliore la performance perçue

## 🛠️ Debugging

### Vérifier les Headers
```bash
# Voir les headers d'une URL
curl -I https://www.monetoile.org

# Filtrer Cache-Control
curl -I https://www.monetoile.org | grep -i cache-control
```

### Vérifier en DevTools
1. Ouvrir: DevTools → Network
2. Rechargement: `Ctrl+Shift+R` (hard refresh)
3. Vérifier colonne "Size": `from disk cache`, `from memory cache`, etc.
4. Vérifier headers: Response → Cache-Control

### Vérifier BuildId 
```bash
# Voir buildId dans .next/BUILD_ID
cat .next/BUILD_ID
```

### Vérifier Variables d'Environnement
```bash
# Inspect du .env.local
grep BUILD_VERSION .env.local
```

## 🐛 Troubleshooting

### Les utilisateurs voient toujours l'ancienne version
- ✅ Force hard refresh: `Ctrl+Shift+R`
- ✅ Vérifier buildId a changé: `curl -I` et comparer les URLs
- ✅ Vérifier CDN cache: peut être en retard (vérifier s-maxage)

### Les assets retournent 404
- ✅ C'est normal après un nouveau build
- ✅ Anciens assets sont remplacés par les nouveaux avec le nouvel ID
- ✅ Navigateur télécharge automatiquement les nouveaux

### Cache trop agressif
- ✅ Réduire max-age des pages HTML
- ✅ Coérriger vercel.json si déployé sur Vercel
- ✅ Vérifier les headers de .env.local

## 📚 Ressources Additionnelles

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [HTTP Caching Best Practices](https://web.dev/http-cache/)
- [Stale-While-Revalidate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#stale-while-revalidate)
- [Service Workers & Caching](https://developers.google.com/web/tools/workbox)

## 📝 Changelog

### Version 1.0.0
- ✅ Système de cache busting complet
- ✅ Headers optimisés pour assets, images, pages, API
- ✅ Headers de sécurité
- ✅ Support Vercel
- ✅ Utilitaires de cache et génération BUILD_VERSION
