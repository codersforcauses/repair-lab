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
      <hr className="mx-10" />
      <div className="relative flex-row items-center justify-center">
        <Box eventTitle="Jeans Repair Weekend"
          startDate="1 January"
          endDate="2 January"
          description="An event to repair jeans in preparation for donation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          imagePath="/images/jeans_repair.jpg" />
        <Box eventTitle="Bike Repair Day"
          startDate="3 March"
          endDate="4 March"
          description="The second bike repair event of the year. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          imagePath="/images/Repair_Lab_bikerepair.jpg" />
        <Box eventTitle="Toy Repairing Day"
          startDate="5 June"
          endDate="5 June"
          description="Toy repairing event. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          imagePath="/images/generalToy.jpeg" />
      </div>
    </div>
  );
};

export default Home;
