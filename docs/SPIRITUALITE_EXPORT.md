# Documentation - Export Spiritualité Africaine vers Base de Données

## Vue d'ensemble

Ce système permet d'exporter le contenu actuel de la page Spiritualité Africaine vers votre base de données backend. Vous avez maintenant accès à une interface d'administration et des utilitaires d'export.

## 📁 Fichiers créés

### 1. Utilitaire d'export
**Fichier**: `lib/utils/spiritualite-export.ts`

Contient:
- ✅ Interface TypeScript `SpiritualPracticeDB` pour typage
- ✅ Données complètes des 5 pratiques spirituelles
- ✅ Fonction `exportToJSON()` pour export JSON
- ✅ Fonction `generateSQLInsert()` pour générer SQL INSERT
- ✅ Constante `tableSchema` avec le schéma PostgreSQL complet

### 2. Page d'administration
**Fichier**: `app/protected/spiritualite/admin/page.tsx`

Interface web pour:
- ✅ Visualiser les 5 pratiques spirituelles
- ✅ Exporter en 3 formats (JSON / SQL / SCHEMA)
- ✅ Copier ou télécharger les données
- ✅ Statistiques en temps réel

**URL**: `http://localhost:3000/protected/spiritualite/admin`

## 🚀 Utilisation

### Option 1: Interface Web (Recommandé)

1. **Accédez à l'admin**:
   ```
   http://localhost:3000/protected/spiritualite/admin
   ```

2. **Choisissez votre format**:
   - **JSON**: Pour importer via API REST
   - **SQL**: Pour insertion directe en base PostgreSQL
   - **SCHEMA**: Pour créer la table d'abord

3. **Copiez ou téléchargez** le contenu

### Option 2: Import programmatique

Dans votre code backend ou script d'import:

```typescript
import { exportToJSON, generateSQLInsert, tableSchema } from '@/lib/utils/spiritualite-export';

// Export JSON
const jsonData = exportToJSON();
console.log(jsonData);

// Export SQL
const sqlInserts = generateSQLInsert('spiritual_practices');
console.log(sqlInserts);

// Schema
console.log(tableSchema);
```

## 🗄️ Structure de la base de données

### Schéma PostgreSQL

```sql
CREATE TABLE spiritual_practices (
  id VARCHAR(50) PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  published BOOLEAN DEFAULT true,
  order_index INTEGER NOT NULL,
  description TEXT NOT NULL,
  introduction TEXT NOT NULL,
  key_elements JSONB NOT NULL,
  detailed_guide TEXT NOT NULL,
  benefits JSONB NOT NULL,
  practical_steps JSONB NOT NULL,
  warnings JSONB NOT NULL,
  affirmation TEXT NOT NULL,
  materials JSONB,
  best_timing TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_spiritual_practices_category ON spiritual_practices(category);
CREATE INDEX idx_spiritual_practices_published ON spiritual_practices(published);
CREATE INDEX idx_spiritual_practices_order ON spiritual_practices(order_index);
```

### Champs JSONB

Les champs suivants utilisent JSONB pour flexibilité:
- `key_elements`: Array de strings
- `benefits`: Array de strings
- `practical_steps`: Array de strings
- `warnings`: Array de strings
- `materials`: Array de strings (nullable)

## 📊 Données exportées

### 5 pratiques spirituelles

1. **Notions de Base** (`sp-bases`)
   - 7 éléments clés
   - 7 étapes pratiques
   - 5 matériaux

2. **Rituels de Protection** (`sp-protection`)
   - 7 éléments clés
   - 7 étapes pratiques
   - 6 matériaux

3. **Rituels d'Abondance** (`sp-abondance`)
   - 7 éléments clés
   - 7 étapes pratiques
   - 7 matériaux

4. **Invocation des Ancêtres** (`sp-ancetres`)
   - 7 éléments clés
   - 7 étapes pratiques
   - 7 matériaux

5. **Méditations Guidées** (`sp-meditations`)
   - 7 éléments clés
   - 7 étapes pratiques
   - 7 matériaux

## 🔌 Intégration Backend

### Étape 1: Créer la table

```bash
# Dans psql ou votre outil SQL
psql -d votre_database -c "$(cat spiritualite-schema.sql)"
```

### Étape 2: Insérer les données

**Option A - SQL direct**:
```bash
psql -d votre_database -f spiritualite-insert.sql
```

**Option B - Via API**:
```typescript
// Endpoint: POST /api/spiritual-practices/import
// Body: JSON complet des pratiques

export async function POST(request: Request) {
  const practices = await request.json();
  
  for (const practice of practices) {
    await db.spiritualPractices.create({
      data: practice
    });
  }
  
  return Response.json({ success: true, count: practices.length });
}
```

### Étape 3: Créer l'API de lecture

