import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const CTASection = () => {
  return (
    <div>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-green-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-200">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-8 shadow-xl">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              آماده تحول در مدیریت مرکز خود هستید؟
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              همین امروز به هزاران مرکز موفق بپیوندید که با پالیز، مدیریت را به
              آرامش تبدیل کرده‌اند
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 shadow-xl shadow-green-200 text-lg h-14"
              >
                شروع رایگان ۱۴ روزه
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-10 text-lg h-14"
              >
                درخواست مشاوره
              </Button>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              بدون نیاز به کارت بانکی • لغو در هر زمان • پشتیبانی اختصاصی
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
