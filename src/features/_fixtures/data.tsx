import type { TOption } from "@/types";

function generateHalfHourTimes(start: string, end: string): TOption[] {
  const times: TOption[] = [];
  let [h, m] = start.split(":").map(Number);

  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    times.push({ label: `ساعت ${hh}:${mm}`, value: `${hh}:${mm}` });

    m += 30;
    if (m >= 60) {
      h += 1;
      m = 0;
    }
  }

  return times;
}

export const start_time: TOption[] = generateHalfHourTimes("08:00", "21:30");
export const end_time: TOption[] = generateHalfHourTimes("08:30", "22:00");
