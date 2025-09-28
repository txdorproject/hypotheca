"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  getOnChangeValueInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueInput?: number | string;
  customSize?: string;
  min?: number;
  step?: number;
  max?: number;
  icon?: React.ReactNode;
  informationNote?: string;
};

export function InputWithLabel({
  label,
  id,
  placeholder,
  getOnChangeValueInput,
  valueInput,
  customSize,
  min = 0,
  step = 0.1,
  max = 100,
  icon,
  informationNote,
}: InputWithLabelProps) {
  return (
    <div className={`flex flex-col gap-2.5 mb-1 relative ${customSize}`}>
      <div className="flex items-center gap-1">
        {icon && <span>{icon}</span>}
        <Label htmlFor={id}>{label}</Label>
      </div>

      <Input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        min={min}
        step={step}
        max={max}
        id={id}
        placeholder={placeholder}
        onChange={getOnChangeValueInput}
        value={valueInput}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueInput}
        onChange={getOnChangeValueInput}
        className="w-full"
      />
    </div>
  );
}
