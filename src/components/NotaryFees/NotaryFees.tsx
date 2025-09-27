import React from "react";
import ButtonFees from "../ButtonFees/ButtonFees";
import { notaryFees } from "@/constants/contants";

type NotaryFeesProps = {
  onSelect: (value: number) => void;
  selectedValue?: number | null;
  title: string;
};

function NotaryFees({ onSelect, selectedValue, title }: NotaryFeesProps) {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="text-sm font-medium">
        {title}
      </div>
      <div className="flex gap-4">
        {notaryFees.map((fee) => (
          <ButtonFees
            key={fee.key}
            title={fee.title}
            description={fee.description}
            value={fee.value}
            isSelected={selectedValue === fee.value}
            onClick={() => {
              onSelect(fee.value);
            }}
            tooltip={fee.tooltip}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(NotaryFees);
