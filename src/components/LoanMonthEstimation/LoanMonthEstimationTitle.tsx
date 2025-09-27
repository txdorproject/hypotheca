import { DebtRatio } from "@/types/types";
import React from "react";

type LoanMonthEstimationTitleProps = {
  year?: number;
  debtRatio?: DebtRatio | null;
};

const textColorMap: Record<DebtRatio["color"], string> = {
  green: "text-emerald-500",
  orange: "text-amber-500",
  rose: "text-rose-500",
};

function LoanMonthEstimationTitle({
  year,
  debtRatio,
}: LoanMonthEstimationTitleProps) {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl font-bold mb-1.5">{year} ans</p>
      <p
        className={`text-base font-medium ${
          debtRatio ? textColorMap[debtRatio.color] : "text-black"
        }`}
      >
        Endettement du crédit :{" "}
        <span className="font-bold">
          {debtRatio?.percent ? debtRatio?.percent.toFixed(1) : "--"} %
        </span>
      </p>
    </div>
  );
}

export default LoanMonthEstimationTitle;
