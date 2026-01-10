import { Position } from "../interfaces";

export interface CarteDuCielData {
  sujet: {
    nom: string;
    prenoms: string;
    dateNaissance: string;
    lieuNaissance: string;
    heureNaissance: string;
  };
  positions: Position[];
}

export interface CinqPortes {
  signesolaire: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  ascendant: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  signeLunaire: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  milieuDuCiel: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
  descendant: {
    label: string;
    valeur: string;
    description: string;
    icon: string;
    gradient: string;
  };
}