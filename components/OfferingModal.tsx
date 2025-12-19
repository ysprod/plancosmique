import React from "react";

interface OfferingModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerings: Array<{ id: string; name: string; price: number; quantity: number }>;
  onValidate: (selected: Array<{ id: string; quantity: number }>) => void;
}

export const OfferingModal: React.FC<OfferingModalProps> = ({ isOpen, onClose, offerings, onValidate }) => {
  const [selectedOfferings, setSelectedOfferings] = React.useState<Array<{ id: string; quantity: number }>>([]);

  const handleSelect = (id: string, quantity: number) => {
    setSelectedOfferings((prev) => {
      const exists = prev.find((o) => o.id === id);
      if (exists) {
        return prev.map((o) => (o.id === id ? { ...o, quantity } : o));
      }
      return [...prev, { id, quantity }];
    });
  };

  const handleValidate = () => {
    onValidate(selectedOfferings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Choisissez les éléments pour l'offrande</h2>
        <div className="space-y-4">
          {offerings.map((offering) => (
            <div key={offering.id} className="flex items-center justify-between">
              <span>{offering.name} <span className="text-xs text-gray-500">({offering.price}€)</span></span>
              <input
                type="number"
                min={1}
                value={selectedOfferings.find((o) => o.id === offering.id)?.quantity || offering.quantity}
                onChange={(e) => handleSelect(offering.id, Number(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">Annuler</button>
          <button onClick={handleValidate} className="px-4 py-2 rounded bg-cosmic-500 text-white">Valider</button>
        </div>
      </div>
    </div>
  );
};
