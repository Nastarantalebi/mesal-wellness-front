import React from "react";

interface Transaction {
  name: string;
  symbol: string;
  amount: string;
  type: "buy" | "sell";
  time: string;
  icon: React.ReactNode; // svg یا کامپوننت
}

interface RecentTransactionsProps {
  title?: string;
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  title = "تراکنش‌های اخیر",
  transactions,
}) => {
  return (
    <div>
      <div className="flex items-center h-10">
        <div className="text-base font-medium">{title}</div>
      </div>
      <div className="p-5 mt-3.5 box box--stacked">
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="flex items-center pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
            <div>
              <div className="w-10 h-10 p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  {tx.icon}
                </div>
              </div>
            </div>
            <div className="ms-3.5 w-full">
              <div className="flex items-center w-full">
                <div className="me-4 font-medium">{tx.name}</div>
                <span className="ms-auto font-medium">{tx.amount}</span>
              </div>
              <div className="flex items-center w-full mt-0.5">
                <a
                  href="#"
                  className={`text-xs ${
                    tx.type === "buy" ? "text-primary" : "text-danger"
                  }`}>
                  {tx.type === "buy" ? "خرید" : "فروش"}
                </a>
                <div className="ms-auto text-xs text-slate-500">{tx.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
