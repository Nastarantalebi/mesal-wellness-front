import { create } from "zustand";
import { persist } from "zustand/middleware";

type OtpPhase = "idle" | "code_sent" | "verifying" | "verified";

interface OtpState {
  mobile: string | null; // شماره‌ای که براش OTP فرستادیم
  expiresAtMs: number | null; // زمان انقضا (ms)
  phase: OtpPhase;
  // محاسبات
  remainingSeconds: () => number;
  isExpired: () => boolean;

  // اکشن‌ها
  start: (args: {
    mobile: string;
    otp_expire: string;
    is_used: boolean;
  }) => void;
  setVerifying: () => void;
  setVerified: () => void;
  reset: () => void;
}

export const useOtpStore = create<OtpState>()(
  persist(
    (set, get) => ({
      mobile: null,
      expiresAtMs: null,
      phase: "idle",

      start: ({ mobile, otp_expire }) => {
        // otp_expire از سرور (ایزو/رشته datetime) → ms
        const expiresAtMs = new Date(otp_expire).getTime();
        set({ mobile, expiresAtMs, phase: "code_sent" });
      },

      remainingSeconds: () => {
        const { expiresAtMs } = get();
        if (!expiresAtMs) return 0;
        const now = Date.now();
        return Math.max(0, Math.ceil((expiresAtMs - now) / 1000));
      },

      isExpired: () => get().remainingSeconds() === 0,

      setVerifying: () => set({ phase: "verifying" }),
      setVerified: () => set({ phase: "verified" }),

      reset: () => set({ mobile: null, expiresAtMs: null, phase: "idle" }),
    }),
    {
      name: "otp_v1",
      partialize: (s) => ({
        mobile: s.mobile,
        expiresAtMs: s.expiresAtMs,
        phase: s.phase,
      }),
    }
  )
);
