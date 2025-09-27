import {
  LoanDetailsType,
  NotaryFees,
  ProcessingFees,
  AdditionnalFees,
} from "@/types/types";
import { IoMdHome } from "react-icons/io";
import { FaPiggyBank } from "react-icons/fa";
import { RiPercentLine } from "react-icons/ri";
import { MdShield } from "react-icons/md";
import { MdReceiptLong } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FiClock } from "react-icons/fi";

export const LOAN_DETAILS: LoanDetailsType[] = [
  {
    label: "J'emprunte",
    key: "propertyPrice",
    placeholder: "200 000 €",
    maxValue: 700000,
    minValue: 0,
    step: 500,
    icon: <IoMdHome size={15} />,
  },
  {
    label: "sur une durée de",
    key: "loanDuration",
    placeholder: "20 ans",
    maxValue: 25,
    minValue: 1,
    step: 1,
    icon: <FiClock size={15} />,
  },
  {
    label: "Avec un apport",
    key: "personalContribution",
    placeholder: "20 000 €",
    maxValue: 200000,
    minValue: 0,
    step: 100,
    icon: <FaPiggyBank size={15} />,
  },
  {
    label: "Taux d'interêt",
    key: "interestRate",
    placeholder: "3.5 %",
    maxValue: 6,
    minValue: 0,
    step: 0.1,
    icon: <RiPercentLine size={15} />,
  },
  {
    label: "Assurance emprunteur",
    key: "borrowerInsurance",
    placeholder: "0.3 %",
    maxValue: 3,
    minValue: 0,
    step: 0.1,
    icon: <MdShield size={15} />,
  },
];

export const notaryFees: NotaryFees[] = [
  {
    title: "Ancien",
    description: "Environ 7-8 % du prix du bien",
    value: 7.5,
    key: "notaryFees",
    tooltip: "Biens immobiliers + de 5 ans",
  },
  {
    title: "Neuf",
    description: "Environ 2-3 % du prix du bien",
    value: 2.5,
    key: "notaryFees",
    tooltip: "Biens immobiliers de moins - 5 ans",
  },
];

export const processingFees: ProcessingFees = {
  key: "processingFees",
  values: [0, 1, 1.5, 2],
  label: "Frais de dossier bancaire (optionnel)",
};

export const additionnalFees: AdditionnalFees[] = [
  {
    label: "Frais mensuels récurrents (optionnel)",
    key: "monthlyExpenses",
    placehoder: "500 € (internet, électricité, courses, ...)",
    maxValue: 3000,
    minValue: 0,
    step: 1,
    icon: <MdReceiptLong size={15} />,
  },
  {
    label: "Taxes foncières (optionnel)",
    key: "annualPropertyTax",
    placehoder: "1200 € annuel",
    maxValue: 4000,
    minValue: 0,
    step: 1,
    icon: <GiReceiveMoney size={15} />,
  },
];
