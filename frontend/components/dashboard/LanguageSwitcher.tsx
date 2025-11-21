"use client";

import { Button } from "@/shared/ui/button";
import { useI18n } from "@/shared/i18n/i18nProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex items-center rounded-full bg-white border border-slate-200 px-1 py-1 text-xs shadow-sm"
      aria-label={t("dashboard.languageSwitcherLabel")}
    >
      <Button
        type="button"
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        className="rounded-full px-3"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </Button>
      <Button
        type="button"
        variant={locale === "cs" ? "default" : "ghost"}
        size="sm"
        className="rounded-full px-3"
        onClick={() => setLocale("cs")}
        aria-pressed={locale === "cs"}
      >
        CS
      </Button>
    </div>
  );
}
