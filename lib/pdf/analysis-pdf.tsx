/**
 * Générateur de PDF pour les analyses astrologiques
 * Adapté à la structure réelle du backend avec support Markdown
 */

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// =====================================================
// TYPES
// =====================================================
interface Position {
  planete?: string;
  astre?: string;
  signe?: string;
  maison?: string | number;
  degre?: number;
  retrograde?: boolean;
}

interface Sujet {
  nom: string;
  prenoms: string;
  dateNaissance: string;
  lieuNaissance: string;
  heureNaissance: string;
}

interface CarteDuCiel {
  sujet: Sujet;
  positions: Position[];
  aspectsTexte: string;
}

interface MissionDeVie {
  titre: string;
  contenu: string; // Markdown
}

interface AnalyseData {
  _id: string;
  carteDuCiel: CarteDuCiel;
  missionDeVie: MissionDeVie;
  dateGeneration: string;
}

interface AnalysisDocumentProps {
  analyse: AnalyseData;
}

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #8b5cf6',
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    borderLeft: '3 solid #8b5cf6',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4b5563',
    marginTop: 8,
    marginBottom: 4,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 6,
  },
  textBold: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
    marginLeft: 10,
    lineHeight: 1.4,
  },
  highlight: {
    backgroundColor: '#ede9fe',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 10,
  },
  positionCard: {
    marginBottom: 3,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderLeft: '2 solid #8b5cf6',
  },
  positionText: {
    fontSize: 8,
    color: '#374151',
    lineHeight: 1.3,
  }
});

// =====================================================
// UTILITAIRES MARKDOWN
// =====================================================

/**
 * Parse le contenu Markdown et le convertit en composants React-PDF
 */
