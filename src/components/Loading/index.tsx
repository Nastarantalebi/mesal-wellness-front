export default function LoadingSpin() {
  return (
    <div className="flex flex-col justify-center items-center w-screen gap-4">

      {/* حلقه آسمانی */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>

        {/* موج ماساژ */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></span>
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </div>
        </div>
      </div>

      {/* نام برند */}
      <div className="text-primary font-semibold tracking-wide text-lg">
        مجموعه ماساژ آسمان
      </div>
    </div>
  );
}
