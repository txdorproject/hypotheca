import {
  calculateDistribution,
  calculateTotalLoanCost,
  loanWithExpenses,
  remainsToLive,
} from "@/helpers/loan.helpers";
import {
  DebtRatio,
  DistributionValues,
  LoanDetailsForEstimation,
} from "@/types/types";
import React, { useMemo } from "react";
import Button from "../Button/Button";
import LoanMonthEstimationLine from "./LoanMonthEstimationLine";
import LoanMonthEstimationTitle from "./LoanMonthEstimationTitle";

type LoanMonthEstimationProps = {
  monthlyPayment?: number;
  years?: number;
  debtRatio?: DebtRatio | null;
  distributionValues: DistributionValues;
  houseHoldIncome: number;
  loanDetailsForEstimation: LoanDetailsForEstimation;
};

const borderColorMap: Record<DebtRatio["color"], string> = {
  green: "border-emerald-500",
  orange: "border-amber-500",
  rose: "border-rose-500",
};

const LoanMonthEstimation = React.forwardRef<
  HTMLDivElement,
  LoanMonthEstimationProps
>(function LoanMonthEstimation(
  {
    monthlyPayment,
    years,
    debtRatio,
    distributionValues,
    houseHoldIncome,
    loanDetailsForEstimation,
  },
  ref
) {
  const loanAndMonthlyExpenses =
    monthlyPayment &&
    (loanDetailsForEstimation.monthlyExpenses !== null ||
      loanDetailsForEstimation.annualPropertyTax !== null);

  const remains = useMemo(() => {
    return remainsToLive([
      houseHoldIncome,
      monthlyPayment ?? 0,
      loanDetailsForEstimation.monthlyExpenses ?? 0,
      loanDetailsForEstimation.annualPropertyTax ?? 0,
    ]);
  }, [houseHoldIncome, monthlyPayment, loanDetailsForEstimation]);

  const displayRemainsToLive = monthlyPayment && houseHoldIncome !== 0;

  const basePayment = loanDetailsForEstimation.monthlyExpenses
    ? loanWithExpenses(loanDetailsForEstimation, monthlyPayment ?? 0)
    : monthlyPayment ?? 0;

  const distributionPerPerson = useMemo(
    () => ({
      first: calculateDistribution(basePayment, distributionValues.first),
      second: calculateDistribution(basePayment, distributionValues.second),
    }),
    [basePayment, distributionValues.first, distributionValues.second]
  );

  const [showMoreDetails, setShowMoreDetails] = React.useState(false);

  return (
    <div
      ref={ref}
      className="fixed bottom-0 bg-white w-full left-0 py-5 shadow-2xl px-4 border-t border-neutral-300 lg:relative lg:shadow-none lg:border-0 lg:bg-transparent lg:py-0 lg:px-0"
    >
      <LoanMonthEstimationTitle year={years} debtRatio={debtRatio} />
      <div
        className={`p-4 mt-2 rounded-xl shadow-md border text-sm flex flex-col bg-neutral-100 ${
          debtRatio ? borderColorMap[debtRatio.color] : ""
        }`}
      >
        <div className="flex flex-col pb-1 lg:border-b border-neutral-300">
          <LoanMonthEstimationLine
            text="Crédit mensuel :"
            value={monthlyPayment ?? 0}
            needToBeStrong={true}
            customStyle="text-xl"
          />
        </div>
        <div className="text-[10.5px] text-gray-800 mb-3 italic lg:mt-3">
          Les données de ce simulateur sont fournies à titre indicatif et ne
          sont pas contractuelles.
        </div>
        <div className="lg:hidden">
          <Button
            variant="default"
            size="small"
            onClick={() => {
              setShowMoreDetails((prev) => !prev);
            }}
          >
            {showMoreDetails ? "Voir moins de détails" : "Voir plus de détails"}
          </Button>
        </div>
        <div className={`mt-2 ${showMoreDetails ? "" : "hidden"} lg:block`}>
          <LoanMonthEstimationLine
            text="Coût total du crédit :"
            value={(monthlyPayment ?? 0) * (years ?? 0) * 12}
          />
          <LoanMonthEstimationLine
            text="Coût total des intérêts :"
            value={calculateTotalLoanCost(
              monthlyPayment ?? 0,
              years ?? 0,
              loanDetailsForEstimation
            )}
            needToBeStrong={false}
          />
          {loanAndMonthlyExpenses && (
            <LoanMonthEstimationLine
              text="Crédit + dépenses mensuels :"
              value={loanWithExpenses(
                loanDetailsForEstimation,
                monthlyPayment!
              )}
              needToBeStrong={true}
            />
          )}
          {monthlyPayment && (
            <div>
              <LoanMonthEstimationLine
                text="Personne 1 :"
                value={distributionPerPerson.first}
              />
              <LoanMonthEstimationLine
                text="Personne 2 :"
                value={distributionPerPerson.second}
              />
            </div>
          )}
          {displayRemainsToLive && (
            <LoanMonthEstimationLine
              text="Reste à vivre :"
              value={remains}
              needToBeStrong={true}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default React.memo(LoanMonthEstimation);
