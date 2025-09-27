import React from "react";
import HypothecaLogo from "../../public/Hypotheca.svg";
import Image from "next/image";

function Header() {
  return (
    <div className="flex items-center justify-center p-4 flex-col">
      <div>
        <Image
          src={HypothecaLogo}
          alt="Hypotheca Logo"
          width={150}
          height={50}
        />
      </div>
      <div className="text-center mt-4 text-xs">
        <h1>
          Simulation de Crédit Immobilier en Ligne – Calculateur Gratuit et
          Instantané | Hypotheca
        </h1>
      </div>
    </div>
  );
}

export default Header;
