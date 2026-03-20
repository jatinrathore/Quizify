// ============================================================
// ThemeConfig.ts — Centralized Theme Management for Quizify
// ============================================================
// Add a new theme by appending to the `colorThemes` array.
// Each theme needs `light` and `dark` accent variable sets.
// ============================================================

export type ThemeMode = "light" | "dark";
export type ColorThemeId = "indigo" | "emerald" | "sunset" | "purple" | "rose";

export interface ColorThemeDefinition {
  id: ColorThemeId;
  name: string;
  icon: string;
  preview: string; // Main accent color for the preview dot
  light: Record<string, string>;
  dark: Record<string, string>;
}

// ─── MODE VARIABLES (shared across all color themes) ─────────
// These control backgrounds, text, borders, shadows, and semantic colors.

const modeVariables: Record<ThemeMode, Record<string, string>> = {
  light: {
    "--bg-primary": "#f0f4f8",
    "--bg-surface": "#ffffff",
    "--bg-surface-hover": "#f8fafc",
    "--text-primary": "#1e293b",
    "--text-secondary": "#64748b",
    "--text-on-accent": "#ffffff",
    "--text-heading": "#0f172a",
    "--border": "#e2e8f0",
    "--shadow-sm": "0 1px 2px rgba(0,0,0,0.05)",
    "--shadow-md": "0 4px 12px rgba(0,0,0,0.08)",
    "--shadow-lg": "0 10px 25px rgba(0,0,0,0.1)",
    "--shadow-xl": "0 20px 40px rgba(0,0,0,0.12)",
    "--success": "#10b981",
    "--success-bg": "#d1fae5",
    "--error": "#ef4444",
    "--error-bg": "#fee2e2",
    "--warning": "#f59e0b",
    "--warning-bg": "#fef3c7",
    "--slide-general-bg": "linear-gradient(135deg, #f59e0b, #fbbf24)",
    "--slide-web-bg": "linear-gradient(96deg, #06b6d4, #22d3ee)",
  },
  dark: {
    "--bg-primary": "#0f172a",
    "--bg-surface": "#1e293b",
    "--bg-surface-hover": "#334155",
    "--text-primary": "#f1f5f9",
    "--text-secondary": "#94a3b8",
    "--text-on-accent": "#ffffff",
    "--text-heading": "#e2e8f0",
    "--border": "#334155",
    "--shadow-sm": "0 1px 2px rgba(0,0,0,0.2)",
    "--shadow-md": "0 4px 12px rgba(0,0,0,0.3)",
    "--shadow-lg": "0 10px 25px rgba(0,0,0,0.4)",
    "--shadow-xl": "0 20px 40px rgba(0,0,0,0.5)",
    "--success": "#34d399",
    "--success-bg": "#064e3b",
    "--error": "#f87171",
    "--error-bg": "#7f1d1d",
    "--warning": "#fbbf24",
    "--warning-bg": "#78350f",
    "--slide-general-bg": "linear-gradient(135deg, #d97706, #f59e0b)",
    "--slide-web-bg": "linear-gradient(96deg, #0891b2, #06b6d4)",
  },
};

// ─── COLOR THEMES (accent-specific variables) ────────────────
// Each theme defines its accent colors for both light and dark modes.
// To add a new theme, simply append a new object to this array.

