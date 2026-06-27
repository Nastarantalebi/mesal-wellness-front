import type { TColumns } from "@/types";
import type { ColumnDefinition } from "tabulator-tables";

export function mapFieldsToColumns(
  fields: Record<string, TColumns>,
): ColumnDefinition[] {
  return Object.entries(fields).map(([field, config]) => ({
    title: config.label,
    field: field,
    visible: config.visible,
    headerSort: config.sortable,
    hozAlign: "center",
    vertAlign: "middle",
    headerHozAlign: "center",
    widthShrink: 0,
    widthGrow: 1,
    headerWordWrap: true,
    minWidth: 100,
    resizable: false,
    // اگر نوع خاصی دارید (مثلاً date, number)
    sorter:
      config.type === "number"
        ? "number"
        : config.type === "date"
          ? "date"
          : "string",
  }));
}
