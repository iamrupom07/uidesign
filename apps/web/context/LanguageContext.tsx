"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface LanguageOption {
  code: string;
  country: string;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", country: "US", name: "English", nativeName: "English" },
  { code: "es", country: "ES", name: "Spanish", nativeName: "Español" },
  { code: "de", country: "DE", name: "German", nativeName: "Deutsch" },
  { code: "fr", country: "FR", name: "French", nativeName: "Français" },
  { code: "pt", country: "PT", name: "Portuguese", nativeName: "Português" },
  { code: "it", country: "IT", name: "Italian", nativeName: "Italiano" },
  { code: "ja", country: "JP", name: "Japanese", nativeName: "日本語" },
  { code: "zh-CN", country: "CN", name: "Chinese", nativeName: "中文" },
  { code: "ar", country: "SA", name: "Arabic", nativeName: "العربية" },
  { code: "ru", country: "RU", name: "Russian", nativeName: "Русский" },
  { code: "bn", country: "BD", name: "Bengali", nativeName: "বাংলা" },
  { code: "hi", country: "IN", name: "Hindi", nativeName: "हिन्दी" },
  { code: "tr", country: "TR", name: "Turkish", nativeName: "Türkçe" },
  { code: "nl", country: "NL", name: "Dutch", nativeName: "Nederlands" },
  { code: "ko", country: "KR", name: "Korean", nativeName: "한국어" },
];

interface LanguageContextProps {
  language: string;
  currentLangObj: LanguageOption;
  setLanguage: (langCode: string) => void;
  t: (text: string) => string;
}

const defaultLangObj = LANGUAGES[0];

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  currentLangObj: defaultLangObj,
  setLanguage: () => {},
  t: (text) => text,
});

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>("en");

  const currentLangObj =
    LANGUAGES.find(
      (l) =>
        l.code.toLowerCase() === language.toLowerCase() ||
        l.code.split("-")[0].toLowerCase() === language.toLowerCase()
    ) || defaultLangObj;

  const triggerGoogleTranslate = (targetCode: string) => {
    // Set google translate cookies
    const host = window.location.hostname;
    document.cookie = `googtrans=/en/${targetCode}; path=/;`;
    if (host) {
      document.cookie = `googtrans=/en/${targetCode}; path=/; domain=${host};`;
      document.cookie = `googtrans=/en/${targetCode}; path=/; domain=.${host};`;
    }

    // Try setting the select combo element directly if initialized
    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (combo) {
      combo.value = targetCode;
      combo.dispatchEvent(new Event("change"));
    } else {
      // If combo not ready yet, reloading page will load with updated googtrans cookie
      window.location.reload();
    }
  };

  useEffect(() => {
    // Check saved language or cookie
    const saved = localStorage.getItem("app_lang");
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    };
    const googCookie = getCookie("googtrans");

    let initialLang = "en";
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      initialLang = saved;
    } else if (googCookie) {
      const parts = googCookie.split("/");
      const cookieLang = parts[parts.length - 1];
      const found = LANGUAGES.find(
        (l) => l.code === cookieLang || l.code.split("-")[0] === cookieLang
      );
      if (found) initialLang = found.code;
    }

    setLanguageState(initialLang);

    // Initialize Google Translate script
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const setLanguage = (langCode: string) => {
    const target = LANGUAGES.find((l) => l.code === langCode) || defaultLangObj;
    setLanguageState(target.code);
    localStorage.setItem("app_lang", target.code);
    triggerGoogleTranslate(target.code);
  };

  const t = (text: string): string => text;

  return (
    <LanguageContext.Provider value={{ language, currentLangObj, setLanguage, t }}>
      {/* Hidden element required for Google Translate engine */}
      <div id="google_translate_element" className="hidden" style={{ display: "none" }} />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
