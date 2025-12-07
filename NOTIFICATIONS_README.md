# Système de Notifications - Mon Étoile

## 📋 Vue d'ensemble

Le système de notifications permet d'informer les utilisateurs en temps réel de :
- ✨ **Consultations prêtes** : quand le résultat d'une consultation est disponible
- 📚 **Nouvelles connaissances** : quand un nouvel article ou contenu est partagé
- 🔔 **Mises à jour système** : notifications importantes de la plateforme
- 🎁 **Promotions** : offres spéciales et événements

## 🏗️ Architecture

### Composants créés

```
components/
└── NotificationBell.tsx          # Bouton de notification avec dropdown

app/
├── protected/
│   └── notifications/
│       └── page.tsx               # Page complète de gestion des notifications
└── api/
    └── notifications/
        ├── route.ts               # GET (liste) et POST (créer)
        ├── [id]/
        │   ├── route.ts          # DELETE (supprimer)
        │   └── read/
        │       └── route.ts      # PATCH (marquer comme lu)
        ├── unread/
        │   ├── route.ts          # GET (notifications non lues)
        │   └── count/
        │       └── route.ts      # GET (nombre non lu)
        ├── read-all/
        │   └── route.ts          # PATCH (tout marquer comme lu)
        └── preferences/
            └── route.ts          # GET/PUT (préférences utilisateur)

lib/
├── hooks/
│   └── useNotifications.ts       # Hook pour gérer l'état des notifications
└── api/
    └── services/
        └── notifications.service.ts  # Service API

types/
└── notification.types.ts         # Types TypeScript
```

## 🚀 Utilisation

### 1. Afficher les notifications dans le header

Le composant `NotificationBell` a été intégré dans `components/profil/Header.tsx` :

```tsx
import NotificationBell from "@/components/NotificationBell";

// Dans le header
<NotificationBell />
```

### 2. Utiliser le hook dans un composant

```tsx
'use client';
import { useNotifications } from '@/lib/hooks';

function MyComponent() {
  const {
    notifications,      // Liste des notifications
    unreadCount,        // Nombre non lu
    isLoading,          // État de chargement
    markAsRead,         // Marquer une notification comme lue
    markAllAsRead,      // Tout marquer comme lu
    deleteNotification, // Supprimer une notification
    fetchNotifications  // Recharger manuellement
  } = useNotifications(30000); // Polling toutes les 30s (optionnel)

  return (
    <div>
      <p>Vous avez {unreadCount} notifications non lues</p>
      {/* ... */}
    </div>
  );
}
```

### 3. Créer une notification (côté backend)

```typescript
// Exemple : quand une consultation est prête
await fetch('/api/notifications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    type: 'consultation_ready',
    title: 'Votre consultation est prête',
    message: 'Votre consultation de tarot est maintenant disponible.',
    link: '/protected/tarot',
  })
});
```

### 4. Types de notifications disponibles

```typescript
type NotificationType = 
  | 'consultation_ready'  // ✨ Consultation disponible
  | 'new_knowledge'       // 📚 Nouveau contenu
  | 'system'              // 🔔 Mise à jour système
  | 'promotion';          // 🎁 Offre spéciale
```

## 🎨 Fonctionnalités

### NotificationBell (composant dropdown)
- ✅ Badge avec compteur de notifications non lues
- ✅ Animation d'apparition
- ✅ Liste des notifications avec icônes colorées
- ✅ Marquer une notification comme lue au clic
- ✅ Supprimer une notification individuelle
- ✅ Tout marquer comme lu en un clic
- ✅ Navigation automatique vers le lien associé
- ✅ Fermeture automatique au clic extérieur
- ✅ Scrollbar personnalisée

### Page Notifications complète
- ✅ Vue d'ensemble de toutes les notifications
- ✅ Filtres par type et statut (toutes, non lues, par catégorie)
- ✅ Actions groupées (tout marquer comme lu)
- ✅ Suppression individuelle
- ✅ Design responsive et animations fluides
- ✅ Placeholder pour les paramètres (futur)

