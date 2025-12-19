# 💳 Système de Paiement MoneyFusion - Documentation Complète

## 📋 Vue d'ensemble

Ce système fournit une intégration complète et réutilisable avec l'API MoneyFusion pour gérer les paiements dans l'application Mon Étoile.

### 🎯 Caractéristiques

- ✅ **Types TypeScript complets** - Typage strict pour toutes les requêtes/réponses
- ✅ **Service réutilisable** - Logique métier centralisée
- ✅ **Hook React personnalisé** - Gestion d'état simplifiée
- ✅ **Composants UI prêts** - Interface utilisateur cohérente
- ✅ **Gestion des erreurs** - Traitement robuste des erreurs
- ✅ **Validation des données** - Validation automatique des entrées
- ✅ **Auto-vérification** - Vérification automatique au retour
- ✅ **Documentation complète** - Exemples et guides

---

## 🏗️ Architecture

```
types/
  └── moneyfusion.types.ts          # Types TypeScript

lib/
  ├── api/services/
  │   └── moneyfusion.service.ts   # Service API
  └── hooks/
      └── useMoneyFusion.ts         # Hook React

components/
  └── moneyfusion/
      └── PaymentComponents.tsx     # Composants UI
```

---

## 🚀 Installation et Configuration

### 1. Variables d'environnement

Créez ou mettez à jour votre `.env.local` :

```env
# URL de votre backend NestJS
NEXT_PUBLIC_API_URL=http://localhost:3000

# URL de votre application frontend
NEXT_PUBLIC_APP_URL=http://localhost:3002

# Optionnel: ID de service
NEXT_PUBLIC_SERVICE_ID=your_service_id
```

### 2. Configuration MoneyFusion

Le service est pré-configuré avec les URLs par défaut:

```typescript
// Configuration par défaut
const config = {
  apiUrl: 'https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/',
  defaultReturnUrl: 'https://www.monetoile.org/callback',
  defaultWebhookUrl: 'https://www.monetoile.org/api/webhooks/moneyfusion',
};
```

Pour personnaliser:

```typescript
import { moneyFusionService } from '@/lib/api/services/moneyfusion.service';

moneyFusionService.configure({
  apiUrl: 'votre-url-api',
  defaultReturnUrl: 'votre-callback-url',
});
```

---

## 📖 Guide d'utilisation

### Exemple 1: Paiement Simple avec Hook

```tsx
'use client';

import { useMoneyFusion } from '@/lib/hooks/useMoneyFusion';
import { PaymentButton } from '@/components/moneyfusion/PaymentComponents';

export default function SimplePaiement() {
  const { initiatePayment, loading, error } = useMoneyFusion();

  const handlePay = async () => {
    const result = await initiatePayment({
      amount: 5000,
      items: [{ consultation: 5000 }],
      phoneNumber: '0758385387',
      customerName: 'Jean Dupont',
      metadata: {
        userId: 'user123',
        consultationId: 'consult456',
      },
    });

    if (result.success && result.paymentUrl) {
      // Rediriger vers la page de paiement
      window.location.href = result.paymentUrl;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payer votre consultation</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <PaymentButton
        amount={5000}
        onClick={handlePay}
        loading={loading}
        text="Payer la consultation"
      />
    </div>
  );
}
```

### Exemple 2: Paiement avec Modal de Confirmation

```tsx
'use client';

import { useState } from 'react';
import { useMoneyFusion } from '@/lib/hooks/useMoneyFusion';
import { PaymentModal, PaymentButton } from '@/components/moneyfusion/PaymentComponents';

export default function PaiementAvecModal() {
  const [showModal, setShowModal] = useState(false);
  const { initiatePayment, loading, error } = useMoneyFusion();

  const paymentData = {
    amount: 10000,
    items: [
      { name: 'Consultation Tarot', price: 8000 },
      { name: 'Frais de service', price: 2000 },
    ],
    customerName: 'Marie Dubois',
    phoneNumber: '0758385387',
  };

  const handleConfirm = async () => {
    const result = await initiatePayment({
      amount: paymentData.amount,
      items: paymentData.items.map(item => ({ [item.name]: item.price })),
      phoneNumber: paymentData.phoneNumber,
      customerName: paymentData.customerName,
    });

    if (result.success && result.paymentUrl) {
      window.location.href = result.paymentUrl;
    }
  };

  return (
    <>
      <PaymentButton
        amount={paymentData.amount}
        onClick={() => setShowModal(true)}
        text="Procéder au paiement"
      />

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
        amount={paymentData.amount}
        customerName={paymentData.customerName}
        phoneNumber={paymentData.phoneNumber}
        items={paymentData.items}
        loading={loading}
        error={error || undefined}
      />
    </>
  );
}
```

### Exemple 3: Page de Callback avec Vérification Automatique

