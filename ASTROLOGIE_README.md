# Système d'Analyse Astrologique avec IA

## 📋 Vue d'ensemble

Ce système permet de générer automatiquement des analyses astrologiques complètes basées sur les données de naissance des clients. Il utilise l'IA DeepSeek pour créer des rapports personnalisés incluant :

- 🎯 **Mission de Vie** - Analyse karmique, nœuds lunaires, vocation publique
- ✨ **Talents Naturels** - Compétences innées, dons, aptitudes
- 💭 **Défis de Vie** - Obstacles, leçons, transformations
- ❤️ **Relations** - Style relationnel, compatibilités
- 💼 **Carrière & Vocation** - Milieu du ciel, domaines recommandés
- 🌟 **Spiritualité** - Chemin spirituel, potentiel d'éveil

## 🔄 Flux de fonctionnement

1. **Client remplit le formulaire** → Nom, prénom, date/heure/lieu de naissance
2. **Paiement via MoneyFusion** → 200 FCFA par consultation
3. **Webhook déclenché** → Après paiement réussi
4. **Génération IA automatique** → DeepSeek analyse la carte du ciel (2-5 minutes)
5. **Affichage des résultats** → Interface avec onglets interactifs

## 🛠️ Configuration

### 1. Variables d'environnement

Copiez `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Remplissez les variables nécessaires :

```env
# DeepSeek AI (OBLIGATOIRE)
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxx

# URLs de l'application
NEXT_PUBLIC_APP_URL=https://www.monetoile.org
NEXT_PUBLIC_API_URL=https://api.monetoile.org

# Service ID
NEXT_PUBLIC_SERVICE_ID=your_service_id
```

### 2. Obtenir une clé API DeepSeek

1. Créez un compte sur [DeepSeek Platform](https://platform.deepseek.com)
2. Allez dans "API Keys"
3. Créez une nouvelle clé
4. Copiez-la dans `.env.local`

### 3. Installation

```bash
npm install
npm run dev
```

## 📁 Structure des fichiers

```
types/
  └── astrology.types.ts        # Types TypeScript pour l'astrologie

lib/api/services/
  └── deepseek.service.ts        # Service pour appeler l'IA DeepSeek

app/api/
  ├── consultations/[id]/
  │   └── generate-analysis/     # Endpoint pour générer l'analyse
  └── webhooks/
      └── moneyfusion/           # Webhook pour les paiements

app/protected/
  ├── consultations/[id]/        # Page d'affichage des résultats
  └── vie-personnelle/
      └── slidesection/          # Formulaire de consultation
```

## 🔌 API Endpoints



Génère l'analyse astrologique complète pour une consultation.

**Body:**
```json
{
  "birthData": {
    "nom": "ANZATA",
    "prenoms": "Mariam",
    "genre": "femme",
    "dateNaissance": "1997-08-23",
    "heureNaissance": "11:00",
    "paysNaissance": "Côte d'Ivoire",
    "villeNaissance": "Korhogo"
  }
}
```

**Response:**
```json
{
  "success": true,
  "consultationId": "...",
  "statut": "completed",
  "analyse": {
    "carteDuCiel": { ... },
    "missionDeVie": { ... },
    "talentsNaturels": { ... }
  }
}
```



Récupère le statut de génération ou l'analyse si terminée.

### POST `/api/webhooks/moneyfusion`

Reçoit les notifications de paiement de MoneyFusion et déclenche automatiquement la génération de l'analyse.

## 🎨 Interface utilisateur

### Page de résultats (`/protected/consultations/[id]`)

- **Onglets de navigation** - Mission, Talents, Défis, Relations, Carrière, Spiritualité
- **Chargement animé** - Pendant la génération de l'analyse
- **Design responsive** - Adapté mobile et desktop
- **Export PDF** - Bouton d'impression intégré

### Composants réutilisables

- `MissionDeVieTab` - Affiche l'analyse karmique
- `TalentsNaturelsTab` - Affiche les talents et dons
- Plus à venir pour les autres sections

## 📊 Prompts DeepSeek

Les prompts sont configurés dans `lib/api/services/deepseek.service.ts` :

1. **Carte du Ciel** - Liste toutes les positions planétaires
2. **Mission de Vie** - Analyse les nœuds lunaires, MC, Soleil, Jupiter, Saturne
3. **Talents Naturels** - Analyse Mercure, Vénus, Mars, maisons 2/6/10, astéroïdes

Vous pouvez personnaliser ces prompts selon vos besoins.

## 🐛 Débogage

### Activer les logs

Les logs sont déjà configurés dans le code :

```typescript
console.log('[DeepSeek] Génération carte du ciel pour', birthData.prenoms);
console.log('[MoneyFusion Webhook] Paiement réussi:', token);
```

### Tester la génération manuellement

```bash
curl -X POST http://localhost:3000/api/consultations/YOUR_ID/generate-analysis \
  -H "Content-Type: application/json" \
  -d '{"birthData": {...}}'
```

### Vérifier le webhook

```bash
curl -X POST http://localhost:3000/api/webhooks/moneyfusion \
  -H "Content-Type: application/json" \
  -d '{"token":"test","statut":true,"code_statut":1,"personal_Info":[{"consultationId":"xxx","type":"CONSULTATION","formData":{...}}]}'
```

## 💾 Base de données (TODO)

Actuellement, les TODO dans le code indiquent où sauvegarder les données :

```typescript
// TODO: Sauvegarder dans la base de données
// await db.consultations.updateOne(
//   { _id: consultationId },
//   { $set: { analyseAstrologique: analyseComplete }}
// );
```

Vous devez implémenter la connexion à votre base de données (MongoDB, PostgreSQL, etc.)

## 🚀 Prochaines étapes

- [ ] Implémenter la sauvegarde en base de données
- [ ] Ajouter les sections Relations, Carrière, Spiritualité
- [ ] Optimiser les prompts DeepSeek
- [ ] Ajouter un système de cache pour les analyses
- [ ] Notifications email après génération
- [ ] Téléchargement PDF personnalisé

## 📞 Support

Pour toute question ou problème :
- Consultez les logs de la console
- Vérifiez que `DEEPSEEK_API_KEY` est définie
- Testez les endpoints API individuellement

## 🔐 Sécurité

- Ne commitez JAMAIS votre `.env.local`
- La clé DeepSeek doit rester côté serveur
- Les webhooks doivent être validés en production
