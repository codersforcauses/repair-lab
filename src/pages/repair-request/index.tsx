// Page for submitting a repair request
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/Button";
import FieldImageUpload from "@/components/FormFields/field-image-upload";
import SingleSelect from "@/components/FormFields/field-single-select";
import FieldTextArea from "@/components/FormFields/field-text-area";
import NavBar from "@/components/NavBar";
import { TermsAndConditions } from "@/components/terms-and-conditions";
import { Brand, useBrands } from "@/hooks/brands";
import { EventOption, useEventOptions } from "@/hooks/events";
import { ItemType, useItemTypes } from "@/hooks/item-types";
import { useCreateRepairRequest } from "@/hooks/repair-request";
import generateThumbnail from "@/lib/gen-thumbnail";
import uploadImage from "@/lib/upload-image";
import { NextPageWithLayout } from "@/pages/_app";
import { createRepairRequestSchema } from "@/schema/repair-request";
import { CreateRepairRequest } from "@/types";

const RepairRequest: NextPageWithLayout = () => {
  const { control, handleSubmit, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(repairRequestFormSchema),
    defaultValues: {
      itemBrand: "",
      itemType: "",
      description: "",
      images: [],
      eventId: "",
      comment: "",
      tncAccepted: false
    }
  });

  const { data: itemTypeList } = useItemTypes();
  const { data: brandList } = useBrands();
  const { data: eventOptions } = useEventOptions();
  const { mutate: createRepairRequest } = useCreateRepairRequest();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const uploadPromises =
      data.images?.map((image) => uploadImage(image)) ?? [];
    const uploadThumbailPromise = data.images?.[0]
      ? generateThumbnail(data.images[0]).then(uploadImage)
      : undefined;
    const keys = await Promise.all([uploadThumbailPromise, ...uploadPromises]);
    const [thumbnailImage, ...images] = keys;
    const updatedData = { ...data, thumbnailImage, images };
    createRepairRequest(updatedData);
    reset();
    window.location.href = "/request-success";
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex w-screen flex-col justify-center gap-4 md:w-3/6 lg:w-4/12">
        {/* Logo of Repair Lab, which links to the main website. */}

        <picture className="flex justify-center">
          <a href="https://repairlab.myfreesites.net/" target="_blank">
            <Image
              src="/images/repair_lab_logo.jpg"
              alt="Repair Labs Logo"
              width={80}
              height={80}
            />
          </a>
        </picture>

        {/* Heading of the Page */}

        <h1 className="flex justify-center text-xl font-bold">
          Submit a Repair Request
        </h1>
        <RepairRequestForm />
      </div>
    </div>
  );
};

RepairRequest.getLayout = function getLayout(page) {
  return (
    <>
      <NavBar />
      {page}
    </>
  );
};

export default RepairRequest;
