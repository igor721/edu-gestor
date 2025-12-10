import React, { createContext, useContext, useMemo, useState } from "react";

const SettingsContext = createContext({ compact: false, setCompact: () => {} });

export function SettingsProvider({ children }) {
  const [compact, setCompact] = useState(false);
  const value = useMemo(() => ({ compact, setCompact }), [compact]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
