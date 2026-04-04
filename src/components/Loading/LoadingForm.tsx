import { useAuthStore } from "@/features/auth/store/authStore";

type Props = {
  text?: string;
};

export default function LoadingForm({ text }: Props) {
  const organization = useAuthStore((s) => s.userData?.organization);
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center w-full h-auto gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>

        {/* موج ماساژ */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></span>
            <span
              className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.15s" }}></span>
            <span
              className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}></span>
          </div>
        </div>
      </div>

      {/* نام برند */}
      <div className="text-primary font-semibold tracking-wide text-lg">
        {organization?.title ?? text}
      </div>
    </div>
  );
}
