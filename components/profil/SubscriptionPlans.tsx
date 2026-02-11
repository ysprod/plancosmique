'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Check, ArrowRight } from 'lucide-react';
import { UserType } from '@/lib/types/user-profile.types';
import { profileService } from '@/lib/api/services/grade.service';


interface SubscriptionPlan {
  type: UserType;
  name: string;
  price: string;
  priceUSD: string;
  icon: string;
  features: string[];
  recommended?: boolean;
}

const PLANS: SubscriptionPlan[] = [
  {
    type: UserType.BASIQUE,
    name: 'Basique',
    price: 'Gratuit',
    priceUSD: '$0',
    icon: '⭐',
    features: [
      'Accès aux contenus gratuits',
      'Consultations payantes à l\'unité',
      'Historique de vos consultations',
      'Système de grades initiatiques',
      'Notifications personnalisées'
    ]
  },
  {
    type: UserType.PREMIUM,
    name: 'Premium',
    price: '19 900 FCFA',
    priceUSD: '$35',
    icon: '👑',
    recommended: true,
    features: [
      'Tous les avantages Basique',
      'Accès illimité à une rubrique',
      'Valable 12 mois',
      'Badge Premium exclusif',
      'Économies sur vos consultations',
      'Support prioritaire'
    ]
  },
  {
    type: UserType.INTEGRAL,
    name: 'Intégral',
    price: '49 900 FCFA',
    priceUSD: '$90',
    icon: '✨',
    features: [
      'Tous les avantages Premium',
      'Accès illimité à toutes les rubriques',
      'Accès prioritaire aux nouveautés',
      'Badge Intégral exclusif',
      'Valable 12 mois',
      'Support VIP dédié',
      'Cadeaux exclusifs'
    ]
  }
];

interface SubscriptionPlansProps {
  currentType?: UserType;
  onSubscribe?: (type: UserType, rubriqueId?: string) => void;
}

export default function SubscriptionPlans({ currentType = UserType.BASIQUE, onSubscribe }: SubscriptionPlansProps) {
  const [selectedRubrique, setSelectedRubrique] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubscribe = async (planType: UserType) => {
    if (planType === UserType.BASIQUE) return;

    try {
      setLoading(true);
      setError(null);

      if (planType === UserType.PREMIUM && !selectedRubrique) {
        setError('Veuillez sélectionner une rubrique pour l\'abonnement Premium');
        return;
      }

      if (onSubscribe) {
        onSubscribe(planType, selectedRubrique);
      } else {
        // Appel API par défaut
        let subscriptionResponse;
        if (planType === UserType.PREMIUM) {
          subscriptionResponse = await profileService.activateMyPremium(selectedRubrique);
        } else if (planType === UserType.INTEGRAL) {
          await profileService.activateMyIntegral();
        }
        
        // Redirection vers le profil
        window.location.href = `/star/profil?r=${Date.now()}`;
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setError(err.response?.data?.message || 'Erreur lors de la souscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Choisissez votre niveau d'accompagnement
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Progressez sur votre chemin initiatique avec l'offre qui correspond à vos besoins.
          Tous nos abonnements sont valables 12 mois.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-center"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan, index) => {
          const isCurrentPlan = plan.type === currentType;
          const colors = {
            [UserType.BASIQUE]: { bg: 'from-slate-600 to-slate-700', border: 'border-slate-500' },
            [UserType.PREMIUM]: { bg: 'from-purple-600 to-purple-700', border: 'border-purple-500' },
            [UserType.INTEGRAL]: { bg: 'from-amber-600 via-yellow-500 to-amber-600', border: 'border-amber-400' }
          };
          const color = colors[plan.type];

          return (
            <motion.div
              key={plan.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 border-2 ${color.border} ${
                plan.recommended ? 'ring-4 ring-cosmic-purple/50' : ''
              } ${isCurrentPlan ? 'bg-slate-800' : 'bg-slate-900'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cosmic-purple to-cosmic-indigo px-4 py-1 rounded-full text-sm font-semibold text-white">
                    Recommandé
                  </div>
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Actuel
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                {plan.type !== UserType.BASIQUE && (
                  <div className="text-sm text-slate-400">{plan.priceUSD}</div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Sélection de rubrique pour Premium */}
              {plan.type === UserType.PREMIUM && !isCurrentPlan && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Choisir votre rubrique
                  </label>
                  <select
                    value={selectedRubrique}
                    onChange={(e) => setSelectedRubrique(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="astrologie">Astrologie</option>
                    <option value="numerologie">Numérologie</option>
                    <option value="tarot">Tarot</option>
                    <option value="voyance">Voyance</option>
                    <option value="spiritualite">Spiritualité</option>
                  </select>
                </div>
              )}

              <button
                onClick={() => handleSubscribe(plan.type)}
                disabled={loading || isCurrentPlan || plan.type === UserType.BASIQUE}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isCurrentPlan
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : plan.type === UserType.BASIQUE
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${color.bg} text-white hover:scale-105 hover:shadow-lg`
                }`}
              >
                {isCurrentPlan ? (
                  <>
                    <Check className="w-5 h-5" />
                    Votre plan actuel
                  </>
                ) : plan.type === UserType.BASIQUE ? (
                  'Gratuit'
                ) : loading ? (
                  'Chargement...'
                ) : (
                  <>
                    S'abonner
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cosmic-purple" />
          Garanties
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Annulation possible à tout moment
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Paiement sécurisé
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Support client réactif
          </li>
        </ul>
      </div>
    </div>
  );
}
