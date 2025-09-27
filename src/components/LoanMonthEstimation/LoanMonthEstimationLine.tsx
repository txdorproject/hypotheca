import React from "react";

type LoanMonthEstimationLineProps = {
  text: string;
  value: number;
  needToBeStrong?: boolean;
  customStyle?: string;
};

function LoanMonthEstimationLine({
  text,
  value,
  needToBeStrong = false,
  customStyle = "",
}: LoanMonthEstimationLineProps) {
  return (
    <div className={`flex justify-between py-2 ${customStyle}`}>
      <span>{text}</span>
      <span className={`${needToBeStrong ? "font-bold" : ""}`}>
        {Math.ceil(value).toLocaleString("fr-FR")} €
      </span>
    </div>
  );
}

export default React.memo(LoanMonthEstimationLine);
