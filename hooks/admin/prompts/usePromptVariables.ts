import { useCallback } from 'react';

export function usePromptVariables(variables: Record<string, string>, setVariables: (data: Record<string, string>) => void) {
  const addVariable = useCallback((key: string, desc: string) => {
    setVariables({ ...variables, [key]: desc });
  }, [setVariables, variables]);

  const removeVariable = useCallback((key: string) => {
    const { [key]: _, ...rest } = variables;
    setVariables(rest);
  }, [setVariables, variables]);

  return { addVariable, removeVariable };
}