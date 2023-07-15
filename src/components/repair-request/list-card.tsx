import Image from "next/image";


export default function ListCard() {

  
  return(
  <main
    className={`flex min-h-screen flex-col items-center gap-4 ${inter.className}`}
  >
    {/* Logo of Repair Lab, which links to the main website. */}

    <picture>
      <a href="https://repairlab.myfreesites.net/" target="_blank">
        <Image
          src="/images/repair_lab_logo.jpg"
          alt="Repair Labs Logo"
          width={80}
          height={80}
        />
      </a>
    </picture>

    {/* Heading of the Page */}

    <h1 className="text-xl font-bold"> Submit a Repair Request</h1>
    </main>
    )
}
