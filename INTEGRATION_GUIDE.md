# 🔗 Guide d'Intégration Backend NestJS - Mon Étoile

## 📋 Vue d'ensemble

Ce guide explique comment le frontend Next.js communique avec le backend NestJS et comment tester l'intégration complète.

---

## ⚙️ Configuration Requise

### 1. Variables d'environnement Frontend

Créez ou mettez à jour `.env.local` :

```env
# URL de votre backend NestJS
NEXT_PUBLIC_API_URL=http://localhost:3000

# Autres variables si nécessaire
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

### 2. Configuration CORS Backend

Dans votre backend NestJS `main.ts` :

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activer CORS pour le frontend
  app.enableCors({
    origin: [
      'http://localhost:3002',  // Dev Next.js
      'http://localhost:3001',  
      'http://localhost:3000',  // Alternative
      'https://votre-domaine.com'  // Production
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3000);
  console.log(`Backend NestJS running on http://localhost:3000`);
}
bootstrap();
```

---

## 🚀 Démarrage des serveurs

### Terminal 1 : Backend NestJS
```bash
cd votre-backend-nestjs
npm run start:dev
```

**Vérification :**
- Backend accessible sur `http://localhost:3000`
- Swagger (si configuré) sur `http://localhost:3000/api`

### Terminal 2 : Frontend Next.js
```bash
cd plan-cosmique
npm run dev
```

**Vérification :**
- Frontend accessible sur `http://localhost:3002`
- Console sans erreurs CORS

---

## 🧪 Tests d'Intégration

### Test 1 : Authentification

#### Backend (si pas déjà fait)
Créez un utilisateur de test via Postman ou cURL :

```bash
# Inscription
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User",
    "role": "CLIENT"
  }'

# Connexion
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

#### Frontend
1. Allez sur `http://localhost:3002/auth/login`
2. Connectez-vous avec les identifiants de test
3. Vérifiez que vous êtes redirigé vers `/secured/profil`

### Test 2 : Notifications

#### Créer une notification de test (Backend)

```bash
# Via le service NotificationsService dans NestJS
# Ou directement via MongoDB
curl -X POST http://localhost:3000/notifications \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "VOTRE_USER_ID",
    "type": "NEW_KNOWLEDGE",
    "title": "Test notification",
    "message": "Ceci est une notification de test",
    "metadata": {
      "url": "/secured/knowledge"
    }
  }'
```

#### Vérifier sur le Frontend
1. Allez sur `http://localhost:3002/secured/profil`
2. Vérifiez que l'icône de cloche apparaît dans le header
3. Le badge devrait afficher le nombre de notifications
4. Cliquez sur la cloche pour voir le dropdown
5. La notification de test doit apparaître

#### Tester les actions
- ✅ Cliquez sur une notification → devrait marquer comme lue
- ✅ Cliquez sur "Tout marquer comme lu" → badge à 0
- ✅ Supprimez une notification → disparaît de la liste

### Test 3 : Connaissances (Knowledge)

#### Créer une connaissance de test (Backend)

```bash
curl -X POST http://localhost:3000/knowledge \
  -H "Authorization: Bearer CONSULTANT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction au Tarot",
    "content": "Le Tarot est un outil de divination composé de 78 cartes...",
    "category": "TAROT",
    "tags": ["tarot", "divination", "introduction"],
    "imageUrl": "https://picsum.photos/800/400",
    "isPublished": true
  }'
```

#### Vérifier sur le Frontend
1. Allez sur `http://localhost:3002/secured/knowledge`
2. La connaissance devrait apparaître dans la liste
3. Testez les filtres par catégorie
4. Cliquez sur la connaissance pour voir le détail
5. Testez le bouton "J'aime"

---

## 📡 Mapping des Endpoints

### Notifications

| Action Frontend | Service Method | Endpoint Backend |
|----------------|----------------|------------------|
| `useNotifications()` | `getUnreadNotifications()` | `GET /notifications?isRead=false` |
| Badge compteur | `getUnreadCount()` | `GET /notifications/unread/count` |
| Marquer lu | `markAsRead(id)` | `PATCH /notifications/:id/read` |
| Tout marquer lu | `markAllAsRead()` | `POST /notifications/mark-all-read` |
| Supprimer | `deleteNotification(id)` | `DELETE /notifications/:id` |
| Supprimer toutes lues | `deleteAllRead()` | `DELETE /notifications/read/all` |

### Knowledge

| Action Frontend | Service Method | Endpoint Backend |
|----------------|----------------|------------------|
| Liste | `getAll()` | `GET /knowledge` |
| Populaires | `getPopular()` | `GET /knowledge/popular` |
| Récentes | `getRecent()` | `GET /knowledge/recent` |
| Détail | `getById(id)` | `GET /knowledge/:id` |
| Créer | `create(data)` | `POST /knowledge` |
| Mettre à jour | `update(id, data)` | `PATCH /knowledge/:id` |
| Supprimer | `delete(id)` | `DELETE /knowledge/:id` |
| Like | `toggleLike(id)` | `POST /knowledge/:id/like` |

