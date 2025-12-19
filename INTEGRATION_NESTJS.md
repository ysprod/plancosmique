# 🔗 Intégration Backend NestJS - Mon Étoile

## ✅ Intégration Complète

Le frontend Next.js est maintenant **entièrement configuré** pour communiquer avec votre backend NestJS existant.

---

## 📦 Ce qui a été fait

### 1️⃣ **Types TypeScript adaptés**
- ✅ `types/notification.types.ts` - Types MongoDB avec `_id` et nouveaux types de notifications
- ✅ `types/knowledge.types.ts` - Types complets pour le module Knowledge

### 2️⃣ **Services API mis à jour**
- ✅ `lib/api/services/notifications.service.ts` - Endpoints NestJS au lieu des routes Next.js
- ✅ `lib/api/services/knowledge.service.ts` - Service complet pour les connaissances
- ✅ Tous les services exportés dans `lib/api/services/index.ts`

### 3️⃣ **Composants UI adaptés**
- ✅ `NotificationBell` - Badge et dropdown avec les nouveaux types
- ✅ `/secured/notifications` - Page complète avec filtres
- ✅ Hook `useNotifications` mis à jour pour utiliser `_id`

### 4️⃣ **Nouvelles pages créées**
- ✅ `/secured/knowledge` - Liste des connaissances avec filtres par catégorie
- ✅ `/secured/knowledge/[id]` - Détail d'une connaissance avec système de likes

### 5️⃣ **Nettoyage**
- ✅ Routes API Next.js mockées supprimées (`app/api/notifications/*`)
- ✅ Build Next.js réussi sans erreurs

---

## 🔌 Endpoints utilisés

### Notifications
```typescript
GET    /notifications              // Liste paginée
GET    /notifications/unread/count // Compteur non lu
PATCH  /notifications/:id/read     // Marquer comme lu
POST   /notifications/mark-all-read // Tout marquer comme lu
DELETE /notifications/:id          // Supprimer
DELETE /notifications/read/all     // Supprimer toutes les lues
```

### Knowledge
```typescript
GET    /knowledge                  // Liste (PUBLIC)
GET    /knowledge/my              // Mes connaissances
GET    /knowledge/popular         // Populaires
GET    /knowledge/recent          // Récentes
GET    /knowledge/:id             // Détail
POST   /knowledge                 // Créer (AUTH)
PATCH  /knowledge/:id             // Mettre à jour (AUTH)
DELETE /knowledge/:id             // Supprimer (AUTH)
POST   /knowledge/:id/like        // Like/Unlike (AUTH)
```

---

## ⚙️ Configuration requise

### 1. Variables d'environnement

