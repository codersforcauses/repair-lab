// Page for repairers to view their assigned events

import Image from "next/image";

const Home = () => {

return (
<div>
      {/* HEADER BAR*/}
      <div className=" flex w-full flex-row border-b-[2px] border-slate-300 ">
        <Image
          className="m-10 mb-5 mt-5"
          src="/images/repair_lab_logo.jpg"
          alt="logo"
          width="90"
          height="90"
        />
        <h1 className="mt-[50px] text-3xl font-semibold text-slate-600">
          {" "}
          Assigned Events
        </h1>
      </div>
</div>
);
};

export default Home;
