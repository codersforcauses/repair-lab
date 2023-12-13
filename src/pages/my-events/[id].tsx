// Page for repairers to view the repair requests associated with
// a given event. This page is accessed via the my-events page. 
import { useState } from 'react'
import Image from "next/image";
import { RadioGroup } from '@headlessui/react'

const Home = () => {

  const [plan, setPlan] = useState('startup')

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
        [Event Name] Repair Requests
      </h1>

      <hr className="mx-10" />

    <div className="mx-5 mt-4 rounded-lg bg-slate-200 shadow-l">

    <div className="flex flex-col ml-2 mr-2 mb-5">
      <span className="font-bold pt-2">
        My Repair Requests
      </span>
    </div>
      <RadioGroup value={plan} onChange={setPlan}>
        
        <RadioGroup.Option value="A">
          {({ checked }) => (
            <span className={checked ? 'bg-blue-200' : ''}>A</span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="B">
          {({ checked }) => (
            <span className={checked ? 'bg-blue-200' : ''}>B</span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value="C">
          {({ checked }) => (
            <span className={checked ? 'bg-blue-200' : ''}>C</span>
          )}
        </RadioGroup.Option>
      </RadioGroup>

    </div> 
  </div>     
  )
}

export default Home;

