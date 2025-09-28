import React from "react";
import { InputWithLabel } from "@/components/Input/Input";
import { additionnalFees } from "@/constants/contants";
import { LoanDetailsForEstimation } from "@/types/types";

type AdditionnalFeesProps = {
  onUpdateLoanValues: (id: string, value: number) => void;
  state: LoanDetailsForEstimation;
};

function AdditionnalFees({ onUpdateLoanValues, state }: AdditionnalFeesProps) {
  return (
    <div className="mt-3 pt-6">
      <div className="flex gap-4 flex-wrap">
        {additionnalFees.map((fee) => (
          <div className="flex" key={fee.key}>
            <InputWithLabel
              label={fee.label}
              id={fee.key}
              placeholder={fee.placehoder}
              getOnChangeValueInput={(e) =>
                onUpdateLoanValues(fee.key, parseFloat(e.target.value))
              }
              valueInput={state[fee.key] ?? ""}
              customSize="w-[300px] lg:w-[190px]"
              max={fee.maxValue}
              min={fee.minValue}
              step={fee.step}
              icon={fee.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdditionnalFees;