Assurez-vous que votre fichier `.env.local` contient l'URL de votre backend NestJS :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
# ou
NEXT_PUBLIC_API_URL=https://votre-api-nestjs.com
```

### 2. CORS sur le backend NestJS

Assurez-vous que votre backend autorise les requêtes depuis votre frontend :

```typescript
// main.ts dans votre backend NestJS
app.enableCors({
  origin: [
    'http://localhost:3002',  // Frontend Next.js local
    'https://votre-frontend.com'  // Production
  ],
  credentials: true,
});
```

---

## 🎯 Types de notifications supportés

| Type Frontend | Type Backend | Icône | Description |
|--------------|--------------|-------|-------------|
| `CONSULTATION_RESULT` | `CONSULTATION_RESULT` | ✨ | Résultat de consultation disponible |
| `NEW_KNOWLEDGE` | `NEW_KNOWLEDGE` | 📚 | Nouvelle connaissance partagée |
| `CONSULTATION_ASSIGNED` | `CONSULTATION_ASSIGNED` | 📋 | Consultation assignée au consultant |
| `PAYMENT_CONFIRMED` | `PAYMENT_CONFIRMED` | 💳 | Paiement confirmé |
| `SYSTEM_ANNOUNCEMENT` | `SYSTEM_ANNOUNCEMENT` | 🔔 | Annonce système |

---

## 📚 Catégories de connaissances

| Catégorie Backend | Label Frontend | Couleur |
|-------------------|----------------|---------|
| `ASTROLOGIE` | Astrologie | Violet/Rose |
| `NUMEROLOGIE` | Numérologie | Bleu/Cyan |
| `TAROT` | Tarot | Violet/Fuchsia |
| `SPIRITUALITE` | Spiritualité | Orange/Ambre |
| `MEDITATION` | Méditation | Vert/Emeraude |
| `DEVELOPPEMENT_PERSONNEL` | Développement Personnel | Teal/Cyan |
| `RITUELS` | Rituels | Rose/Pink |
| `AUTRES` | Autres | Gris |

---

## 🚀 Test de l'intégration

### 1. Démarrer le backend NestJS
```bash
cd votre-backend-nestjs
npm run start:dev
```

### 2. Démarrer le frontend Next.js
```bash
cd plan-cosmique
npm run dev
```

### 3. Tester les notifications
1. Connectez-vous avec un utilisateur
2. Allez sur `/secured/profil`
3. Vérifiez que l'icône de cloche apparaît dans le header
4. Le badge devrait afficher le nombre de notifications non lues (depuis votre API)

### 4. Tester les connaissances
1. Allez sur `/secured/knowledge`
2. Vous devriez voir la liste des connaissances depuis votre API
3. Testez les filtres par catégorie
4. Cliquez sur une connaissance pour voir le détail
5. Testez le bouton "J'aime"

---

## 🔍 Structure des données

### Notification (MongoDB)
```typescript
{
  _id: "674a1234567890abcdef1234",
  userId: "674a1234567890abcdef5678",
  type: "CONSULTATION_RESULT",
  title: "Résultat de consultation disponible",
  message: "Le résultat de votre consultation est maintenant disponible.",
  isRead: false,
  metadata: {
    consultationId: "674a1234567890abcdef9012",
    url: "/consultations/674a1234567890abcdef9012"
  },
  createdAt: "2024-12-06T10:30:00.000Z",
  updatedAt: "2024-12-06T10:30:00.000Z"
}
```

### Knowledge (MongoDB)
```typescript
{
  _id: "674a1234567890abcdef1234",
  title: "Les Phases de la Lune",
  content: "La Lune traverse différentes phases...",
  category: "ASTROLOGIE",
  authorId: {
    _id: "674a1234567890abcdef5678",
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie@monetoile.org",
    role: "CONSULTANT"
  },
  tags: ["lune", "astrologie", "influence"],
  imageUrl: "https://example.com/moon.jpg",
  isPublished: true,
  viewsCount: 42,
  likesCount: 15,
  likedBy: ["user1", "user2"],
  publishedAt: "2024-12-06T10:00:00.000Z",
  createdAt: "2024-12-06T10:00:00.000Z",
  updatedAt: "2024-12-06T10:00:00.000Z"
}
```

---

## 🛠️ Utilisation dans le code

### Récupérer les notifications
```typescript
import { notificationsService } from '@/lib/api/services';

// Avec le hook (recommandé)
const { notifications, unreadCount, markAsRead } = useNotifications();

// Directement avec le service
const response = await notificationsService.getNotifications(1, 20, false);
console.log(response.notifications);
```

### Gérer les connaissances
```typescript
import { knowledgeService } from '@/lib/api/services';

// Liste des connaissances
const response = await knowledgeService.getAll({
  page: 1,
  limit: 20,
  category: 'ASTROLOGIE'
});

// Créer une connaissance (requiert auth CONSULTANT ou ADMIN)
const newKnowledge = await knowledgeService.create({
  title: "Mon article",
  content: "Contenu...",
  category: "TAROT",
  tags: ["tarot", "divination"],
  isPublished: true
});