const colorThemes: ColorThemeDefinition[] = [
  // ── 1. Ocean Indigo ──────────────────────────────────────────
  {
    id: "indigo",
    name: "Ocean Indigo",
    icon: "🌊",
    preview: "#6366f1",
    light: {
      "--accent": "#6366f1",
      "--accent-hover": "#4f46e5",
      "--accent-light": "#a5b4fc",
      "--accent-secondary": "#06b6d4",
      "--accent-secondary-hover": "#0891b2",
      "--bg-accent-soft": "#e0e7ff",
      "--bg-accent-soft-hover": "#c7d2fe",
      "--border-accent": "#c7d2fe",
      "--gradient-accent": "linear-gradient(135deg, #6366f1, #06b6d4)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #e0e7ff, #cffafe)",
      "--gradient-card": "linear-gradient(135deg, #6366f1, #8b5cf6)",
      "--gradient-surface": "linear-gradient(90deg, #ede9fe, #e0e7ff)",
      "--card-hover-shadow": "0 8px 25px rgba(99, 102, 241, 0.2)",
      "--slide-lang-bg": "linear-gradient(248deg, #6366f1, #818cf8)",
      "--footer-color": "#6366f1",
      "--footer-hover": "#4f46e5",
    },
    dark: {
      "--accent": "#818cf8",
      "--accent-hover": "#6366f1",
      "--accent-light": "#6366f1",
      "--accent-secondary": "#22d3ee",
      "--accent-secondary-hover": "#06b6d4",
      "--bg-accent-soft": "#312e81",
      "--bg-accent-soft-hover": "#3730a3",
      "--border-accent": "#4338ca",
      "--gradient-accent": "linear-gradient(135deg, #818cf8, #22d3ee)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #312e81, #164e63)",
      "--gradient-card": "linear-gradient(135deg, #818cf8, #a78bfa)",
      "--gradient-surface": "linear-gradient(90deg, #1e1b4b, #1e293b)",
      "--card-hover-shadow": "0 8px 25px rgba(129, 140, 248, 0.25)",
      "--slide-lang-bg": "linear-gradient(248deg, #4f46e5, #6366f1)",
      "--footer-color": "#818cf8",
      "--footer-hover": "#a5b4fc",
    },
  },

  // ── 2. Emerald Forest ────────────────────────────────────────
  {
    id: "emerald",
    name: "Emerald Forest",
    icon: "🌿",
    preview: "#10b981",
    light: {
      "--accent": "#10b981",
      "--accent-hover": "#059669",
      "--accent-light": "#6ee7b7",
      "--accent-secondary": "#14b8a6",
      "--accent-secondary-hover": "#0d9488",
      "--bg-accent-soft": "#d1fae5",
      "--bg-accent-soft-hover": "#a7f3d0",
      "--border-accent": "#a7f3d0",
      "--gradient-accent": "linear-gradient(135deg, #10b981, #14b8a6)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #d1fae5, #ccfbf1)",
      "--gradient-card": "linear-gradient(135deg, #10b981, #059669)",
      "--gradient-surface": "linear-gradient(90deg, #ecfdf5, #d1fae5)",
      "--card-hover-shadow": "0 8px 25px rgba(16, 185, 129, 0.2)",
      "--slide-lang-bg": "linear-gradient(248deg, #10b981, #34d399)",
      "--footer-color": "#10b981",
      "--footer-hover": "#059669",
    },
    dark: {
      "--accent": "#34d399",
      "--accent-hover": "#10b981",
      "--accent-light": "#10b981",
      "--accent-secondary": "#2dd4bf",
      "--accent-secondary-hover": "#14b8a6",
      "--bg-accent-soft": "#064e3b",
      "--bg-accent-soft-hover": "#065f46",
      "--border-accent": "#047857",
      "--gradient-accent": "linear-gradient(135deg, #34d399, #2dd4bf)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #064e3b, #134e4a)",
      "--gradient-card": "linear-gradient(135deg, #34d399, #6ee7b7)",
      "--gradient-surface": "linear-gradient(90deg, #022c22, #1e293b)",
      "--card-hover-shadow": "0 8px 25px rgba(52, 211, 153, 0.25)",
      "--slide-lang-bg": "linear-gradient(248deg, #059669, #10b981)",
      "--footer-color": "#34d399",
      "--footer-hover": "#6ee7b7",
    },
  },

  // ── 3. Sunset Orange ─────────────────────────────────────────
  {
    id: "sunset",
    name: "Sunset Orange",
    icon: "🌅",
    preview: "#f97316",
    light: {
      "--accent": "#f97316",
      "--accent-hover": "#ea580c",
      "--accent-light": "#fdba74",
      "--accent-secondary": "#f59e0b",
      "--accent-secondary-hover": "#d97706",
      "--bg-accent-soft": "#ffedd5",
      "--bg-accent-soft-hover": "#fed7aa",
      "--border-accent": "#fed7aa",
      "--gradient-accent": "linear-gradient(135deg, #f97316, #f59e0b)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #ffedd5, #fef3c7)",
      "--gradient-card": "linear-gradient(135deg, #f97316, #ea580c)",
      "--gradient-surface": "linear-gradient(90deg, #fff7ed, #ffedd5)",
      "--card-hover-shadow": "0 8px 25px rgba(249, 115, 22, 0.2)",
      "--slide-lang-bg": "linear-gradient(248deg, #f97316, #fb923c)",
      "--footer-color": "#f97316",
      "--footer-hover": "#ea580c",
    },
    dark: {
      "--accent": "#fb923c",
      "--accent-hover": "#f97316",
      "--accent-light": "#f97316",
      "--accent-secondary": "#fbbf24",
      "--accent-secondary-hover": "#f59e0b",
      "--bg-accent-soft": "#7c2d12",
      "--bg-accent-soft-hover": "#9a3412",
      "--border-accent": "#c2410c",
      "--gradient-accent": "linear-gradient(135deg, #fb923c, #fbbf24)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #7c2d12, #78350f)",
      "--gradient-card": "linear-gradient(135deg, #fb923c, #fdba74)",
      "--gradient-surface": "linear-gradient(90deg, #431407, #1e293b)",
      "--card-hover-shadow": "0 8px 25px rgba(251, 146, 60, 0.25)",
      "--slide-lang-bg": "linear-gradient(248deg, #ea580c, #f97316)",
      "--footer-color": "#fb923c",
      "--footer-hover": "#fdba74",
    },
  },

  // ── 4. Royal Purple ──────────────────────────────────────────
  {
    id: "purple",
    name: "Royal Purple",
    icon: "👑",
    preview: "#8b5cf6",
    light: {
      "--accent": "#8b5cf6",
      "--accent-hover": "#7c3aed",
      "--accent-light": "#c4b5fd",
      "--accent-secondary": "#ec4899",
      "--accent-secondary-hover": "#db2777",
      "--bg-accent-soft": "#ede9fe",
      "--bg-accent-soft-hover": "#ddd6fe",
      "--border-accent": "#ddd6fe",
      "--gradient-accent": "linear-gradient(135deg, #8b5cf6, #ec4899)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #ede9fe, #fce7f3)",
      "--gradient-card": "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      "--gradient-surface": "linear-gradient(90deg, #f5f3ff, #ede9fe)",
      "--card-hover-shadow": "0 8px 25px rgba(139, 92, 246, 0.2)",
      "--slide-lang-bg": "linear-gradient(248deg, #8b5cf6, #a78bfa)",
      "--footer-color": "#8b5cf6",
      "--footer-hover": "#7c3aed",
    },
    dark: {
      "--accent": "#a78bfa",
      "--accent-hover": "#8b5cf6",
      "--accent-light": "#8b5cf6",
      "--accent-secondary": "#f472b6",
      "--accent-secondary-hover": "#ec4899",
      "--bg-accent-soft": "#4c1d95",
      "--bg-accent-soft-hover": "#5b21b6",
      "--border-accent": "#6d28d9",
      "--gradient-accent": "linear-gradient(135deg, #a78bfa, #f472b6)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #4c1d95, #831843)",
      "--gradient-card": "linear-gradient(135deg, #a78bfa, #c4b5fd)",
      "--gradient-surface": "linear-gradient(90deg, #2e1065, #1e293b)",
      "--card-hover-shadow": "0 8px 25px rgba(167, 139, 250, 0.25)",
      "--slide-lang-bg": "linear-gradient(248deg, #7c3aed, #8b5cf6)",
      "--footer-color": "#a78bfa",
      "--footer-hover": "#c4b5fd",
    },
  },

  // ── 5. Rose Garden ───────────────────────────────────────────
  {
    id: "rose",
    name: "Rose Garden",
    icon: "🌹",
    preview: "#f43f5e",
    light: {
      "--accent": "#f43f5e",
      "--accent-hover": "#e11d48",
      "--accent-light": "#fda4af",
      "--accent-secondary": "#fb923c",
      "--accent-secondary-hover": "#f97316",
      "--bg-accent-soft": "#ffe4e6",
      "--bg-accent-soft-hover": "#fecdd3",
      "--border-accent": "#fecdd3",
      "--gradient-accent": "linear-gradient(135deg, #f43f5e, #fb923c)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #ffe4e6, #ffedd5)",
      "--gradient-card": "linear-gradient(135deg, #f43f5e, #e11d48)",
      "--gradient-surface": "linear-gradient(90deg, #fff1f2, #ffe4e6)",
      "--card-hover-shadow": "0 8px 25px rgba(244, 63, 94, 0.2)",
      "--slide-lang-bg": "linear-gradient(248deg, #f43f5e, #fb7185)",
      "--footer-color": "#f43f5e",
      "--footer-hover": "#e11d48",
    },
    dark: {
      "--accent": "#fb7185",
      "--accent-hover": "#f43f5e",
      "--accent-light": "#f43f5e",
      "--accent-secondary": "#fdba74",
      "--accent-secondary-hover": "#fb923c",
      "--bg-accent-soft": "#881337",
      "--bg-accent-soft-hover": "#9f1239",
      "--border-accent": "#be123c",
      "--gradient-accent": "linear-gradient(135deg, #fb7185, #fdba74)",
      "--gradient-accent-subtle": "linear-gradient(135deg, #881337, #7c2d12)",
      "--gradient-card": "linear-gradient(135deg, #fb7185, #fda4af)",
      "--gradient-surface": "linear-gradient(90deg, #4c0519, #1e293b)",
      "--card-hover-shadow": "0 8px 25px rgba(251, 113, 133, 0.25)",
      "--slide-lang-bg": "linear-gradient(248deg, #e11d48, #f43f5e)",
      "--footer-color": "#fb7185",
      "--footer-hover": "#fda4af",
    },
  },
];

// ─── THEME UTILITY FUNCTIONS ─────────────────────────────────

/**
 * Merges mode variables with color theme variables to get the
 * complete set of CSS custom properties for a given combination.
 */
export function getThemeVariables(
  colorThemeId: ColorThemeId,
  mode: ThemeMode
): Record<string, string> {
  const modeVars = modeVariables[mode];
  const colorTheme = colorThemes.find((t) => t.id === colorThemeId);
  if (!colorTheme) return modeVars;
  return { ...modeVars, ...colorTheme[mode] };
}

/**
 * Instantly applies CSS custom properties to :root.
 */
export function applyThemeVariables(variables: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Applies theme with an expanding circular ripple animation
 * originating from the given (x, y) screen coordinates.
 *
 * 1. Creates a fixed overlay colored with `rippleColor`
 * 2. Animates clip-path: circle from 0 to cover full viewport
 * 3. Applies new CSS variables when animation peaks
 * 4. Fades out the overlay to reveal the themed UI
 */
export function applyThemeWithRipple(
  newVariables: Record<string, string>,
  origin: { x: number; y: number },
  rippleColor: string
) {
  // Remove any existing ripple overlay
  const existing = document.getElementById("theme-ripple-overlay");
  if (existing) {
    applyThemeVariables(newVariables);
    existing.remove();
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "theme-ripple-overlay";

  // Calculate the maximum radius needed to cover the entire viewport
  const maxRadius = Math.ceil(
    Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y)
    )
  );

  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    pointer-events: none;
    background: ${rippleColor};
    clip-path: circle(0px at ${origin.x}px ${origin.y}px);
  `;

  document.body.appendChild(overlay);

  // Trigger the expanding circle animation on the next frame
  requestAnimationFrame(() => {
    overlay.style.transition =
      "clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1)";
    overlay.style.clipPath = `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`;
  });

  // When expansion completes, apply new theme and fade out overlay
  const handleExpansionEnd = () => {
    overlay.removeEventListener("transitionend", handleExpansionEnd);
    applyThemeVariables(newVariables);

    // Fade out the overlay
    overlay.style.transition = "opacity 0.25s ease";
    overlay.style.opacity = "0";

    const handleFadeEnd = () => {
      overlay.removeEventListener("transitionend", handleFadeEnd);
      overlay.remove();
    };
    overlay.addEventListener("transitionend", handleFadeEnd);
  };
  overlay.addEventListener("transitionend", handleExpansionEnd);

  // Safety cleanup in case transitionend doesn't fire
  setTimeout(() => {
    if (overlay.parentElement) {
      applyThemeVariables(newVariables);
      overlay.remove();
    }
  }, 1200);
}

export { colorThemes, modeVariables };
