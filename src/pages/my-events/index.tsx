// Page for repairers to view their assigned events
import { useState } from 'react'
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

import Box from "@/components/EventBox/Box";

const Home = () => {

  const [eventData, setEventData] = useState("");

  fetch('/api/event')
  .then((response) => response.json())
  .then((data) => {setEventData(data);})
  .catch((err) => {
    console.log(err.message);
  });

   const arr = [];
    Object.keys(eventData).forEach(function(key) {
      arr.push(eventData[key]);
    });

  const { userId } = useAuth();
  console.log(userId);

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
      <h1 className="relative z-10 mt-2 text-xl flex w-full justify-center">
        My Events
      </h1>
      <hr className="mx-10" />
      {/* Temporary test: will replace with a proper call to backend 
      If you are testing, put your own userId in (find it in console)*/}
      {(userId == "user_2YegcKa0KOns3791eORQdY7ERxY")
        ?

        // Slicing the date strings is a temp measure - remove when
        // date formatting issue is resolved.
        <div className="relative flex-row items-center justify-center">
          <ul>{arr.map(item => <Box key={item.id} 
                                    eventTitle={item.name}
                                    // Slicing to get mm-dd then reversing it
                                    startDate={item.startDate.slice(5, 9).split('-').reverse().join('-')}
                                    // If endDate is same as start date, endDate only contributes the year
                                    endDate={item.startDate.slice(0, 9) === item.endDate.slice(0, 9) 
                                             ? item.endDate.slice(0, 4) : 
                                             item.endDate.slice(5, 9).split('-').reverse().join('-') + "   " + item.endDate.slice(0, 4)}
                                    description={item.description}
                                />)}</ul>;
        </div>

        // <div className="relative flex-row items-center justify-center">
        //   <Box eventTitle="Jeans Repair Weekend"
        //     startDate="1 January"
        //     endDate="2 January"
        //     description="An event to repair jeans in preparation for donation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        //     imagePath="/images/jeans_repair.jpg" />
        //   <Box eventTitle="Bike Repair Day"
        //     startDate="3 March"
        //     endDate="4 March"
        //     description="The second bike repair event of the year. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        //     imagePath="/images/Repair_Lab_bikerepair.jpg" />
        //   <Box eventTitle="Toy Repairing Day"
        //     startDate="5 June"
        //     endDate="5 June"
        //     description="Toy repairing event. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        //     imagePath="/images/generalToy.jpeg" />
        // </div>
        :
        <div className="relative flex w-full justify-center text-2xl mt-12 text-center text-slate-600 italic font-semibold  text-opacity-90">
          You have no assigned events.
        </div>
      }
    </div>
  );
};

export default Home;
