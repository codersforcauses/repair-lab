import Image from "next/image";

// TODO: change unauthorised page
const UnauthorisedPage = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div>
        <Image
          src="/images/401.png"
          alt="Unauthorised Page"
          width={700}
          height={700}
        />
      </div>
      <a href="https://storyset.com/computer">
        Computer illustrations by Storyset
      </a>
    </div>
  );
};

export default UnauthorisedPage;
