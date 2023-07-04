import { ChangeEvent, useMemo } from "react";
import { useRef } from "react";
import { DragEvent, useState } from "react";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";

export interface FieldUploadProps extends FieldValues {
  name: string;
  multiple?: boolean;
  accept?: string;
}

export default function FieldUpload({ name, multiple }: FieldUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  const handleFiles = (fileList: FileList) => {
    const fileArray = Array.from(fileList);

    const isValid = fileArray.every((file) => {
      // images only
      if (!file.type.startsWith("image/")) {
        alert("Only images are allowed");
        return;
      }
      // 10MB max
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too big");
        return;
      }
      return true;
    });

    if (!isValid) return; // TODO set rhf errors

    if (!multiple) {
      setFiles([fileArray[0]]);
      return;
    }
    setFiles([...files, ...fileArray]);
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
        id={name}
        ref={inputRef}
        type="file"
        multiple={multiple} // this does nothing since we're all custom baby
        onChange={handleChange}
        accept="image/*"
      />
      <label
        className={`flex min-h-[12rem] w-full items-center justify-center rounded-lg bg-lightAqua-200 transition hover:bg-lightAqua-300
        ${dragging ? "border-2 border-dashed border-darkAqua-700" : ""}
        `}
        htmlFor={name}
      >
        {files.length > 0 ? (
          files.map((file, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image
                alt={`Uploaded image ${i + 1}`}
                src={previews[i]}
                width={100}
                height={100}
                // TODO refac this out to separate component and add fallback
              />
              {/* <BiImageAlt className="h-16 w-16 text-white" /> */}
              <p className="flex-wrap text-black">{file.name}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <BiImageAdd className="h-16 w-16 text-white" />
            <p className="text-black">Drag and drop your files here or</p>
            <button
              className="text-darkAqua-700 hover:text-darkAqua-950 hover:underline"
              onClick={onButtonClick}
            >
              Upload a file
            </button>
          </div>
        )}
      </label>
    </div>
  );
}
