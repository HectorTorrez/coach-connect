"use client";

import {createContext, useContext, useEffect, useState} from "react";

interface MetricContext {
  metric: "lbs" | "kg";
  handleChangeMetric: (value: string) => void;
}
const MetricContext = createContext<MetricContext>({
  metric: "kg",
  handleChangeMetric: () => {},
});

export function MetricProvider({children}: {children: React.ReactNode}) {
  const [metric, setMetric] = useState<"lbs" | "kg">("kg");

  const handleChangeMetric = (value: string) => {
    setMetric(value as "lbs" | "kg");
  };

  useEffect(() => {
    localStorage.setItem("metric", metric ?? "kg");
  }, [metric]);

  useEffect(() => {
    // const localMetric = localStorage.getItem("metric") as "lbs" | "kg";

    // return localMetric;

    const localMetric = localStorage.getItem("metric") as "lbs" | "kg";

    setMetric(localMetric);
  }, []);

  return (
    <MetricContext.Provider value={{metric, handleChangeMetric}}>{children}</MetricContext.Provider>
  );
}

export const useMetric = () => useContext(MetricContext);
