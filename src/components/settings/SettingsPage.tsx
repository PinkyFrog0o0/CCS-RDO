import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { LanguageSettings } from "@/components/settings/LanguageSettings";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { AppVisibilitySettings } from "@/components/settings/AppVisibilitySettings";
import { AboutSection } from "@/components/settings/AboutSection";
import { useSettings } from "@/hooks/useSettings";
import { useTranslation } from "react-i18next";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: string;
}

export function SettingsPage({
  open,
  defaultTab = "general",
}: SettingsDialogProps) {
  const { t } = useTranslation();
  const {
    settings,
    isLoading,
    isPortable,
    updateSettings,
    autoSaveSettings,
  } = useSettings();

  const [activeTab, setActiveTab] = useState<string>("general");

  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  const handleAutoSave = useCallback(
    async (updates: Record<string, unknown>) => {
      if (!settings) return;
      updateSettings(updates);
      try {
        await autoSaveSettings(updates);
      } catch (error) {
        console.error("[SettingsPage] Failed to autosave settings", error);
        toast.error(
          t("settings.saveFailedGeneric", {
            defaultValue: "保存失败，请重试",
          }),
        );
      }
    },
    [autoSaveSettings, settings, t, updateSettings],
  );

  const isBusy = useMemo(() => isLoading && !settings, [isLoading, settings]);

  return (
    <div className="flex flex-col h-full overflow-hidden px-6">
      {isBusy ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : settings ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 space-y-6">
          <LanguageSettings
            value={settings.language}
            onChange={(lang) => handleAutoSave({ language: lang })}
          />
          <ThemeSettings />
          <AppVisibilitySettings
            settings={settings}
            onChange={handleAutoSave}
          />
          <AboutSection isPortable={isPortable} />
        </div>
      ) : null}
    </div>
  );
}
