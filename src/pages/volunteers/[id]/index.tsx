// Page for repairers to view their assigned events
import Image from "next/image";

import Box from "@/components/EventBox/Box";

const Home = () => {

return (
<div>
      {/* HEADER BAR*/}
      <div className="relative z-10 mt-2 flex w-full justify-center">
        <Image
          src="/images/repair_lab_logo.png"
          alt="Repair Labs Logo"
          width={90}
          height={90}
        />
      </div>
        <h1 className="relative z-10 mt-2 flex w-full justify-center">
          My Events
        </h1>
         <hr/>
         <div className="relative flex-row items-center justify-center">
            <Box/>
            
            <Box/>
         </div>
</div>
);
};

export default Home;
