import { useTranslation } from "react-i18next";
import { FormLabel } from "@/components/ui/form";

interface ProviderPresetSelectorProps {
  selectedPresetId: string | null;
  onPresetChange: (value: string) => void;
}

export function ProviderPresetSelector({
  selectedPresetId,
  onPresetChange,
}: ProviderPresetSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <FormLabel>{t("providerPreset.label")}</FormLabel>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onPresetChange("custom")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedPresetId === "custom"
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "bg-accent text-muted-foreground hover:bg-accent/80"
          }`}
        >
          {t("providerPreset.custom")}
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        {t("providerForm.customApiKeyHint", {
          defaultValue: "💡 自定义配置需手动填写所有必要字段",
        })}
      </p>
    </div>
  );
}
