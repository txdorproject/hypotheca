export type LoanDetailsType = {
  label: string;
  key: keyof LoanDetailsForEstimation;
  placeholder: string;
  maxValue?: number;
  minValue?: number;
  step?: number;
  icon?: React.ReactNode;
}

export type LoanDetailsForEstimation = {
  propertyPrice: number | null;
  personalContribution: number | null;
  interestRate: number | null;
  borrowerInsurance: number | null;
  notaryFees?: number | null;
  processingFees?: number | null;
  monthlyExpenses?: number | null;
  annualPropertyTax?: number | null;
  loanDuration?: number | null;
}

export type LoanAction =
  | {
      type: "UPDATE_LOAN_VALUE";
      payload: { id: string; value: number | null };
    }
  | {
    type: "RESET_ALL"
  };

export enum DebtColor {
  Green = "green",
  Orange = "orange",
  Rose = "rose",
}

export type DebtRatio = { percent: number; color: DebtColor };

export type NotaryFees = {
  title: string;
  description: string;
  value: number;
  key: string;
  tooltip: string;
}

export type ProcessingFees = {
  key: string;
  values: number[];
  label: string;
}

export type AdditionnalFees = {
  label: string;
  key: keyof LoanDetailsForEstimation;
  placehoder: string;
  maxValue?: number;
  minValue?: number;
  step?: number;
  icon?: React.ReactNode;
}

export type DistributionValues = {
  first: number;
  second: number;
}