import { useCallback } from 'react';

export function usePromptStructure(structure: any, setStructure: (data: any) => void) {
  const addSection = useCallback(() => {
    setStructure((prev: any) => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '', guidelines: [] }]
    }));
  }, [setStructure]);

  const updateSection = useCallback((index: number, field: string, value: any) => {
    setStructure((prev: any) => ({
      ...prev,
      sections: prev.sections.map((s: any, i: number) =>
        i === index ? { ...s, [field]: value } : s
      )
    }));
  }, [setStructure]);

  const removeSection = useCallback((index: number) => {
    setStructure((prev: any) => ({
      ...prev,
      sections: prev.sections.filter((_: any, i: number) => i !== index)
    }));
  }, [setStructure]);

  return { addSection, updateSection, removeSection };
}