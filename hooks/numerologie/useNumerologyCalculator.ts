import { useCallback } from 'react';

export interface NumerologyResult {
  lifePathNumber: number;
  expressionNumber: number;
  soulNumber: number;
  personalityNumber: number;
  birthNumber: number;
  interpretation: string;
}

const reduceToSingleDigit = (num: number): number => {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
};

const letterToNumber = (letter: string): number => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.indexOf(letter.toUpperCase()) + 1;
};

export function useNumerologyCalculator() {
  const calculateNumerology = useCallback((name: string, date: string): NumerologyResult => {
    const dateDigits = date.replace(/-/g, '').split('').map(Number);
    const lifePathSum = dateDigits.reduce((acc, digit) => acc + digit, 0);
    const lifePathNumber = reduceToSingleDigit(lifePathSum);

    const fullName = name.replace(/\s/g, '').toUpperCase();
    const expressionSum = fullName.split('').reduce((acc, letter) => acc + letterToNumber(letter), 0);
    const expressionNumber = reduceToSingleDigit(expressionSum);

    const vowels = 'AEIOUY';
    const soulSum = fullName.split('').reduce((acc, letter) => vowels.includes(letter) ? acc + letterToNumber(letter) : acc, 0);
    const soulNumber = reduceToSingleDigit(soulSum);

    const personalitySum = fullName.split('').reduce((acc, letter) => !vowels.includes(letter) ? acc + letterToNumber(letter) : acc, 0);
    const personalityNumber = reduceToSingleDigit(personalitySum);

    const day = parseInt(date.split('-')[2]);
    const birthNumber = reduceToSingleDigit(day);

    const interpretations: { [key: number]: string } = {
      1: "Leader naturel, indépendant et pionnier",
      2: "Diplomate sensible, coopératif et harmonieux",
      3: "Créatif expressif, communicateur inspirant",
      4: "Bâtisseur pragmatique, organisé et fiable",
      5: "Esprit libre aventureux, adaptable et curieux",
      6: "Âme nourricière, responsable et aimante",
      7: "Chercheur spirituel, analytique et sage",
      8: "Manifesteur puissant, ambitieux et prospère",
      9: "Humaniste compassionnel, altruiste et visionnaire",
      11: "Maître illuminateur, intuitif et spirituel",
      22: "Maître bâtisseur, visionnaire pragmatique",
      33: "Maître guérisseur, amour universel incarné"
    };

    return {
      lifePathNumber,
      expressionNumber,
      soulNumber,
      personalityNumber,
      birthNumber,
      interpretation: interpretations[lifePathNumber] || "Votre chemin unique révèle des potentiels extraordinaires."
    };
  }, []);

  return { calculateNumerology };
}