function parseMarkdownContent(content: string): JSX.Element[] {
  if (!content) return [];

  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Ligne vide - skip
    if (!trimmed) {
      continue;
    }

    // Titres H1 (# ...)
    if (trimmed.startsWith('# ')) {
      elements.push(
        <Text key={key++} style={[styles.sectionTitle, { fontSize: 16, marginTop: 10, marginBottom: 10 }]}>
          {trimmed.replace(/^#\s+/, '').replace(/🌌|🎯|🔑|💼|🌟|📈|🩹|🛠️|💫/g, '')}
        </Text>
      );
      continue;
    }

    // Titres H2 (## ...)
    if (trimmed.startsWith('## ')) {
      elements.push(
        <Text key={key++} style={styles.sectionTitle}>
          {trimmed.replace(/^##\s+/, '').replace(/🌌|🎯|🔑|💼|🌟|📈|🩹|🛠️|💫/g, '')}
        </Text>
      );
      continue;
    }

    // Titres H3 (### ...)
    if (trimmed.startsWith('### ')) {
      elements.push(
        <Text key={key++} style={styles.subsectionTitle}>
          {trimmed.replace(/^###\s+/, '')}
        </Text>
      );
      continue;
    }

    // Liste à puces (• ou - ou numérotée)
    if (trimmed.match(/^[•\-\d]+\.?\s+/)) {
      const cleanText = trimmed
        .replace(/^[•\-]\s+/, '')
        .replace(/^\d+\.\s+/, '')
        .replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markers
      
      elements.push(
        <Text key={key++} style={styles.listItem}>
          • {cleanText}
        </Text>
      );
      continue;
    }

    // Texte normal (peut contenir du gras **)
    if (trimmed) {
      // Parse bold text
      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      const hasMultipleParts = parts.length > 1;

      if (hasMultipleParts) {
        elements.push(
          <Text key={key++} style={styles.text}>
            {parts.map((part, idx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <Text key={idx} style={styles.textBold}>
                    {part.replace(/\*\*/g, '')}
                  </Text>
                );
              }
              return <Text key={idx}>{part}</Text>;
            })}
          </Text>
        );
      } else {
        elements.push(
          <Text key={key++} style={styles.text}>
            {trimmed}
          </Text>
        );
      }
    }
  }

  return elements;
}

/**
 * Formate une position planétaire
 */
function formatPosition(pos: Position, index: number): string {
  const name = pos.planete || pos.astre || `Position ${index + 1}`;
  const sign = pos.signe || 'N/A';
  const house = pos.maison !== undefined ? `Maison ${pos.maison}` : '';
  const retro = pos.retrograde ? ' RÉTROGRADE' : '';
  
  return `${name}${retro} en ${sign}${house ? ' - ' + house : ''}`;
}

// =====================================================
// COMPOSANTS
// =====================================================

/**
 * Composant Position Card
 */
const PositionCard: React.FC<{ position: Position; index: number }> = ({ position, index }) => (
  <View style={styles.positionCard}>
    <Text style={styles.positionText}>
      {formatPosition(position, index)}
    </Text>
  </View>
);

/**
 * Composant Header de page
 */
const PageHeader: React.FC<{ sujet: Sujet; dateGeneration: string }> = ({ sujet, dateGeneration }) => (
  <View style={styles.header}>
    <Text style={styles.title}>✨ Analyse Astrologique Complète</Text>
    <Text style={styles.subtitle}>
      {sujet.prenoms.length > 40 ? sujet.prenoms.substring(0, 37) + '...' : sujet.prenoms} {sujet.nom}
    </Text>
    <Text style={styles.subtitle}>
      Né(e) le {sujet.dateNaissance} à {sujet.heureNaissance}
    </Text>
    <Text style={styles.subtitle}>
      {sujet.lieuNaissance}
    </Text>
    <Text style={styles.subtitle}>
      Généré le {new Date(dateGeneration).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })}
    </Text>
  </View>
);

/**
 * Composant Footer de page
 */
const PageFooter: React.FC<{ pageNumber?: number }> = ({ pageNumber }) => (
  <View style={styles.footer}>
    <Text>Mon Etoile - Analyse Astrologique Personnalisée</Text>
    {pageNumber && <Text>Page {pageNumber}</Text>}
  </View>
);

/**
 * Divise le contenu Markdown en sections pour pagination
 */
function splitMarkdownIntoSections(content: string): string[] {
  const sections: string[] = [];
  const lines = content.split('\n');
  let currentSection = '';
  let lineCount = 0;
  const MAX_LINES_PER_SECTION = 35; // Environ 35 lignes par page

  for (const line of lines) {
    currentSection += line + '\n';
    lineCount++;

    // Nouvelle section si on atteint la limite OU si on trouve un titre H1/H2
    const isHeader = line.trim().startsWith('# ') || line.trim().startsWith('## ');
    
    if (lineCount >= MAX_LINES_PER_SECTION || (isHeader && lineCount > 10)) {
      sections.push(currentSection);
      currentSection = '';
      lineCount = 0;
    }
  }

  // Ajouter la dernière section
  if (currentSection.trim()) {
    sections.push(currentSection);
  }

  return sections;
}

// =====================================================
// DOCUMENT PRINCIPAL
// =====================================================

/**
 * Composant principal du document PDF
 */
export const AnalysisDocument: React.FC<AnalysisDocumentProps> = ({ analyse }) => {
  const { carteDuCiel, missionDeVie, dateGeneration } = analyse;

  // Split positions en groupes pour pagination
  const positionsPerPage = 20;
  const positionPages: Position[][] = [];
  for (let i = 0; i < carteDuCiel.positions.length; i += positionsPerPage) {
    positionPages.push(carteDuCiel.positions.slice(i, i + positionsPerPage));
  }

  // Split mission de vie en sections
  const missionSections = splitMarkdownIntoSections(missionDeVie.contenu);

  return (
    <Document>
      {/* PAGE 1: Carte du Ciel - Positions */}
      {positionPages.map((positions, pageIndex) => (
        <Page key={`positions-${pageIndex}`} size="A4" style={styles.page}>
          <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              🌟 Carte du Ciel {positionPages.length > 1 ? `(${pageIndex + 1}/${positionPages.length})` : ''}
            </Text>
            
            <Text style={styles.subsectionTitle}>Positions Planétaires</Text>
            {positions.map((pos, i) => (
              <PositionCard 
                key={i} 
                position={pos} 
                index={pageIndex * positionsPerPage + i} 
              />
            ))}
          </View>

          <PageFooter pageNumber={pageIndex + 1} />
        </Page>
      ))}

      {/* PAGE: Aspects Astrologiques */}
      {carteDuCiel.aspectsTexte && (
        <Page size="A4" style={styles.page}>
          <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔗 Aspects Astrologiques</Text>
            {carteDuCiel.aspectsTexte.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              return (
                <Text key={i} style={styles.listItem}>
                  • {trimmed}
                </Text>
              );
            })}
          </View>

          <PageFooter pageNumber={positionPages.length + 1} />
        </Page>
      )}

      {/* PAGES: Mission de Vie (sections) */}
      {missionSections.map((section, sectionIndex) => (
        <Page key={`mission-${sectionIndex}`} size="A4" style={styles.page}>
          <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

          {sectionIndex === 0 && (
            <View style={[styles.section, { marginBottom: 10 }]}>
              <Text style={[styles.sectionTitle, { fontSize: 16 }]}>
                🎯 {missionDeVie.titre}
              </Text>
            </View>
          )}

          <View style={styles.section}>
            {parseMarkdownContent(section)}
          </View>

          <PageFooter pageNumber={positionPages.length + 1 + sectionIndex + 1} />
        </Page>
      ))}

      {/* PAGE FINALE: Conclusion */}
      <Page size="A4" style={styles.page}>
        <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Conclusion</Text>
          
          <Text style={styles.text}>
            Cette analyse astrologique complète vous offre une cartographie détaillée de votre 
            potentiel unique. Elle représente un guide pour mieux vous comprendre et orienter 
            vos choix de vie en harmonie avec votre nature profonde.
          </Text>

          <Text style={styles.text}>
            N'oubliez pas que l'astrologie est un outil de connaissance de soi et de développement 
            personnel. Vous restez maître de vos décisions et de votre destinée.
          </Text>

          <View style={styles.highlight}>
            <Text style={styles.subsectionTitle}>Prochaines Étapes</Text>
            <Text style={styles.listItem}>• Relisez régulièrement les sections qui vous interpellent</Text>
            <Text style={styles.listItem}>• Notez vos réflexions et synchronicités</Text>
            <Text style={styles.listItem}>• Mettez en pratique les conseils progressivement</Text>
            <Text style={styles.listItem}>• Consultez un astrologue pour approfondir certains aspects</Text>
          </View>

          <View style={{ marginTop: 20, textAlign: 'center' }}>
            <Text style={[styles.text, { fontSize: 11, color: '#8b5cf6' }]}>
              🌟 Que les étoiles illuminent votre chemin 🌟
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Analyse générée par Mon Etoile - Intelligence Astrologique</Text>
          <Text>© {new Date().getFullYear()} Mon Etoile. Tous droits réservés.</Text>
        </View>
      </Page>
    </Document>
  );
};
