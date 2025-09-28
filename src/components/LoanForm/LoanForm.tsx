"use client";

import React from "react";
import { InputWithLabel } from "@/components/Input/Input";
import { LOAN_DETAILS } from "@/constants/contants";
import { LoanDetailsForEstimation } from "@/types/types";

type LoanFormProps = {
  onUpdateLoanValues: (id: string, value: number) => void;
  state: LoanDetailsForEstimation;
};

function LoanForm({ onUpdateLoanValues, state }: LoanFormProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {LOAN_DETAILS.map((detail) => (
        <div className="flex w-[300px] lg:w-[190px] flex-wrap" key={detail.key}>
          <InputWithLabel
            label={detail.label}
            id={detail.key}
            placeholder={detail.placeholder}
            getOnChangeValueInput={(e) =>
              onUpdateLoanValues(detail.key, parseFloat(e.target.value))
            }
            valueInput={state[detail.key] ?? ""}
            customSize="w-full"
            max={detail.maxValue}
            min={detail.minValue}
            step={detail.step}
            icon={detail.icon}
          />
        </div>
      ))}
    </div>
  );
}

export default LoanForm;
