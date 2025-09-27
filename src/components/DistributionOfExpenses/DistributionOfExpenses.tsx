import React from "react";
import { InputWithLabel } from "../Input/Input";

enum ActionType {
  FIRST = "FIRST",
  SECOND = "SECOND",
}

type DistributionOfExpensesProps = {
  onChangeDistributionValues: (first: number, second: number) => void;
};

function DistributionOfExpenses({
  onChangeDistributionValues,
}: DistributionOfExpensesProps) {
  const [firstDistribution, setFirstDistribution] = React.useState<number>(50);

  const secondDistribution = 100 - firstDistribution;

  const handleChangeDistribution = (
    e: React.ChangeEvent<HTMLInputElement>,
    action: ActionType
  ) => {
    const value = Number(e.target.value);
    if (action === ActionType.FIRST) {
      setFirstDistribution(value);
      onChangeDistributionValues(value, 100 - value);
    } else {
      setFirstDistribution(100 - value);
      onChangeDistributionValues(100 - value, value);
    }
  };

  return (
    <div className="mt-6">
      <div className="font-semibold text-sm">
        Distribution des dépenses (2 personnes) :
      </div>
      <div className="flex gap-4 flex-wrap mt-3">
        <InputWithLabel
          id="first-distribution"
          placeholder="0 à 100"
          customSize="w-[130px]"
          min={0}
          max={100}
          step={1}
          valueInput={firstDistribution}
          getOnChangeValueInput={(e) =>
            handleChangeDistribution(e, ActionType.FIRST)
          }
          label="Personne 1 (%)"
        />
        <InputWithLabel
          id="second-distribution"
          placeholder="0 à 100"
          customSize="w-[130px]"
          min={0}
          max={100}
          step={1}
          valueInput={secondDistribution}
          getOnChangeValueInput={(e) =>
            handleChangeDistribution(e, ActionType.SECOND)
          }
          label="Personne 2 (%)"
        />
      </div>
    </div>
  );
}

export default DistributionOfExpenses;
