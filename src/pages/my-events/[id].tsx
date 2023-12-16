// Page for repairers to view the repair requests associated with
// a given event. This page is accessed via the my-events page. 
import Image from "next/image";
import { useRouter } from "next/router";

import LoadingSpinner from "@/components/UI/loading-spinner";
import { useEvent } from "@/hooks/events";
import { useRepairRequests } from "@/hooks/events";

const Home = () => {

  const {
    query: {id: eventId}
  } = useRouter();

  console.log(eventId)

  const {isLoading, data: repairRequests} = useRepairRequests(eventId as string);
  const {data: event} = useEvent(eventId as string);

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
        {event ? event.name : <LoadingSpinner/>}
      </h1>

      <hr className="mx-10" />

    
  </div>     
  )
}

export default Home;

