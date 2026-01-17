import { useState, useCallback } from "react";

export function useCollapsibleState(initialOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, toggle };
}
