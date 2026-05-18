"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { AbdihakimLandingPage } from "@/features/portfolio-book/AbdihakimLandingPage";

export default function Page() {
  const { theme, toggleTheme } = useTheme();

  return <AbdihakimLandingPage theme={theme} toggleTheme={toggleTheme} />;
}
