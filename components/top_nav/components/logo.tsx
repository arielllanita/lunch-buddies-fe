import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div>
      <Image src={"/images/logo-lunch-buddies.png"} width={200} height={50} alt="Logo" />
    </div>
  );
}