```tsx
'use client';

import { useMoneyFusionCallback } from '@/lib/hooks/useMoneyFusion';
import { PaymentStatusCard } from '@/components/moneyfusion/PaymentComponents';
import { useRouter } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();

  const { status, paymentDetails, error, loading } = useMoneyFusionCallback({
    onSuccess: (payment) => {
      console.log('Paiement réussi!', payment);
      // Vous pouvez faire un appel API ici pour mettre à jour la consultation
    },
    onError: (error) => {
      console.error('Erreur de paiement:', error);
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PaymentStatusCard status="processing" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <PaymentStatusCard
          status={status}
          message={error || undefined}
          amount={paymentDetails?.montant}
          reference={paymentDetails?.reference}
          action={{
            label: status === 'success' ? 'Voir ma consultation' : 'Réessayer',
            onClick: () => {
              if (status === 'success') {
                router.push('/secured/consultations');
              } else {
                router.push('/secured/paiement');
              }
            },
          }}
        />
      </div>
    </div>
  );
}
```

### Exemple 4: Workflow Complet (comme vie-personnelle)

```tsx
'use client';

import { useState } from 'react';
import { useMoneyFusion } from '@/lib/hooks/useMoneyFusion';
import { api } from '@/lib/api/client';

type Step = 'form' | 'confirm' | 'processing' | 'success';

export default function ConsultationWorkflow() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    dateNaissance: '',
  });
  const [consultationId, setConsultationId] = useState<string | null>(null);

  const { initiatePayment, loading, error } = useMoneyFusion();

  // Étape 1: Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  // Étape 2: Créer la consultation et initier le paiement
  const handlePay = async () => {
    try {
      // 1. Créer la consultation
      const consultationRes = await api.post('/consultations', {
        type: 'VIE_PERSONNELLE',
        formData,
        status: 'pending_payment',
      });

      const createdId = consultationRes.data?.id;
      setConsultationId(createdId);

      // 2. Initier le paiement
      const paymentResult = await initiatePayment({
        amount: 5000,
        items: [{ consultation: 5000 }],
        phoneNumber: '0758385387',
        customerName: `${formData.prenoms} ${formData.nom}`,
        metadata: {
          consultationId: createdId,
          type: 'VIE_PERSONNELLE',
        },
      });

      if (paymentResult.success && paymentResult.paymentUrl) {
        setStep('processing');
        
        // Redirection après un court délai
        setTimeout(() => {
          window.location.href = paymentResult.paymentUrl!;
        }, 1500);
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {step === 'form' && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <h1 className="text-2xl font-bold">Consultation Vie Personnelle</h1>
          
          <input
            type="text"
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <input
            type="text"
            placeholder="Prénoms"
            value={formData.prenoms}
            onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <input
            type="date"
            value={formData.dateNaissance}
            onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold"
          >
            Continuer
          </button>
        </form>
      )}

      {step === 'confirm' && (
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Confirmer le paiement</h2>
          <p>Montant: 5000 FCFA</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={() => setStep('form')}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg"
            >
              Retour
            </button>
            <button
              onClick={handlePay}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold"
            >
              {loading ? 'Traitement...' : 'Payer'}
            </button>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Redirection vers MoneyFusion...</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Composants UI Disponibles

### PaymentButton

Bouton de paiement avec état de chargement:

```tsx
<PaymentButton
  amount={5000}
  onClick={handlePay}
  loading={loading}
  text="Payer maintenant"
  showAmount={true}
  size="lg"
  variant="primary"
/>
```

**Props:**
- `amount` (number) - Montant du paiement
- `onClick` (function) - Fonction appelée au clic
- `loading` (boolean) - État de chargement
- `disabled` (boolean) - Désactiver le bouton
- `text` (string) - Texte du bouton
- `showAmount` (boolean) - Afficher le montant
- `size` ('sm' | 'md' | 'lg') - Taille
- `variant` ('primary' | 'secondary' | 'success') - Style

### PaymentModal

Modal de confirmation de paiement:

```tsx
<PaymentModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handlePay}
  amount={5000}
  customerName="Jean Dupont"
  phoneNumber="0758385387"
  items={[{ name: 'Consultation', price: 5000 }]}
  loading={loading}
  error={error}
/>
```

### PaymentStatusCard

Carte d'affichage du statut:

```tsx
<PaymentStatusCard
  status="success"
  message="Paiement effectué avec succès!"
  amount={5000}
  reference="TRX_123456"
  action={{
    label: 'Continuer',
    onClick: () => router.push('/admin'),
  }}
/>
```

---

## 🔧 API du Service

### moneyFusionService.initiatePayment()

Initie un nouveau paiement:

```typescript
const result = await moneyFusionService.initiatePayment({
  amount: 5000,
  items: [{ consultation: 5000 }],
  phoneNumber: '0758385387',
  customerName: 'Jean Dupont',
  metadata: { consultationId: '123' },
  reference: 'TRX_CUSTOM_REF', // Optionnel
});

if (result.success) {
  console.log('Token:', result.token);
  console.log('URL:', result.paymentUrl);
}
```

### moneyFusionService.verifyPayment()

Vérifie un paiement:

```typescript
const result = await moneyFusionService.verifyPayment(token);

