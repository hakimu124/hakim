"use client";

import React, { useEffect } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { AbdihakimLandingPage } from "@/features/portfolio-book/AbdihakimLandingPage";

export default function Page() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <AbdihakimLandingPage theme={theme} toggleTheme={toggleTheme} />;
}
