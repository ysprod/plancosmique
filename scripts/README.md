# Scripts Mon Étoile

Ce dossier contient les scripts utilitaires pour la gestion de la plateforme Mon Étoile.

## 📜 Scripts disponibles

### `migrate-database.js`

Script de migration de la base de données pour mettre en place la nouvelle architecture.

#### Ce qu'il fait :

1. **Insère les 18 offrandes** dans la collection `offerings`
2. **Crée les collections manquantes** :
   - `user_wallets` (pour stocker les offrandes possédées)
   - `user_carts` (pour stocker les paniers d'achat)
   - `rubriques` (pour stocker les rubriques)
   - `transactions_history` (pour l'historique des transactions)
3. **Met à jour la collection `consultations`** avec les nouveaux champs
4. **Crée les indexes** nécessaires pour les performances
5. **Vérifie l'intégrité** des données

#### Usage :

```bash
# S'assurer que MongoDB est en cours d'exécution
# Configurer MONGODB_URI dans .env si nécessaire

node scripts/migrate-database.js
```

#### Sortie attendue :

```
🚀 Démarrage de la migration de la base de données Mon Étoile

✅ Connecté à MongoDB

📦 Migration des offrandes...
✅ 18 offrandes insérées
✅ Index créés sur offerings

💼 Création de la collection user_wallets...
✅ Collection user_wallets créée

🛒 Création de la collection user_carts...
✅ Collection user_carts créée

📝 Mise à jour de la collection consultations...
✅ 42 consultations mises à jour
✅ Index créés sur consultations

📚 Création de la collection rubriques...
✅ Collection rubriques créée

💳 Création de la collection transactions_history...
✅ Collection transactions_history créée

🔍 Vérification de l'intégrité des données...

📊 Statistiques de la base de données:
   - Offrandes: 18
   - Consultations: 42
   - Utilisateurs: 15

✅ Toutes les offrandes sont présentes
✅ Aucune offrande orpheline détectée

✅ Migration terminée avec succès!

👋 Déconnecté de MongoDB
```

---

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` avec :

```env
MONGODB_URI=mongodb://localhost:27017/monetoile
# ou votre URI MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/monetoile
```

---

## ⚠️ Précautions

### Avant de lancer la migration :

1. ✅ **Faire un backup de la base de données**
   ```bash
   mongodump --uri="mongodb://localhost:27017/monetoile" --out=./backup
   ```

2. ✅ **Vérifier que MongoDB est accessible**
   ```bash
   mongosh "mongodb://localhost:27017/monetoile"
   ```

3. ✅ **Tester sur un environnement de dev d'abord**

4. ✅ **Vérifier les logs après migration**

### Restaurer un backup si nécessaire :

```bash
mongorestore --uri="mongodb://localhost:27017/monetoile" ./backup
```

---

## 🗄️ Structure des collections après migration

### `offerings`
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  price: Number,
  priceUSD: Number,
  category: String, // 'animal' | 'vegetal' | 'beverage'
  icon: String,
  description: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### `user_wallets`
```javascript
{
  _id: ObjectId,
  userId: ObjectId (unique),
  offerings: [{
    offeringId: ObjectId,
    quantity: Number,
    acquiredAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### `user_carts`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    offeringId: ObjectId,
    quantity: Number
  }],
  totalAmount: Number,
  status: String, // 'active' | 'completed' | 'abandoned'
  createdAt: Date,
  updatedAt: Date
}
```

### `consultations` (mis à jour)
```javascript
{
  // ... champs existants ...
  
  // Nouveaux champs ajoutés
  consultationChoiceId: String,
  consultationTitle: String,
  rubrique: String,
  sousRubrique: String,
  generatedAt: Date,
  modifiedAt: Date,
  sentAt: Date,
  generationMetadata: {
    model: String,
    tokensUsed: Number,
    processingTime: Number
  },
  modifications: [{
    timestamp: Date,
    adminId: String,
    changes: String
  }]
}
```

### `rubriques`
```javascript
{
  _id: ObjectId,
  id: String (unique),
  titre: String,
  description: String,
  categorie: String, // 'astrologie' | 'numerologie'
  consultationChoices: [{
    id: String,
    titre: String,
    description: String,
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

### `transactions_history`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  transactionType: String, // 'purchase' | 'usage' | 'refund'
  items: [{
    offeringId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String, // 'pending' | 'completed' | 'failed'
  consultationId: ObjectId, // Si transaction liée à une consultation
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📊 Index créés

### `offerings`
- `id` (unique)
- `category`
- `isActive`

### `user_wallets`
- `userId` (unique)
- `offerings.offeringId`

### `user_carts`
- `userId`
- `status`
- `createdAt` (desc)

### `consultations`
- `consultationChoiceId`
- `rubrique`
- `sousRubrique`
- `status`
- `clientId`
- `createdAt` (desc)

### `rubriques`
- `id` (unique)
- `categorie`

### `transactions_history`
- `userId`
- `transactionType`
- `createdAt` (desc)
- `status`

---

## 🧪 Tester la migration

Après la migration, vérifiez :

```bash
# Se connecter à MongoDB
mongosh "mongodb://localhost:27017/monetoile"

# Vérifier les collections
show collections

# Compter les offrandes
db.offerings.countDocuments()
// Devrait retourner 18

# Voir quelques offrandes
db.offerings.find().limit(3).pretty()

# Vérifier les index
db.offerings.getIndexes()

# Vérifier les consultations mises à jour
db.consultations.find({ consultationChoiceId: { $exists: true } }).limit(1).pretty()
```

---

## 🆘 Troubleshooting

### Erreur de connexion MongoDB
```
❌ Erreur lors de la migration: MongoServerError: ...
```

**Solution** : Vérifier que MongoDB est lancé et que l'URI est correct.

### Offrandes déjà présentes
```
⚠️  18 offrandes existent déjà
```

**Solution** : Le script ne remplace pas les offrandes existantes par défaut. 
Si vous voulez les remplacer, supprimez-les manuellement d'abord :

```bash
mongosh "mongodb://localhost:27017/monetoile"
db.offerings.deleteMany({})
```

### Erreur d'import ES modules
```
❌ Cannot use import statement outside a module
```

**Solution** : Vérifier que `package.json` contient `"type": "module"` 
ou renommer le fichier en `.mjs`.

---

## 📝 Prochains scripts à créer

1. **`seed-test-data.js`** - Créer des données de test
2. **`cleanup-database.js`** - Nettoyer les données obsolètes
3. **`export-stats.js`** - Exporter les statistiques
4. **`sync-offerings.js`** - Synchroniser les offrandes avec la config

---

**Date de création** : 2 janvier 2026  
**Dernière mise à jour** : 2 janvier 2026

🌟 **Mon Étoile** - Scripts de gestion 🌟