```typescript
// GET /api/spiritual-practices
export async function GET() {
  const practices = await db.spiritualPractices.findMany({
    where: { published: true },
    orderBy: { order_index: 'asc' }
  });
  
  return Response.json(practices);
}

// GET /api/spiritual-practices/[slug]
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const practice = await db.spiritualPractices.findUnique({
    where: { slug: params.slug }
  });
  
  return Response.json(practice);
}
```

### Étape 4: Adapter le frontend

Modifiez `app/protected/spiritualite/page.tsx` pour fetcher depuis l'API:

```typescript
'use client';

import { useEffect, useState } from 'react';
import type { SpiritualPracticeDB } from '@/lib/utils/spiritualite-export';

export default function SpiritualitePage() {
  const [practices, setPractices] = useState<SpiritualPracticeDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/spiritual-practices')
      .then(res => res.json())
      .then(data => {
        setPractices(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;

  // Reste du composant identique
  // Les données viennent maintenant de la BDD au lieu du hardcode
}
```

## 🔄 Workflow recommandé

### Phase 1: Setup (Une seule fois)
1. ✅ Créer la table avec le schéma
2. ✅ Insérer les 5 pratiques existantes
3. ✅ Tester les requêtes SQL

### Phase 2: API Backend
1. ⏳ Créer endpoints CRUD pour spiritual_practices
2. ⏳ Ajouter authentification admin
3. ⏳ Implémenter validation des données

### Phase 3: Frontend dynamique
1. ⏳ Modifier page.tsx pour fetcher depuis API
2. ⏳ Ajouter loading states
3. ⏳ Gérer les erreurs

### Phase 4: CMS (Optionnel)
1. ⏳ Interface admin pour créer/éditer pratiques
2. ⏳ Upload d'images associées
3. ⏳ Prévisualisation avant publication

## 📝 Exemples de requêtes SQL

### Récupérer toutes les pratiques publiées
```sql
SELECT * FROM spiritual_practices 
WHERE published = true 
ORDER BY order_index ASC;
```

### Récupérer une pratique par slug
```sql
SELECT * FROM spiritual_practices 
WHERE slug = 'protection';
```

### Compter les pratiques
```sql
SELECT category, COUNT(*) as total
FROM spiritual_practices
GROUP BY category;
```

### Rechercher dans le contenu
```sql
SELECT title, description 
FROM spiritual_practices
WHERE 
  title ILIKE '%protection%' OR
  description ILIKE '%protection%' OR
  key_elements::text ILIKE '%protection%';
```

## 🎨 Icons mapping

Les noms d'icônes référencent `lucide-react`:

| Icon Name | Import |
|-----------|--------|
| BookOpen | `import { BookOpen } from 'lucide-react'` |
| Shield | `import { Shield } from 'lucide-react'` |
| CircleDollarSign | `import { CircleDollarSign } from 'lucide-react'` |
| Feather | `import { Feather } from 'lucide-react'` |
| Sparkle | `import { Sparkle } from 'lucide-react'` |

## 🔒 Sécurité

### Recommandations

1. **Protection admin**: Restreindre `/protected/spiritualite/admin` aux admins
2. **Validation**: Valider tous les inputs avant insertion
3. **Sanitization**: Échapper les caractères spéciaux
4. **Rate limiting**: Limiter les requêtes API
5. **Backup**: Sauvegarder régulièrement la table

### Middleware de protection

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/protected/spiritualite/admin')) {
    const session = await getSession(request);
    
    if (!session?.user?.isAdmin) {
      return NextResponse.redirect(new URL('/protected/profil', request.url));
    }
  }
  
  return NextResponse.next();
}
```

## 📈 Évolutions futures

### Court terme
- [ ] Ajouter champ `image_url` pour illustrations
- [ ] Créer table `practice_categories` pour taxonomie
- [ ] Ajouter traductions multi-langues

### Moyen terme
- [ ] Système de commentaires utilisateurs
- [ ] Notes et favoris par utilisateur
- [ ] Historique des versions (audit trail)

### Long terme
- [ ] Contenu vidéo/audio intégré
- [ ] Parcours d'apprentissage guidés
- [ ] Certifications et achievements

## 🆘 Support

Si vous rencontrez des problèmes:

1. **Vérifiez le schéma**: La table existe-t-elle?
2. **Testez les requêtes**: Les données sont-elles insérées?
3. **Logs**: Consultez les logs PostgreSQL
4. **Types**: Vérifiez la compatibilité TypeScript/SQL

## 🎯 Résumé

**Ce qui est fait**:
✅ Export des 5 pratiques spirituelles complètes
✅ Interface admin avec preview
✅ Support JSON, SQL, SCHEMA
✅ Documentation complète
✅ TypeScript types

**Ce qu'il vous reste à faire**:
⏳ Créer la table PostgreSQL
⏳ Insérer les données
⏳ Créer les endpoints API
⏳ Connecter le frontend à l'API

**Temps estimé**: 2-3 heures pour intégration backend complète