---

## 🔍 Debug et Résolution de Problèmes

### Problème 1 : Erreur CORS

**Symptôme :**
```
Access to fetch at 'http://localhost:3000/notifications' from origin 'http://localhost:3002' 
has been blocked by CORS policy
```

**Solution :**
1. Vérifiez la configuration CORS dans `main.ts` du backend
2. Assurez-vous que `credentials: true` est défini
3. Vérifiez que l'URL frontend est dans la liste `origin`

### Problème 2 : 401 Unauthorized

**Symptôme :**
```
GET http://localhost:3000/notifications 401 (Unauthorized)
```

**Solution :**
1. Vérifiez que le token JWT est bien stocké dans `localStorage`
2. Ouvrez DevTools → Application → Local Storage
3. Cherchez `accessToken` ou `token`
4. Si absent, reconnectez-vous

### Problème 3 : Notifications ne s'affichent pas

**Étapes de vérification :**

1. **Vérifiez les données backend :**
```bash
curl -X GET http://localhost:3000/notifications \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

2. **Vérifiez la console du navigateur :**
```javascript
// Doit afficher les notifications
console.log(notifications)
```

3. **Vérifiez le format des données :**
```typescript
// Le frontend attend :
{
  _id: string,
  userId: string,
  type: 'CONSULTATION_RESULT' | 'NEW_KNOWLEDGE' | ...,
  title: string,
  message: string,
  isRead: boolean,
  metadata: { url?: string, ... },
  createdAt: string
}
```

### Problème 4 : Images ne s'affichent pas

**Solution :**
Si les images des connaissances ne s'affichent pas, configurez Next.js :

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'votre-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Pour les tests
      },
    ],
  },
};
```

---

## 📊 Monitoring et Logs

### Logs Backend (NestJS)

```typescript
// Dans notifications.service.ts
this.logger.log(`Notification créée pour l'utilisateur ${userId}`);
this.logger.error('Erreur lors de la création de notification', error);
```

**Vérifiez les logs :**
```bash
# Terminal backend
[Nest] INFO  Notification créée pour l'utilisateur 674a1234...
```

### Logs Frontend (Next.js)

```typescript
// Dans useNotifications.ts
console.log('Notifications chargées:', notifications);
console.error('Erreur notifications:', error);
```

**Ouvrez DevTools → Console**

---

## 🎯 Scénarios de Test Complets

### Scénario 1 : Workflow Consultation Complète

#### Étape 1 : Créer une consultation (Backend)
```bash
curl -X POST http://localhost:3000/consultations \
  -H "Authorization: Bearer CLIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "ID_SERVICE",
    "scheduledDate": "2024-12-15T10:00:00Z",
    "message": "Je souhaite une consultation de tarot"
  }'
```

#### Étape 2 : Assigner au consultant (Admin)
```bash
curl -X PATCH http://localhost:3000/consultations/CONSULTATION_ID/assign/CONSULTANT_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Résultat attendu :**
- Le consultant reçoit une notification `CONSULTATION_ASSIGNED`
- Visible dans le dropdown de notifications du consultant

#### Étape 3 : Compléter la consultation (Consultant)
```bash
curl -X PATCH http://localhost:3000/consultations/CONSULTATION_ID \
  -H "Authorization: Bearer CONSULTANT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED",
    "result": "Votre tirage révèle...",
    "resultData": { "interpretation": "..." }
  }'
```

**Résultat attendu :**
- Le client reçoit une notification `CONSULTATION_RESULT`
- Badge notifications du client incrémenté
- Notification visible avec lien vers la consultation

#### Étape 4 : Client consulte le résultat (Frontend)
1. Client voit badge de notification (Frontend)
2. Clique sur la notification
3. Redirigé vers `/consultations/CONSULTATION_ID`
4. Notification marquée automatiquement comme lue

### Scénario 2 : Workflow Partage de Connaissance

#### Étape 1 : Consultant crée un brouillon
```bash
curl -X POST http://localhost:3000/knowledge \
  -H "Authorization: Bearer CONSULTANT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Guide du Tarot",
    "content": "Contenu...",
    "category": "TAROT",
    "isPublished": false
  }'
```

**Résultat :** Brouillon créé, pas de notification

#### Étape 2 : Consultant publie le brouillon
```bash
curl -X PATCH http://localhost:3000/knowledge/KNOWLEDGE_ID \
  -H "Authorization: Bearer CONSULTANT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "isPublished": true
  }'
```

**Résultat attendu :**
- Notification `NEW_KNOWLEDGE` créée
- Connaissance visible sur `/secured/knowledge`

