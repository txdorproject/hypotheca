"use client";

import React, { useCallback, useMemo } from "react";
import LoanForm from "@/components/LoanForm/LoanForm";
import LoanMonthEstimation from "@/components/LoanMonthEstimation/LoanMonthEstimation";

import { calculateLoans, calculateDebtRatio } from "@/helpers/loan.helpers";
import { InputWithLabel } from "@/components/Input/Input";
import NotaryFees from "@/components/NotaryFees/NotaryFees";
import ProcessingFees from "@/components/ProcessingFees/ProcessingFees";
import { processingFees } from "@/constants/contants";
import AdditionnalFees from "@/components/AdditionnalFees/AdditionnalFees";
import { useLoan } from "@/hooks/useLoan";
import DistributionOfExpenses from "@/components/DistributionOfExpenses/DistributionOfExpenses";
import { DistributionValues } from "@/types/types";

export default function Home() {
  const [houseHoldIncome, setHouseHoldIncome] = React.useState<number>(0);
  const [distributionsValues, setDistributionsValues] =
    React.useState<DistributionValues>({ first: 50, second: 50 });

  const changeDistributionValues = useCallback(
    (first: number, second: number) => {
      setDistributionsValues({ first, second });
    },
    []
  );

  const { state, handleUpdateLoanDetails, setNotaryFees, setProcessingFees } =
    useLoan();

  const monthlyPayments = useMemo(() => {
    return calculateLoans(state);
  }, [state]);

  const debtRatios = useMemo(() => {
    if (houseHoldIncome > 0) {
      return calculateDebtRatio(houseHoldIncome, monthlyPayments);
    }
  }, [monthlyPayments, houseHoldIncome]);

  const [loanEstimationHeight, setLoanEstimationHeight] = React.useState(0);
  const loanEstimationRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!loanEstimationRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setLoanEstimationHeight(entry.contentRect.height);
      }
    });
    observer.observe(loanEstimationRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-3">
      <div className="w-11/12 m-auto mt-4 flex flex-col gap-5 lg:flex-row">
        <div className="w-full lg:w-8/12">
          <LoanForm
            onUpdateLoanValues={handleUpdateLoanDetails}
            state={state}
          />
          <div className="flex mt-2 gap-2 flex-wrap xl:gap-10 xl:mt-0">
            <NotaryFees
              title={`Frais de notaire (selon l'état de votre bien)`}
              selectedValue={state.notaryFees}
              onSelect={setNotaryFees}
            />
            <ProcessingFees
              selectedValue={state.processingFees}
              onSelect={setProcessingFees}
              title={processingFees.label}
            />
          </div>
          <div>
            <AdditionnalFees
              onUpdateLoanValues={handleUpdateLoanDetails}
              state={state}
            />
          </div>
          <div className="flex mt-2 gap-2 flex-wrap xl:gap-10 xl:mt-0">
            <div className="mt-6 rounded-md border border-gray-200 p-4 flex flex-col items-center gap-2">
              <p className="text-xs">
                Estimez votre taux d&apos;endettement en fonction de vos mensualités
              </p>
              <div className="flex w-fit">
                <InputWithLabel
                  label="Revenu du ménage"
                  id="householdIncome"
                  placeholder="1 200 €"
                  getOnChangeValueInput={(e) => {
                    setHouseHoldIncome(Number(e.target.value));
                  }}
                  customSize="w-full"
                  max={20000}
                  min={0}
                  step={10}
                  valueInput={houseHoldIncome || ""}
                />
              </div>
            </div>
            <DistributionOfExpenses
              onChangeDistributionValues={changeDistributionValues}
            />
          </div>
        </div>
        <div className="lg:hidden" style={{ height: loanEstimationHeight - 40 }} />
        <div className="w-full lg:w-4/12">
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="flex-1">
              <LoanMonthEstimation
                ref={loanEstimationRef}
                monthlyPayment={monthlyPayments}
                years={state.loanDuration || 0}
                debtRatio={debtRatios}
                distributionValues={distributionsValues}
                houseHoldIncome={houseHoldIncome}
                loanDetailsForEstimation={state}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
