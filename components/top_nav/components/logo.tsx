import Image from "next/image";

export default function Logo() {
  return (
    <div>
      <Image
        src={"/images/logo-lunch-buddies.png"}
        className="cursor-pointer"
        width={200}
        height={50}
        alt="Logo"
      />
    </div>
  );
}
