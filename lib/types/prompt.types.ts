export interface PromptSection {
  title: string;
  content: string;
  guidelines?: string[];
}

export interface PromptStructure {
  introduction?: string;
  sections: PromptSection[];
  synthesis?: string;
  conclusion?: string;
}

export interface Prompt {
  _id: string;
  title: string;
  description?: string;
  role: string;
  objective: string;
  styleAndTone?: string[];
  structure: PromptStructure;
  variables?: Record<string, string>;
  tags?: string[];
  isActive: boolean;
  choiceId: string; // ID du choix de consultation (relation 1:1 obligatoire)
  createdAt: string;
  updatedAt: string;
}

export interface PromptWithUsage extends Prompt {
  usageCount?: number;
  consultationChoices?: Array<{
    _id: string;
    title: string;
    rubriqueTitle?: string;
  }>;
}

export interface CreatePromptDto {
  title: string;
  description?: string;
  prompt?: string;  
  choiceId?: string;
}

export interface UpdatePromptDto extends Partial<CreatePromptDto> { }