if (result.success && result.status === 'success') {
  console.log('Paiement réussi:', result.payment);
}
```

### Méthodes Utilitaires

```typescript
// Récupérer le token depuis l'URL
const token = moneyFusionService.getTokenFromUrl();

// Nettoyer l'URL
moneyFusionService.cleanUrl();

// Formater un montant
const formatted = moneyFusionService.formatAmount(5000);
// => "5 000 FCFA"

// Générer une URL de callback personnalisée
const callbackUrl = moneyFusionService.generateCallbackUrl({
  consultationId: '123',
  userId: '456',
});
```

---

## 🎣 API du Hook

### useMoneyFusion()

Hook principal avec toutes les fonctionnalités:

```typescript
const {
  // État
  status,          // 'pending' | 'initiated' | 'processing' | 'success' | 'failed' | ...
  token,           // Token de paiement
  paymentUrl,      // URL de redirection
  paymentDetails,  // Détails du paiement vérifié
  loading,         // Chargement en cours
  error,           // Message d'erreur
  
  // Méthodes
  initiatePayment, // Initier un paiement
  verifyPayment,   // Vérifier un paiement
  reset,           // Réinitialiser l'état
  formatAmount,    // Formater un montant
} = useMoneyFusion({
  autoVerify: false,
  onPaymentInitiated: (token, url) => console.log('Initié:', token),
  onPaymentSuccess: (payment) => console.log('Succès:', payment),
  onPaymentFailed: (error) => console.error('Échec:', error),
  onError: (error) => console.error('Erreur:', error),
  cleanUrlAfterVerify: true,
});
```

### useMoneyFusionCallback()

Hook simplifié pour les pages de callback:

```typescript
const { status, paymentDetails, error, loading } = useMoneyFusionCallback({
  onSuccess: (payment) => {
    console.log('Paiement réussi!');
    router.push('/success');
  },
  onError: (error) => {
    console.error('Erreur:', error);
    router.push('/error');
  },
});
```

---

## 🔐 Backend NestJS - Routes Nécessaires

Votre backend doit exposer cette route:

```typescript
// payments.controller.ts
@Post('/payments/moneyfusion/verify')
async verifyPayment(@Body() dto: { token: string }) {
  // Vérifier le paiement auprès de MoneyFusion
  const response = await axios.post(
    'https://verify.moneyfusion.net/api/verify',
    { token: dto.token }
  );

  return {
    status: response.data.status,
    payment: response.data.data,
  };
}
```

---

## 🐛 Gestion des Erreurs

Toutes les erreurs sont capturées et formatées:

```typescript
try {
  const result = await initiatePayment({ ... });
  
  if (!result.success) {
    console.error('Erreur:', result.error);
    // Afficher un message à l'utilisateur
  }
} catch (error) {
  // Cette erreur est déjà gérée par le hook
  console.error('Erreur inattendue:', error);
}
```

Messages d'erreur prédéfinis:

```typescript
import { MONEYFUSION_ERROR_MESSAGES } from '@/types/moneyfusion.types';

// NETWORK_ERROR: 'Erreur de connexion au service de paiement'
// INVALID_PHONE: 'Numéro de téléphone invalide'
// INVALID_AMOUNT: 'Montant invalide'
// TOKEN_EXPIRED: 'Le token de paiement a expiré'
// PAYMENT_FAILED: 'Le paiement a échoué'
// etc.
```

---

## ✅ Checklist d'Intégration

- [ ] Variables d'environnement configurées
- [ ] Backend NestJS avec route `/payments/moneyfusion/verify`
- [ ] Page de callback créée (`/callback`)
- [ ] Test avec montant réel
- [ ] Gestion des erreurs testée
- [ ] Redirection après paiement fonctionnelle
- [ ] Mise à jour de la consultation après paiement

---

## 🎓 Bonnes Pratiques

1. **Toujours créer la consultation AVANT le paiement**
   ```typescript
   const consult = await api.post('/consultations', { ... });
   const payment = await initiatePayment({ 
     metadata: { consultationId: consult.data.id }
   });
   ```

2. **Vérifier le paiement côté serveur (webhook)**
   - Ne jamais faire confiance uniquement au callback frontend
   - Implémenter un webhook pour validation asynchrone

3. **Stocker le token de paiement**
   ```typescript
   await api.patch(`/consultations/${id}`, {
     paymentToken: result.token,
     status: 'pending_payment',
   });
   ```

4. **Gérer les retours utilisateur**
   - Permettre de réessayer en cas d'échec
   - Afficher un message clair en cas d'erreur
   - Conserver l'état du formulaire

---

## 📚 Ressources

- **Types:** `types/moneyfusion.types.ts`
- **Service:** `lib/api/services/moneyfusion.service.ts`
- **Hook:** `lib/hooks/useMoneyFusion.ts`
- **Composants:** `components/moneyfusion/PaymentComponents.tsx`
- **Exemple complet:** `app/secured/vie-personnelle/slidesection/Slide4Section.tsx`

---

**Auteur:** GitHub Copilot  
**Date:** 7 décembre 2024  
**Version:** 1.0.0
