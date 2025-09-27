import React from "react";
import Tooltip from "../../../public/info-circle.svg";
import Image from "next/image";

type ButtonFees = {
  title?: string;
  description?: string;
  value?: number | string;
  onClick: () => void;
  isSelected?: boolean;
  tooltip?: string;
  customStyle?: string;
};

function ButtonFees({
  title,
  description,
  onClick,
  value,
  isSelected = false,
  tooltip,
  customStyle,
}: ButtonFees) {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      className={`flex cursor-pointer flex-col border border-gray-200 rounded-md p-3 hover:bg-gray-100 text-sm shadow-xs relative ${
        isSelected
          ? "bg-gray-100 border-gray-400"
          : "bg-white border-gray-200 hover:bg-gray-100"
      } ${customStyle}`}
      onClick={onClick}
      value={value}
    >
      {tooltip && (
        <div
          className="absolute top-2 right-2 group inline-block"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Image
            src={Tooltip}
            width={15}
            height={15}
            alt="info"
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div
              className="absolute right-1 top-1/2
                        bg-black text-white text-xs rounded p-1 px-2
                        whitespace-nowrap z-10 shadow"
            >
              {tooltip}
            </div>
          )}
        </div>
      )}
      {title}{" "}
      <div>
        <span className="text-xs">{description}</span>
      </div>
    </button>
  );
}

export default ButtonFees;
