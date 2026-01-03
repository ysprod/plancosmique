/**
 * Script de migration pour la base de données Mon Étoile
 * 
 * Ce script:
 * 1. Insère les 18 offrandes dans la collection `offerings`
 * 2. Crée les collections manquantes
 * 3. Ajoute les indexes nécessaires
 * 4. Met à jour les consultations existantes avec les nouveaux champs
 * 
 * Usage:
 *   node scripts/migrate-database.js
 */

import { OFFRANDES_CATALOGUE } from '../lib/config/offrandes.config.js';

// Configuration MongoDB (à adapter selon votre environnement)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/monetoile';

/**
 * 1. Migration des offrandes
 */
async function migrateOfferings(db) {
  console.log('📦 Migration des offrandes...');
  
  const offeringsCollection = db.collection('offerings');
  
  // Vérifier si des offrandes existent déjà
  const existingCount = await offeringsCollection.countDocuments();
  
  if (existingCount > 0) {
    console.log(`⚠️  ${existingCount} offrandes existent déjà`);
    console.log('Voulez-vous les remplacer? (y/n)');
    // TODO: Ajouter prompt utilisateur
    return;
  }
  
  // Insérer les offrandes
  const offeringsToInsert = OFFRANDES_CATALOGUE.map(offering => ({
    ...offering,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  const result = await offeringsCollection.insertMany(offeringsToInsert);
  
  console.log(`✅ ${result.insertedCount} offrandes insérées`);
  
  // Créer index sur id et category
  await offeringsCollection.createIndex({ id: 1 }, { unique: true });
  await offeringsCollection.createIndex({ category: 1 });
  await offeringsCollection.createIndex({ isActive: 1 });
  
  console.log('✅ Index créés sur offerings');
}

/**
 * 2. Créer la collection user_wallets
 */
async function createUserWalletsCollection(db) {
  console.log('💼 Création de la collection user_wallets...');
  
  const collections = await db.listCollections({ name: 'user_wallets' }).toArray();
  
  if (collections.length > 0) {
    console.log('⚠️  Collection user_wallets existe déjà');
    return;
  }
  
  await db.createCollection('user_wallets');
  
  const walletCollection = db.collection('user_wallets');
  
  // Créer indexes
  await walletCollection.createIndex({ userId: 1 }, { unique: true });
  await walletCollection.createIndex({ 'offerings.offeringId': 1 });
  
  console.log('✅ Collection user_wallets créée');
}

/**
 * 3. Créer la collection user_carts
 */
async function createUserCartsCollection(db) {
  console.log('🛒 Création de la collection user_carts...');
  
  const collections = await db.listCollections({ name: 'user_carts' }).toArray();
  
  if (collections.length > 0) {
    console.log('⚠️  Collection user_carts existe déjà');
    return;
  }
  
  await db.createCollection('user_carts');
  
  const cartCollection = db.collection('user_carts');
  
  // Créer indexes
  await cartCollection.createIndex({ userId: 1 });
  await cartCollection.createIndex({ status: 1 });
  await cartCollection.createIndex({ createdAt: -1 });
  
  console.log('✅ Collection user_carts créée');
}

/**
 * 4. Mettre à jour la collection consultations
 */
async function updateConsultationsCollection(db) {
  console.log('📝 Mise à jour de la collection consultations...');
  
  const consultationsCollection = db.collection('consultations');
  
  // Ajouter les nouveaux champs aux consultations existantes
  const updateResult = await consultationsCollection.updateMany(
    { consultationChoiceId: { $exists: false } },
    {
      $set: {
        consultationChoiceId: '',
        consultationTitle: '',
        rubrique: '',
        sousRubrique: '',
        generatedAt: null,
        modifiedAt: null,
        sentAt: null,
        generationMetadata: null,
        modifications: []
      }
    }
  );
  
  console.log(`✅ ${updateResult.modifiedCount} consultations mises à jour`);
  
  // Créer indexes
  await consultationsCollection.createIndex({ consultationChoiceId: 1 });
  await consultationsCollection.createIndex({ rubrique: 1 });
  await consultationsCollection.createIndex({ sousRubrique: 1 });
  await consultationsCollection.createIndex({ status: 1 });
  await consultationsCollection.createIndex({ clientId: 1 });
  await consultationsCollection.createIndex({ createdAt: -1 });
  
  console.log('✅ Index créés sur consultations');
}

/**
 * 5. Créer la collection rubriques
 */
async function createRubriquesCollection(db) {
  console.log('📚 Création de la collection rubriques...');
  
  const collections = await db.listCollections({ name: 'rubriques' }).toArray();
  
  if (collections.length > 0) {
    console.log('⚠️  Collection rubriques existe déjà');
    return;
  }
  
  await db.createCollection('rubriques');
  
  const rubriquesCollection = db.collection('rubriques');
  
  // Créer indexes
  await rubriquesCollection.createIndex({ id: 1 }, { unique: true });
  await rubriquesCollection.createIndex({ categorie: 1 });
  
  console.log('✅ Collection rubriques créée');
}

/**
 * 6. Créer la collection transactions_history
 */
async function createTransactionsHistoryCollection(db) {
  console.log('💳 Création de la collection transactions_history...');
  
  const collections = await db.listCollections({ name: 'transactions_history' }).toArray();
  
  if (collections.length > 0) {
    console.log('⚠️  Collection transactions_history existe déjà');
    return;
  }
  
  await db.createCollection('transactions_history');
  
  const transactionsCollection = db.collection('transactions_history');
  
  // Créer indexes
  await transactionsCollection.createIndex({ userId: 1 });
  await transactionsCollection.createIndex({ transactionType: 1 });
  await transactionsCollection.createIndex({ createdAt: -1 });
  await transactionsCollection.createIndex({ status: 1 });
  
  console.log('✅ Collection transactions_history créée');
}

/**
 * 7. Vérifier l'intégrité des données
 */
async function verifyDataIntegrity(db) {
  console.log('🔍 Vérification de l\'intégrité des données...');
  
  const offeringsCount = await db.collection('offerings').countDocuments();
  const consultationsCount = await db.collection('consultations').countDocuments();
  const usersCount = await db.collection('users').countDocuments();
  
  console.log('\n📊 Statistiques de la base de données:');
  console.log(`   - Offrandes: ${offeringsCount}`);
  console.log(`   - Consultations: ${consultationsCount}`);
  console.log(`   - Utilisateurs: ${usersCount}`);
  
  // Vérifier que toutes les offrandes sont présentes
  if (offeringsCount !== 18) {
    console.warn(`⚠️  Attention: ${offeringsCount} offrandes trouvées, 18 attendues`);
  } else {
    console.log('✅ Toutes les offrandes sont présentes');
  }
  
  // Vérifier les offrandes orphelines dans les consultations
  const consultations = await db.collection('consultations')
    .find({ 'offeringsUsed.0': { $exists: true } })
    .toArray();
  
  let orphanCount = 0;
  for (const consultation of consultations) {
    for (const offering of consultation.offeringsUsed || []) {
      const exists = await db.collection('offerings')
        .findOne({ _id: offering.offeringId });
      
      if (!exists) {
        orphanCount++;
        console.warn(`⚠️  Offrande orpheline dans consultation ${consultation._id}: ${offering.offeringId}`);
      }
    }
  }
  
  if (orphanCount === 0) {
    console.log('✅ Aucune offrande orpheline détectée');
  } else {
    console.warn(`⚠️  ${orphanCount} offrandes orphelines détectées`);
  }
}

/**
 * Fonction principale de migration
 */
async function runMigration() {
  console.log('🚀 Démarrage de la migration de la base de données Mon Étoile\n');
  
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connecté à MongoDB\n');
    
    const db = client.db();
    
    // Exécuter les migrations
    await migrateOfferings(db);
    await createUserWalletsCollection(db);
    await createUserCartsCollection(db);
    await updateConsultationsCollection(db);
    await createRubriquesCollection(db);
    await createTransactionsHistoryCollection(db);
    await verifyDataIntegrity(db);
    
    console.log('\n✅ Migration terminée avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n👋 Déconnecté de MongoDB');
  }
}

// Exécuter la migration si ce script est appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration();
}

export { runMigration };
