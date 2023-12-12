// Page for repairers to view the repair requests associated with
// a given event. This page is accessed via the my-events page. 
import Image from "next/image";
import { Tab } from '@headlessui/react'

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
      
      <h1 className="relative z-10 mt-2 text-xl flex w-full justify-center">
        Repair Requests
      </h1>

      <hr className="mx-10" />

    <div className="mx-5 mt-4 rounded-lg bg-slate-200 shadow-l">

    <div className="flex flex-col ml-2 mr-2">
      <span className="font-bold pt-2">
        eventTitle
      </span>
    </div>

    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          
            <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus">
            My Repairs </Tab>
            
            <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus">
            All </Tab>
            
            <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus">
            Available </Tab>
           
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                Task 1 ....
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                Task 2 ....
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-white p-3 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
                Task 3....
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
    </div>
    </div>
  </div>     
  )
}

export default Home;

