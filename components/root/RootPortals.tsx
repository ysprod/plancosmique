'use client';

/**
 * Portals pour les modales et toasts
 */
export function RootPortals() {
  return (
    <>
      <div id="modal-root" aria-live="polite" />
      <div id="toast-root" aria-live="assertive" aria-atomic="true" />
    </>
  );
}
