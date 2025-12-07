/**
 * Générateur de PDF pour les analyses astrologiques
 * Utilise @react-pdf/renderer pour créer des PDFs élégants
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { AnalyseAstrologique } from '@/types/astrology.types';

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #8b5cf6',
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 3,
  },
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderLeft: '4 solid #8b5cf6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
    marginBottom: 8,
  },
  list: {
    marginLeft: 15,
  },
  listItem: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 5,
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10,
  },
  highlight: {
    backgroundColor: '#ede9fe',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  badge: {
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    padding: 5,
    borderRadius: 4,
    fontSize: 10,
    marginRight: 5,
  },
});

interface PDFDocumentProps {
  analyse: AnalyseAstrologique;
}

/**
 * Composant principal du document PDF
 */
export const AnalysisDocument: React.FC<PDFDocumentProps> = ({ analyse }) => {
  const { carteDuCiel, missionDeVie, talentsNaturels, relations, carriereVocation, spiritualiteCroissance } = analyse;

  return (
    <Document>
      {/* Page 1: Carte du Ciel */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>✨ Analyse Astrologique Complète</Text>
          <Text style={styles.subtitle}>{carteDuCiel.sujet.prenoms} {carteDuCiel.sujet.nom}</Text>
          <Text style={styles.subtitle}>Né(e) le {carteDuCiel.sujet.dateNaissance}</Text>
          <Text style={styles.subtitle}>à {carteDuCiel.sujet.lieuNaissance}</Text>
          <Text style={styles.subtitle}>Généré le {new Date(analyse.dateGeneration).toLocaleDateString('fr-FR')}</Text>
        </View>

        {/* Carte du Ciel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 Carte du Ciel</Text>
          
          <Text style={styles.subsectionTitle}>Positions Planétaires</Text>
          {carteDuCiel.positions.map((pos, i) => (
            <Text key={i} style={styles.listItem}>
              • {pos.planete} en {pos.signe} (Maison {pos.maison})
              {pos.description && ` - ${pos.description}`}
            </Text>
          ))}

          {carteDuCiel.aspectsTexte && (
            <>
              <Text style={styles.subsectionTitle}>Aspects Astrologiques</Text>
              <Text style={styles.text}>{carteDuCiel.aspectsTexte}</Text>
            </>
          )}
        </View>

        <View style={styles.footer}>
          <Text>Mon Etoile - Analyse Astrologique Personnalisée</Text>
          <Text>www.monetoile.com</Text>
        </View>
      </Page>

      {/* Page 2: Mission de Vie */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Mission de Vie</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{missionDeVie.titre}</Text>
          
          <View style={styles.highlight}>
            <Text style={styles.subsectionTitle}>Analyse Karmique</Text>
            <Text style={styles.text}>
              Nœud Nord : {missionDeVie.analyseKarmique.noeudNord.position}
            </Text>
            <Text style={styles.text}>
              {missionDeVie.analyseKarmique.noeudNord.signification}
            </Text>
          </View>

          <Text style={styles.subsectionTitle}>Vocation Publique</Text>
          <Text style={styles.text}>{missionDeVie.vocationPublique.description}</Text>

          <Text style={styles.subsectionTitle}>Synthèse</Text>
          {missionDeVie.synthese.map((point, i) => (
            <Text key={i} style={styles.listItem}>• {point}</Text>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Page 2 - Mission de Vie</Text>
        </View>
      </Page>

      {/* Page 3: Talents Naturels */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>💎 Talents Naturels</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{talentsNaturels.titre}</Text>
          
          <Text style={styles.subsectionTitle}>Intellect & Communication</Text>
          <Text style={styles.text}>{talentsNaturels.intellectCommunication.description}</Text>
          {talentsNaturels.intellectCommunication.talents.map((talent, i) => (
            <Text key={i} style={styles.listItem}>• {talent}</Text>
          ))}

          <Text style={styles.subsectionTitle}>Action & Volonté</Text>
          <Text style={styles.text}>{talentsNaturels.actionVolonte.description}</Text>

          <Text style={styles.subsectionTitle}>Synthèse</Text>
          {talentsNaturels.synthese.map((point, i) => (
            <Text key={i} style={styles.listItem}>• {point}</Text>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Page 3 - Talents Naturels</Text>
        </View>
      </Page>

      {/* Page 4: Relations */}
      {relations && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>❤️ Style Relationnel</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{relations.titre}</Text>
            
            <View style={styles.highlight}>
              <Text style={styles.subsectionTitle}>Style Relationnel</Text>
              <Text style={styles.text}>{relations.styleRelationnel.description}</Text>
            </View>

            <Text style={styles.subsectionTitle}>Synthèse</Text>
            {relations.synthese.map((point, i) => (
              <Text key={i} style={styles.listItem}>• {point}</Text>
            ))}
          </View>

          <View style={styles.footer}>
            <Text>Page 4 - Relations</Text>
          </View>
        </Page>
      )}

      {/* Page 5: Carrière */}
      {carriereVocation && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>💼 Carrière & Vocation</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{carriereVocation.titre}</Text>
            
            <View style={styles.highlight}>
              <Text style={styles.subsectionTitle}>Milieu du Ciel</Text>
              <Text style={styles.text}>{carriereVocation.milieuDuCiel.description}</Text>
            </View>

            <Text style={styles.subsectionTitle}>Domaines Recommandés</Text>
            {carriereVocation.domainesRecommandes.map((domaine, i) => (
              <Text key={i} style={styles.listItem}>• {domaine}</Text>
            ))}

            <Text style={styles.subsectionTitle}>Synthèse</Text>
            {carriereVocation.synthese.map((point, i) => (
              <Text key={i} style={styles.listItem}>• {point}</Text>
            ))}
          </View>

          <View style={styles.footer}>
            <Text>Page 5 - Carrière & Vocation</Text>
          </View>
        </Page>
      )}

      {/* Page 6: Spiritualité */}
      {spiritualiteCroissance && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>🕉️ Chemin Spirituel</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{spiritualiteCroissance.titre}</Text>
            
            <View style={styles.highlight}>
              <Text style={styles.subsectionTitle}>Chemin Spirituel</Text>
              <Text style={styles.text}>{spiritualiteCroissance.cheminSpirituel.description}</Text>
            </View>

            <Text style={styles.subsectionTitle}>Pratiques Recommandées</Text>
            {spiritualiteCroissance.pratiquesRecommandees.map((pratique, i) => (
              <Text key={i} style={styles.listItem}>• {pratique}</Text>
            ))}

            <Text style={styles.subsectionTitle}>Synthèse</Text>
            {spiritualiteCroissance.synthese.map((point, i) => (
              <Text key={i} style={styles.listItem}>• {point}</Text>
            ))}
          </View>

          <View style={styles.footer}>
            <Text>Page 6 - Chemin Spirituel</Text>
          </View>
        </Page>
      )}

      {/* Page finale: Conclusion */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>✨ Conclusion</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            Cette analyse astrologique complète vous offre une cartographie détaillée de votre potentiel unique. 
            Elle représente un guide pour mieux vous comprendre et orienter vos choix de vie en harmonie avec 
            votre nature profonde.
          </Text>

          <Text style={styles.text}>
            N'oubliez pas que l'astrologie est un outil de connaissance de soi et de développement personnel. 
            Vous restez maître de vos décisions et de votre destinée.
          </Text>

          <View style={styles.highlight}>
            <Text style={styles.subsectionTitle}>Prochaines Étapes</Text>
            <Text style={styles.listItem}>• Relisez régulièrement les sections qui vous interpellent</Text>
            <Text style={styles.listItem}>• Notez vos réflexions et synchronicités</Text>
            <Text style={styles.listItem}>• Mettez en pratique les conseils progressivement</Text>
            <Text style={styles.listItem}>• Consultez un astrologue pour approfondir certains aspects</Text>
          </View>

          <Text style={[styles.text, { marginTop: 20, textAlign: 'center', fontSize: 12 }]}>
            🌟 Que les étoiles illuminent votre chemin 🌟
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Analyse générée par Mon Etoile - Intelligence Astrologique</Text>
          <Text>© {new Date().getFullYear()} Mon Etoile. Tous droits réservés.</Text>
        </View>
      </Page>
    </Document>
  );
};