// Liker une connaissance
const result = await knowledgeService.toggleLike(knowledgeId);
console.log(result.liked); // true or false
```

---

## 🔐 Authentification

Les services utilisent automatiquement le token JWT stocké dans `localStorage` via `apiClient` configuré dans `lib/api/client.ts`.

Le token est automatiquement ajouté dans les headers :
```typescript
Authorization: Bearer <your-jwt-token>
```

---

## 📊 Fonctionnalités implémentées

### Notifications
- [x] Badge avec compteur dans le header
- [x] Dropdown avec liste des notifications récentes
- [x] Page complète avec filtres
- [x] Marquer comme lu (individuel)
- [x] Marquer toutes comme lues
- [x] Supprimer une notification
- [x] Polling automatique (30s par défaut)
- [x] Navigation vers le contenu associé (metadata.url)

### Knowledge
- [x] Liste avec pagination
- [x] Filtres par catégorie
- [x] Recherche par mot-clé
- [x] Onglets : Toutes, Populaires, Récentes
- [x] Détail d'une connaissance
- [x] Système de likes
- [x] Affichage auteur
- [x] Compteur de vues
- [x] Tags
- [x] Images

---

## 🎨 Pages et Routes

### Routes de navigation
- `/secured/profil` - Profil avec NotificationBell dans header
- `/secured/notifications` - Gestion des notifications
- `/secured/knowledge` - Liste des connaissances
- `/secured/knowledge/[id]` - Détail d'une connaissance

### Liens à ajouter dans votre navigation
Vous pouvez ajouter un lien vers les connaissances dans votre menu principal :

```tsx
<Link href="/secured/knowledge">
  <BookOpen className="w-5 h-5" />
  Connaissances
</Link>
```

---

## 🚧 Points d'attention

### 1. URL de l'API
Vérifiez que `NEXT_PUBLIC_API_URL` dans `.env.local` pointe vers votre backend NestJS.

### 2. Format des réponses
Le frontend s'attend à recevoir les données dans le format exact décrit dans votre documentation backend.

### 3. Gestion des erreurs
Les erreurs API sont capturées et loggées dans la console. Vous pouvez ajouter des toasts pour les afficher à l'utilisateur.

### 4. Images
Les images utilisent des `<img>` standard. Pour de meilleures performances, vous pouvez les remplacer par `<Image />` de Next.js avec une configuration appropriée.

---

## 🔄 WebSocket (Optionnel - À implémenter)

Pour les notifications en temps réel, vous pouvez intégrer Socket.IO :

```typescript
// À ajouter dans un hook useNotificationSocket
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL);

socket.on('notification', (notification) => {
  // Ajouter à la liste
  setNotifications(prev => [notification, ...prev]);
  setUnreadCount(prev => prev + 1);
  
  // Afficher un toast
  toast.info(notification.title);
});
```

---

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées (`.env.local`)
- [ ] CORS configuré sur le backend NestJS
- [ ] Build Next.js réussi (`npm run build`)
- [ ] Tests manuels des notifications
- [ ] Tests manuels des connaissances
- [ ] Tests sur mobile (responsive)
- [ ] Configuration production (URL API production)

---

## 📝 Notes importantes

1. **Les routes API Next.js mockées ont été supprimées** - Le frontend communique directement avec votre backend NestJS
2. **Les types sont synchronisés** avec votre backend (types MongoDB, énumérations)
3. **L'authentification JWT** est gérée automatiquement par `apiClient`
4. **Le polling** des notifications est à 30 secondes par défaut (configurable)
5. **Les images** dans Knowledge sont optionnelles

---

## 🤝 Support

Pour toute question sur l'intégration :
1. Vérifiez que votre backend NestJS renvoie les données dans le bon format
2. Consultez la console du navigateur pour les erreurs API
3. Vérifiez les logs du backend NestJS
4. Testez les endpoints avec Postman/Insomnia

---

**Status :** ✅ Intégration complète et fonctionnelle  
**Version :** 1.0.0  
**Date :** Décembre 2025  
**Build :** ✅ Réussi sans erreurs
