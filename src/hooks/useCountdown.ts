"use client";

import { useState, useEffect, useCallback } from "react";

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  mounted: boolean;
};

export function useCountdown(targetDate: Date): CountdownValues {
  const calculate = useCallback((): Omit<CountdownValues, "mounted"> => {
    const now = Date.now();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState<Omit<CountdownValues, "mounted">>(
    () => calculate()
  );

  useEffect(() => {
    setMounted(true);
    setCountdown(calculate());

    const interval = setInterval(() => {
      setCountdown(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculate]);

  return { ...countdown, mounted };
}
