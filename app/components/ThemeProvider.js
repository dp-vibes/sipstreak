"use client";
import { useEffect } from "react";
import { getTheme, applyTheme } from "../utils/storage";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    applyTheme(getTheme());
  }, []);
  return children;
}