#### Étape 3 : Utilisateurs découvrent (Frontend)
1. Aller sur `/secured/knowledge`
2. Voir la nouvelle connaissance
3. Cliquer pour lire le détail
4. Compteur de vues incrémenté automatiquement

#### Étape 4 : Utilisateur aime la connaissance
1. Sur la page détail, cliquer "J'aime"
2. Compteur de likes incrémenté
3. Bouton change d'état (rempli)

---

## 🔐 Gestion des Rôles et Permissions

### Matrice des permissions

| Action | CLIENT | CONSULTANT | ADMIN | SUPER_ADMIN |
|--------|--------|------------|-------|-------------|
| Voir notifications | ✅ (ses) | ✅ (ses) | ✅ (ses) | ✅ (ses) |
| Voir knowledge publiques | ✅ | ✅ | ✅ | ✅ |
| Créer knowledge | ❌ | ✅ | ✅ | ✅ |
| Modifier knowledge | ❌ | ✅ (ses) | ✅ (toutes) | ✅ (toutes) |
| Supprimer knowledge | ❌ | ✅ (ses) | ✅ (toutes) | ✅ (toutes) |
| Like knowledge | ✅ | ✅ | ✅ | ✅ |

### Tester les permissions

```bash
# CLIENT essaie de créer une connaissance → 403 Forbidden
curl -X POST http://localhost:3000/knowledge \
  -H "Authorization: Bearer CLIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "title": "Test", "content": "Test" }'

# CONSULTANT peut créer → 201 Created
curl -X POST http://localhost:3000/knowledge \
  -H "Authorization: Bearer CONSULTANT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "title": "Test", "content": "Test", "category": "TAROT" }'
```

---

## 📈 Performance et Optimisation

### Polling des notifications

**Configuration actuelle :**
- Intervalle : 30 secondes
- Endpoint : `GET /notifications/unread/count`

**Configurer l'intervalle :**

```typescript
// Dans votre composant
const { notifications } = useNotifications(60000); // 60 secondes
const { notifications } = useNotifications(0); // Désactiver le polling
```

**Recommandation :** Pour une meilleure expérience, implémentez WebSocket :

```typescript
// Backend NestJS - notifications.gateway.ts
@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  notifyUser(userId: string, notification: any) {
    this.server.to(userId).emit('notification', notification);
  }
}

// Frontend Next.js
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL);
socket.on('notification', (notification) => {
  // Ajouter à la liste
  // Incrémenter le badge
});
```

---

## ✅ Checklist de Déploiement

### Backend NestJS
- [ ] Variables d'environnement configurées
- [ ] CORS configuré pour le domaine de production
- [ ] Base de données MongoDB connectée
- [ ] Indexes créés sur les collections
- [ ] JWT secret sécurisé
- [ ] Rate limiting configuré
- [ ] Logs de production activés
- [ ] Health check endpoint fonctionnel

### Frontend Next.js
- [ ] `NEXT_PUBLIC_API_URL` pointe vers la prod
- [ ] Build production réussi (`npm run build`)
- [ ] Variables d'environnement de prod configurées
- [ ] Images optimisées (si nécessaire)
- [ ] Tests manuels sur les notifications
- [ ] Tests manuels sur les connaissances
- [ ] Tests responsive (mobile/tablet)
- [ ] Tests des permissions par rôle

### Intégration
- [ ] Authentification fonctionne (login/register)
- [ ] Notifications s'affichent correctement
- [ ] Connaissances s'affichent correctement
- [ ] Likes fonctionnent
- [ ] Compteurs de vues incrémentent
- [ ] Filtres et recherche fonctionnent
- [ ] Pagination fonctionne
- [ ] Gestion des erreurs appropriée

---

## 🎓 Conclusion

Votre application frontend Next.js est maintenant **entièrement configurée** pour communiquer avec votre backend NestJS. Le système de notifications et de partage de connaissances est opérationnel.

**Points clés :**
- ✅ Types TypeScript synchronisés
- ✅ Services API configurés
- ✅ Composants UI adaptés
- ✅ Endpoints mappés correctement
- ✅ Permissions gérées
- ✅ Ready for production

**Prochaines étapes suggérées :**
1. Implémenter WebSocket pour notifications en temps réel
2. Ajouter des tests E2E avec Cypress
3. Configurer CI/CD
4. Monitorer les performances (Sentry, DataDog)

---

**Documentation connexe :**
- `INTEGRATION_NESTJS.md` - Guide d'intégration technique
- `NOTIFICATIONS_README.md` - Documentation complète du système
- Backend docs - Référez-vous à la documentation NestJS fournie

**Support :**
- Console navigateur pour erreurs frontend
- Logs NestJS pour erreurs backend
- Postman/Insomnia pour tester les endpoints
