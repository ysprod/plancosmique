import { AnalysisProgressData } from '../components/callback/types';
import { useEffect, useState, useRef } from 'react';
 

interface UseAnalysisProgressReturn {
  progress: number;
  stage: string;
  stageIndex: number;
  message: string;
  completed: boolean;
  error: string | null;
  isConnected: boolean;
}

/**
 * Hook pour suivre la progression de génération d'analyse en temps réel via SSE
 * 
 * @param consultationId - ID de la consultation à suivre
 * @param enabled - Activer/désactiver la connexion SSE
 * @returns État de la progression en temps réel
 */
export function useAnalysisProgress(
  consultationId: string | null,
  enabled: boolean = false
): UseAnalysisProgressReturn {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('init');
  const [stageIndex, setStageIndex] = useState(0);
  const [message, setMessage] = useState('Préparation...');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000;

  useEffect(() => {
    // Ne pas se connecter si désactivé ou pas d'ID
    if (!enabled || !consultationId) {
      return;
    }

    let isMounted = true;

    const connect = () => {
      try {
        // Construire l'URL SSE
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/v1/analysis/progress/${consultationId}`;


        // Créer l'EventSource
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        // Event: Connexion établie
        eventSource.onopen = () => {
          if (!isMounted) return;
          
 
          setIsConnected(true);
          setError(null);
          reconnectAttemptsRef.current = 0;
        };

        // Event: Message de progression reçu
        eventSource.onmessage = (event) => {
          if (!isMounted) return;

          try {
            const data: AnalysisProgressData = JSON.parse(event.data);
            
  

            setProgress(data.progress);
            setStage(data.stage);
            setStageIndex(data.stageIndex);
            setMessage(data.message);
            setCompleted(data.completed);

            // Fermer la connexion si terminé
            if (data.completed) {
    
              eventSource.close();
            }
          } catch (err) {
            console.error('❌ Erreur parsing SSE:', err);
          }
        };

        // Event: Erreur de connexion
        eventSource.onerror = (err) => {
          console.error('❌ Erreur SSE:', err);
          
          eventSource.close();
          
          if (!isMounted) return;

          setIsConnected(false);

          // Tentative de reconnexion avec backoff exponentiel
          if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current++;
            const delay = RECONNECT_DELAY * reconnectAttemptsRef.current;
                        
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted && !completed) {
                connect();
              }
            }, delay);
          } else {
            setError('Impossible de se connecter au serveur après plusieurs tentatives');
          }
        };

      } catch (err: any) {
        console.error('❌ Erreur création EventSource:', err);
        setError(err.message);
      }
    };

    // Démarrer la connexion
    connect();

    // Cleanup
    return () => {
      isMounted = false;
      
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [consultationId, enabled, completed]);

  return {
    progress,
    stage,
    stageIndex,
    message,
    completed,
    error,
    isConnected,
  };
}