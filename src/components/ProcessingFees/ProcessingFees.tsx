import React from "react";
import ButtonFees from "../ButtonFees/ButtonFees";
import { processingFees } from "@/constants/contants";

type ProcessingFeesProps = {
  onSelect: (value: number) => void;
  selectedValue?: number | null;
  title: string;
};

function ProcessingFees({
  onSelect,
  selectedValue,
  title,
}: ProcessingFeesProps) {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="text-sm font-medium">{title}</div>
      <div className="flex gap-1.5 flex-wrap">
        {processingFees.values.map((fee) => (
          <ButtonFees
            key={fee}
            title={`${fee} %`}
            value={fee}
            isSelected={selectedValue === fee}
            onClick={() => {
              onSelect(fee);
            }}
            customStyle="w-[67px]"
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(ProcessingFees);
