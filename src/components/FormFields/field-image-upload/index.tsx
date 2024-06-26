import { ChangeEvent, useMemo } from "react";
import { useRef } from "react";
import { DragEvent, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps
} from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";

import ImageChip from "@/components/FormFields/field-image-upload/image-chip";

export interface FieldUploadProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  multiple?: boolean;
  accept?: string;
  fileLimit?: number;
  sizeLimit?: number;
}

export default function FieldUpload<T extends FieldValues = FieldValues>({
  multiple,
  fileLimit = 5,
  sizeLimit = 10,
  ...props
}: FieldUploadProps<T>) {
  const { field } = useController(props);

  const [dragging, setDragging] = useState(false);
  const files = field.value as File[] | undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo(() => {
    return files?.map((file) => URL.createObjectURL(file));
  }, [files]);

  const handleFiles = (fileList: FileList) => {
    const fileArray = Array.from(fileList);

    // check file limit
    if (fileArray.length > fileLimit) {
      alert(`You can only upload ${fileLimit} files at a time`);
      return;
    }

    const isValid = fileArray.every((file) => {
      // images only
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg" ||
          file.type === "image/webp"
        )
      ) {
        alert("Only images are allowed");
        return;
      }

      // 10MB max by default
      if (file.size > sizeLimit * 1024 * 1024) {
        alert("File is too big");
        return;
      }
      return true;
    });

    if (!isValid) return; // TODO set rhf errors

    if (!multiple) {
      // update internal state
      const newState = fileArray[0];
      // update rhf state
      field.onChange([newState]);
    }
    // update internal state
    const newState = [...(files ?? []), ...fileArray];
    // update rhf state
    field.onChange(newState);
  };

  // handle drag events
  const handleDrag = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        className="hidden"
        id={props.name}
        ref={inputRef}
        type="file"
        multiple={multiple}
        onChange={handleChange}
        accept=".png, .jpeg, .jpg, .webp"
      />
      <label
        className={`flex min-h-[12rem] w-full items-center justify-center rounded-lg bg-lightAqua-200 transition hover:bg-lightAqua-300
        ${dragging ? "border-2 border-dashed border-darkAqua-700" : ""}
        `}
        htmlFor={props.name}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 p-2">
          {files?.length ? (
            files.map((file, i) => (
              <ImageChip
                key={i}
                text={file.name}
                url={previews?.[i]}
                alt={`Image preview for ${file.name}`}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <BiImageAdd className="h-16 w-16 text-white" />
              <p className="text-black">
                Drag and drop your file{multiple && "s"} here or
              </p>
              <button
                className="text-darkAqua-700 hover:text-darkAqua-950 hover:underline"
                type="button"
                onClick={onButtonClick}
              >
                Upload a file
              </button>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