### Hook useNotifications
- ✅ Polling automatique configurable (défaut: 30s)
- ✅ Gestion d'état optimisée avec React hooks
- ✅ Gestion des erreurs
- ✅ Actions asynchrones (marquer lu, supprimer, etc.)
- ✅ Cache local des notifications

## 🔧 Configuration

### Personnaliser l'intervalle de polling

```tsx
// Polling toutes les 60 secondes
const { notifications } = useNotifications(60000);

// Pas de polling automatique (rechargement manuel uniquement)
const { notifications } = useNotifications(0);
```

### Personnaliser les couleurs

Les couleurs sont définies dans `NotificationBell.tsx` et peuvent être modifiées :

```tsx
const notificationColors = {
  consultation_ready: 'from-purple-500/20 to-pink-500/20',
  new_knowledge: 'from-blue-500/20 to-cyan-500/20',
  system: 'from-gray-500/20 to-slate-500/20',
  promotion: 'from-amber-500/20 to-orange-500/20',
};
```

## 🔌 Intégration avec le backend réel

Actuellement, les endpoints utilisent des données mockées. Pour une intégration complète :

1. **Remplacer les mocks par votre base de données** dans les fichiers `app/api/notifications/**/route.ts`

2. **Ajouter l'authentification** pour filtrer par utilisateur :
```typescript
import { getUserIdFromToken } from '@/lib/auth/utils';

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromToken(request);
  const notifications = await db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  // ...
}
```

3. **Créer les modèles de base de données** (exemple Prisma) :
```prisma
model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      NotificationType
  title     String
  message   String
  link      String?
  isRead    Boolean  @default(false)
  readAt    DateTime?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

enum NotificationType {
  consultation_ready
  new_knowledge
  system
  promotion
}
```

4. **Envoyer des notifications depuis vos services** :
```typescript
// Exemple : dans le service de consultation
async function completeConsultation(consultationId: string) {
  // ... logique de complétion
  
  // Créer la notification
  await db.notification.create({
    data: {
      userId: consultation.userId,
      type: 'consultation_ready',
      title: 'Votre consultation est prête',
      message: `Votre consultation ${consultation.type} est maintenant disponible.`,
      link: `/protected/${consultation.type}`,
    }
  });
}
```

## 📱 Responsive

Le système est entièrement responsive :
- **Desktop** : Dropdown élégant avec toutes les informations
- **Mobile** : Interface adaptée avec boutons optimisés
- **Tablet** : Mise en page flexible

## 🎯 Améliorations futures possibles

- [ ] Notifications push avec Service Workers
- [ ] Notifications par email configurable
- [ ] Notifications en temps réel avec WebSocket
- [ ] Historique complet avec pagination infinie
- [ ] Catégories personnalisables
- [ ] Sons de notification optionnels
- [ ] Mode "Ne pas déranger"
- [ ] Notifications groupées par jour
- [ ] Recherche dans les notifications

## 🐛 Dépannage

### Les notifications ne s'affichent pas
- Vérifiez que le composant `NotificationBell` est bien dans un contexte client (`'use client'`)
- Vérifiez la console pour les erreurs API
- Assurez-vous que les endpoints API répondent correctement

### Le polling ne fonctionne pas
- Vérifiez que l'intervalle est > 0
- Vérifiez qu'il n'y a pas d'erreur dans la console
- Le polling s'arrête si le composant est démonté

### Erreurs TypeScript
- Assurez-vous que tous les types sont bien importés depuis `@/types/notification.types`
- Vérifiez que le service est exporté dans `lib/api/services/index.ts`

## 📝 Notes importantes

- Le système utilise `framer-motion` pour les animations (déjà installé dans le projet)
- Les icônes viennent de `lucide-react` (déjà installé)
- Le style suit la convention Tailwind CSS du projet
- Les notifications sont stockées côté serveur (pas de localStorage)

## 🤝 Contribution

Pour ajouter un nouveau type de notification :
1. Ajoutez le type dans `types/notification.types.ts`
2. Ajoutez l'icône dans `notificationIcons`
3. Ajoutez la couleur dans `notificationColors`
4. Documentez l'usage dans ce README

---

**Auteur:** Système Mon Étoile  
**Version:** 1.0.0  
**Dernière mise à jour:** Décembre 2025
