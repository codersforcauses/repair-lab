import Image from "next/image";

const Box = () => {
  
  return (
      <div className="flex mx-10 flex-col mt-5 items-center text-xs rounded-lg bg-slate-200">
        <div>
          <Image 
            src="/images/jeans_repair.jpg"
            alt="Person holding jeans"
            width={500}
            height={500}
            className=" rounded-t-lg object-none h-20"   
          />
        </div>

        <span className="font-bold text-sm">
          Event Title
        </span>
        <h2 className="">
          1st January 1970
        </h2>

        <p className="pt-2 text-left">
          This event is about.... It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.
        </p>
     
    </div>
  );
};

export default Box;