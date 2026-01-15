import { Document, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { AnalyseData, Position } from '../interfaces';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import PositionCard from './PositionCard';
import { parseMarkdownContent, splitMarkdownIntoSections } from './analysis-pdf.utils';

interface AnalysisDocumentProps {
  analyse: AnalyseData;
}

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
        <Page key={`positions-${pageIndex}`} size="A4" style={{ padding: 30, backgroundColor: '#fff' }}>
          <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

          <View style={{ marginBottom: 15, padding: 12, backgroundColor: '#f9fafb', borderRadius: 6, borderLeft: '3 solid #8b5cf6' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>
              🌟 Carte du Ciel {positionPages.length > 1 ? `(${pageIndex + 1}/${positionPages.length})` : ''}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4b5563', marginTop: 8, marginBottom: 4 }}>Positions Planétaires</Text>
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
        <Page size="A4" style={{ padding: 30, backgroundColor: '#fff' }}>
          <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

          <View style={{ marginBottom: 15, padding: 12, backgroundColor: '#f9fafb', borderRadius: 6, borderLeft: '3 solid #8b5cf6' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>🔗 Aspects Astrologiques</Text>
            {carteDuCiel.aspectsTexte.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              return (
                <Text key={i} style={{ fontSize: 9, color: '#374151', marginBottom: 4, marginLeft: 10, lineHeight: 1.4 }}>
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
        <Page key={`mission-${sectionIndex}`} size="A4" style={{ padding: 30, backgroundColor: '#fff' }}>
          <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

          {sectionIndex === 0 && (
            <View style={{ marginBottom: 10, padding: 12, backgroundColor: '#f9fafb', borderRadius: 6, borderLeft: '3 solid #8b5cf6' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>
                🎯 {missionDeVie.titre}
              </Text>
            </View>
          )}

          <View style={{ marginBottom: 15, padding: 12, backgroundColor: '#f9fafb', borderRadius: 6, borderLeft: '3 solid #8b5cf6' }}>
            {parseMarkdownContent(section).map((el, idx) => {
              switch (el.type) {
                case 'h1':
                  return <Text key={idx} style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>{el.text}</Text>;
                case 'h2':
                  return <Text key={idx} style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>{el.text}</Text>;
                case 'h3':
                  return <Text key={idx} style={{ fontSize: 12, fontWeight: 'bold', marginTop: 8, marginBottom: 4 }}>{el.text}</Text>;
                case 'li':
                  return <Text key={idx} style={{ fontSize: 9, color: '#374151', marginBottom: 4, marginLeft: 10, lineHeight: 1.4 }}>• {el.text}</Text>;
                case 'bold':
                  return <Text key={idx} style={{ fontWeight: 'bold' }}>{el.text}</Text>;
                case 'text':
                default:
                  return <Text key={idx} style={{ fontSize: 9, color: '#374151', marginBottom: 6 }}>{el.text}</Text>;
              }
            })}
          </View>

          <PageFooter pageNumber={positionPages.length + 1 + sectionIndex + 1} />
        </Page>
      ))}

      {/* PAGE FINALE: Conclusion */}
      <Page size="A4" style={{ padding: 30, backgroundColor: '#fff' }}>
        <PageHeader sujet={carteDuCiel.sujet} dateGeneration={dateGeneration} />

        <View style={{ marginBottom: 15, padding: 12, backgroundColor: '#f9fafb', borderRadius: 6, borderLeft: '3 solid #8b5cf6' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>✨ Conclusion</Text>
          <Text style={{ fontSize: 9, lineHeight: 1.5, color: '#374151', marginBottom: 6 }}>
            Cette analyse astrologique complète vous offre une cartographie détaillée de votre
            potentiel unique. Elle représente un guide pour mieux vous comprendre et orienter
            vos choix de vie en harmonie avec votre nature profonde.
          </Text>
          <Text style={{ fontSize: 9, lineHeight: 1.5, color: '#374151', marginBottom: 6 }}>
            N'oubliez pas que l'astrologie est un outil de connaissance de soi et de développement
            personnel. Vous restez maître de vos décisions et de votre destinée.
          </Text>
          <View style={{ backgroundColor: '#ede9fe', padding: 8, borderRadius: 4, marginVertical: 4 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#4b5563', marginTop: 8, marginBottom: 4 }}>Prochaines Étapes</Text>
            <Text style={{ fontSize: 9, color: '#374151', marginBottom: 4, marginLeft: 10, lineHeight: 1.4 }}>• Relisez régulièrement les sections qui vous interpellent</Text>
            <Text style={{ fontSize: 9, color: '#374151', marginBottom: 4, marginLeft: 10, lineHeight: 1.4 }}>• Notez vos réflexions et synchronicités</Text>
            <Text style={{ fontSize: 9, color: '#374151', marginBottom: 4, marginLeft: 10, lineHeight: 1.4 }}>• Mettez en pratique les conseils progressivement</Text>
            <Text style={{ fontSize: 9, color: '#374151', marginBottom: 4, marginLeft: 10, lineHeight: 1.4 }}>• Consultez un astrologue pour approfondir certains aspects</Text>
          </View>
          <View style={{ marginTop: 20, textAlign: 'center' }}>
            <Text style={{ fontSize: 11, color: '#8b5cf6' }}>
              🌟 Que les étoiles illuminent votre chemin 🌟
            </Text>
          </View>
        </View>

        <View style={{ position: 'absolute', bottom: 20, left: 30, right: 30, textAlign: 'center', fontSize: 8, color: '#9ca3af', borderTop: '1 solid #e5e7eb', paddingTop: 8 }}>
          <Text>Analyse générée par Mon Etoile - Intelligence Astrologique</Text>
          <Text>© {new Date().getFullYear()} Mon Etoile. Tous droits réservés.</Text>
        </View>
      </Page>
    </Document>
  );
};