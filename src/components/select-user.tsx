import { useState } from "react";
import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import Select from "@/components/select";
import { useUsers } from "@/hooks/users";
import { User } from "@/types";
// todo: figure out better way to reuse props
interface SelectUserProps {
  value?: User[];
  onChange?: (value: User[]) => void;
  multiple?: boolean;
  label?: string;
}

export default function SelectUser(props: SelectUserProps) {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useUsers(10, 1, "-created_at", search);
  const users = data?.items as User[];

  return (
    <Select
      {...props}
      useOption
      options={users}
      searchValue={search}
      onSearch={setSearch}
      nameKey="emailAddress"
      valueKey="id"
      renderSelected={(values, options, onChange) => (
        <div className="flex flex-col">
          {options.map((user: User, index) => {
            user = user as User;
            return (
              <div
                key={user.id}
                className="flex h-5/6 p-1 bg-gray-200 rounded-sm ml-1 mr-1"
              >
                <div className="h-full aspect-square rounded-full block mr-2 overflow-hidden flex-grow-0 flex-shrink-0">
                  <Image
                    src="/images/repair_lab_logo.png"
                    width={30}
                    height={30}
                    alt="repair-labs"
                    className="h-full object-cover  "
                  />
                </div>{" "}
                <div className="block overflow-hidden text-clip whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </div>
                <HoverOpacityButton
                  className="text-gray-500 text-xs hover:enabled:scale-100 ml-2 hover:opacity-60"
                  onClick={() => {
                    // removeUserByIndex(index);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </HoverOpacityButton>
              </div>
            );
          })}
        </div>
      )}
    />
  );
}
