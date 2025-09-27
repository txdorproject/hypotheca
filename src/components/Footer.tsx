import React from "react";

type FooterProps = {
  colorBackground?: string;
  colorText?: string;
  customStyle?: string;
};

function Footer({ colorBackground, colorText, customStyle }: FooterProps) {
  return (
    <div
      className={`font-mono text-center py-4 text-xs text-muted-foreground ${colorText} ${customStyle} ${colorBackground}`}
    >
      spawned on localhost 3xxx, now part of the real world. T....R
    </div>
  );
}

export default Footer;
