import { LoanDetailsForEstimation } from "@/types/types"
import { useState } from "react"

export const useLocalStorage = (key: string, initialValue: LoanDetailsForEstimation) => {
  const [storedValue, setStoredValue] = useState<LoanDetailsForEstimation>(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    }
    return initialValue
  })

  const setValueLocalStorage = (value: LoanDetailsForEstimation) => {
    setStoredValue(value)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const resetLocalStorage = (state: LoanDetailsForEstimation) => {
    setStoredValue(state)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key)
    }
  }

  return { storedValue, setValueLocalStorage, resetLocalStorage }
}