import { DebtColor, DebtRatio, LoanDetailsForEstimation } from "@/types/types";

export const calculateLoans = (v: LoanDetailsForEstimation): number => {
  const loanAmount = getLoanAmount(v);
  
  const insurancePerMonth =
    (loanAmount * ((Number(v.borrowerInsurance) || 0) / 100)) / 12;

    const months = (v.loanDuration ?? 0) * 12;
    
    if (!loanAmount || months <= 0) return 0;

    const monthlyRate = (Number(v.interestRate) || 0) / 100 / 12;

    if (monthlyRate === 0) {
      return Math.ceil(loanAmount / months + insurancePerMonth);
    }

    const monthlyWithoutInsurance =
      loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));

    return Math.ceil(monthlyWithoutInsurance + insurancePerMonth);
};

export const getLoanAmount = (v: LoanDetailsForEstimation): number => {
  const price = Number(v.propertyPrice) || 0;
  const contribution = Number(v.personalContribution) || 0;

  const notaryFees = price * ((Number(v.notaryFees) || 0) / 100);
  const processingFees = price * ((Number(v.processingFees) || 0) / 100);

  return Math.max(0, price - contribution + notaryFees + processingFees);
}

export const calculateTotalLoanCost = (
  monthlyPayment: number,
  years: number,
  v: LoanDetailsForEstimation
): number => {
  const totalPaid = monthlyPayment * years * 12;
  const totalCost = totalPaid - getLoanAmount(v);
  return Math.max(0, Math.round(totalCost));
}

export const calculateDebtRatio = (
  income: number,
  mensuality: number
): DebtRatio => {
  const percent = income > 0 ? (mensuality / income) * 100 : 0;

  let color: DebtColor;
  if (percent <= 25) color = DebtColor.Green;
  else if (percent <= 35) color = DebtColor.Orange;
  else color = DebtColor.Rose;

  return { percent, color };
};

export const calculateDistribution = (monthlyPayment: number, distributionValues: number) => {
  return Math.ceil(monthlyPayment * (distributionValues / 100)); 
}

export const loanWithExpenses = (v: LoanDetailsForEstimation, loan: number): number => {
  return Math.ceil(loan + (Number(v.monthlyExpenses) || 0) + (Number(v.annualPropertyTax) || 0) / 12)
}

export const remainsToLive = (rising: number[]): number => {
  return rising.reduce((acc, curr, idx) => idx === 0 ? curr : acc - curr);
}