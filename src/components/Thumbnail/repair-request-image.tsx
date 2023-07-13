import { useState } from "react";
import Image from "next/image";
import { RepairRequestImage } from "@prisma/client";

export default function ThumbnailRepairRequest({ props }: { props: string }) {
  const [image, setImage] = useState<RepairRequestImage[]>([]);
  console.log(props);
  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   params.append("id", props);
  //   try {
  //     fetch(`/api/events/repair-request-image?${params.toString()}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setImage(data[0]);
  //       });
  //   } catch (err) {
  //     /* empty */
  //   }
  // }, []);

  return (
    <Image
      className="h-48 w-96 rounded-t-lg object-cover"
      // TODO: change the src for the s3Key image
      src="/images/broken-clock-sad.jpg"
      width={150}
      height={150}
      alt="thumbnail"
    />
  );
}
