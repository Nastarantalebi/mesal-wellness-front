import type { ColumnDefinition } from "tabulator-tables";
import type { TColumns } from "../../types";

export function mapFieldsToColumns(
  fields: Record<string, TColumns>
): ColumnDefinition[] {
  return Object.entries(fields).map(([field, config]) => ({
    title: config.label,
    field: field,
    visible: config.visible,
    headerSort: config.sortable,
    hozAlign: "center",
    vertAlign: "middle",
    // اگر نوع خاصی دارید (مثلاً date, number)
    sorter:
      config.type === "number"
        ? "number"
        : config.type === "date"
        ? "date"
        : "string",
  }));
}
