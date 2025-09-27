import React, { useCallback, useReducer } from "react";
import { LoanDetailsForEstimation, LoanAction } from "@/types/types";
import { useLocalStorage } from "./useLocalStorage";

const loanValuesForEstimationInitialState: LoanDetailsForEstimation = {
    propertyPrice: null,
    personalContribution: null,
    interestRate: null,
    borrowerInsurance: null,
    notaryFees: null,
    processingFees: null,
    monthlyExpenses: null,
    annualPropertyTax: null,
    loanDuration: null,
  };

  const reducer = (state: LoanDetailsForEstimation, action: LoanAction) => {
    switch (action.type) {
      case "UPDATE_LOAN_VALUE":
        return {
          ...state,
          [action.payload.id]: action.payload.value,
        };
      case "RESET_ALL":
        return loanValuesForEstimationInitialState;
      default:
        return state;
    }
  };

export const useLoan = () => {

  const { storedValue, setValueLocalStorage, resetLocalStorage } = useLocalStorage(
    "loanDetailsForEstimation",
    loanValuesForEstimationInitialState
  );

  const [state, dispatch] = useReducer(
    reducer,
    storedValue || loanValuesForEstimationInitialState
  );

  React.useEffect(() => {
    setValueLocalStorage(state);
  }, [state, setValueLocalStorage]);

  const handleUpdateLoanDetails = useCallback((id: string, value: number) => {
    dispatch({ type: "UPDATE_LOAN_VALUE", payload: { id, value } });
  }, []);

  const setNotaryFees = useCallback((value: number) => {
    dispatch({
      type: "UPDATE_LOAN_VALUE",
      payload: { id: "notaryFees", value },
    });
  }, []);

  const setProcessingFees = useCallback((value: number) => {
    dispatch({
      type: "UPDATE_LOAN_VALUE",
      payload: { id: "processingFees", value },
    });
  }, []);

  const resetAllData = useCallback(() => {
    dispatch({ type: "RESET_ALL" });
    resetLocalStorage(loanValuesForEstimationInitialState);
  }, [resetLocalStorage]);

  return { state, handleUpdateLoanDetails, setNotaryFees, setProcessingFees, dispatch, resetAllData }
}