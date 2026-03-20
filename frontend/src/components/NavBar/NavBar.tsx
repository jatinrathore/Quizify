import { Box } from "@chakra-ui/react";
import LogoutModal from "../LogoutModal";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TokenManager } from "../../services/handleToken";
import useQuestionsStore from "../../store";
import { colorThemes, type ColorThemeId } from "../../ThemeConfig";
import { useState, useRef, useEffect } from "react";
import "./navbar.css";

const NavBar = () => {
  const tokenExists = TokenManager.isToken();
  const navigate = useNavigate();
  const themeMode = useQuestionsStore((s) => s.themeMode);
  const colorTheme = useQuestionsStore((s) => s.colorTheme);
  const toggleThemeMode = useQuestionsStore((s) => s.toggleThemeMode);
  const setColorTheme = useQuestionsStore((s) => s.setColorTheme);

  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleMode = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    toggleThemeMode(origin);
  };

  const handleSelectTheme = (
    themeId: ColorThemeId,
    e: React.MouseEvent
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setColorTheme(themeId, origin);
    setPickerOpen(false);
  };

  return (
    <Box
      borderRadius={10}
      padding="20px 0 20px 20px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow={"var(--shadow-sm)"}
      marginBottom={4}
      gap={2}
      bg="var(--bg-surface)"
      flexWrap="wrap"
    >
      {/* Logo: Text + Icon, themed */}
      <div
        className="navbar-logo-container"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <span className="navbar-logo-icon">
          <HiOutlineLightBulb />
        </span>
        <span className="navbar-logo-text">Quizify</span>
      </div>
      <Box className="navbar-right-box">
        {/* Color Theme Picker */}
        <div className="theme-picker-container" ref={pickerRef}>
          <button
            className="theme-picker-btn"
            onClick={() => setPickerOpen(!pickerOpen)}
            aria-label="Change color theme"
          >
            <IoColorPaletteOutline size={20} />
          </button>

          {pickerOpen && (
            <div className="theme-picker-dropdown">
              <div className="theme-picker-title">Color Theme</div>
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme-option ${colorTheme === theme.id ? "theme-option-active" : ""
                    }`}
                  onClick={(e) => handleSelectTheme(theme.id, e)}
                >
                  <span
                    className="theme-color-dot"
                    style={{ background: theme.preview }}
                  />
                  <span className="theme-option-icon">{theme.icon}</span>
                  <span className="theme-option-name">{theme.name}</span>
                  {colorTheme === theme.id && (
                    <span className="theme-option-check">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="theme-toggle-btn"
          onClick={handleToggleMode}
          aria-label="Toggle dark mode"
        >
          {themeMode === "light" ? (
            <FiMoon size={20} />
          ) : (
            <FiSun size={20} />
          )}
        </button>

        {tokenExists ? (
          <LogoutModal />
        ) : (
          <button
            onClick={() => navigate("/account-manage")}
            style={{ fontWeight: "700" }}
            className="navbar-text"
          >
            Log In
          </button>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
