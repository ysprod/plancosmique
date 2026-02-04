
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { authService } from "@/lib/api/services/auth.service";

const PROGRESS_INTERVAL = 80;
const PROGRESS_STEP = 12;
const SUCCESS_REDIRECT_DELAY = 1200;
const ERROR_REDIRECT_DELAY = 600;
const MAX_LOGOUT_WAIT = 6000;

export function useLogoutPage() {

  const [status, setStatus] = useState("loading");
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const logoutCompletedRef = useRef(false);

  const cleanup = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const performLogout = async () => {
      try {
        progressIntervalRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
              return 90;
            }
            return Math.min(prev + PROGRESS_STEP, 90);
          });
        }, PROGRESS_INTERVAL);
        errorTimeoutRef.current = setTimeout(() => {
          if (!logoutCompletedRef.current) {
            cleanup();
            setStatus("error");
            redirectTimeoutRef.current = setTimeout(() => {
              window.location.href = "/auth/login";
            }, ERROR_REDIRECT_DELAY);
          }
        }, MAX_LOGOUT_WAIT);
        await authService.logout();
        logoutCompletedRef.current = true;
        cleanup();
        setProgress(100);
        setStatus("success");
        redirectTimeoutRef.current = setTimeout(() => {
          window.location.href = "/auth/login";
        }, SUCCESS_REDIRECT_DELAY);
      } catch (error) {
        cleanup();
        setStatus("error");
        redirectTimeoutRef.current = setTimeout(() => {
          window.location.href = "/auth/login";
        }, ERROR_REDIRECT_DELAY);
      }
    };
    performLogout();
    return cleanup;
  }, [cleanup]);

  return { status, progress };
}
