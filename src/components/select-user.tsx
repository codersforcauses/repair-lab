import { Fragment, useState } from "react";
import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import { useQuery } from "react-query";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import Select from "@/components/select";
import LoadingSpinner from "@/components/UI/loading-spinner";
import { useUsers } from "@/hooks/users";
import { httpClient } from "@/lib/base-http-client";
import cn from "@/lib/classnames";
import isBlank from "@/lib/is-blank";
import { User } from "@/types";
const NAME_KEY = "emailAddress";
const VALUE_KEY = "id";
interface SelectUserProps {
  value?: User[];
  onChange?: (value: User[]) => void;
  multiple?: boolean;
  label?: string;
  initialUserIds?: string[];
}

// todo: improve UX
// todo: add dynamic loading when scroll to bottom
export default function SelectUser(props: SelectUserProps) {
  const { initialUserIds, value, onChange, ...rest } = props;
  const [search, setSearch] = useState<string>("");
  const { data, isLoading } = useUsers(10, 1, "-created_at", search);
  const users = data?.items as User[];
  const [initialized, setInitialized] = useState<boolean>(false);

  useQuery({
    enabled: !initialized,
    queryKey: ["users", initialUserIds],
    queryFn: async () => {
      if (!isBlank(initialUserIds)) {
        const res = await httpClient.get<User[]>(
          `/user/list?ids=${initialUserIds.join(",")}`
        );
        onChange?.(res.data);
        setInitialized(true);
      }
    }
  });

  return (
    <Select
      {...rest}
      value={value}
      onChange={onChange}
      useOption
      options={users}
      searchValue={search}
      onSearch={setSearch}
      nameKey={NAME_KEY}
      valueKey={VALUE_KEY}
      renderSelected={(values, options, onChange) => (
        <div className="flex-1 flex h-full gap-1">
          {options.map((user: User, index) => {
            return (
              <div
                key={user.id}
                className="flex p-1 bg-gray-200 rounded-sm h-full max-w-24"
              >
                <div className="aspect-square rounded-full block mr-2 overflow-hidden flex-grow-0 flex-shrink-0">
                  <Image
                    src="/images/repair_lab_logo.png"
                    width={30}
                    height={30}
                    alt="repair-labs"
                    className="h-full object-cover  "
                  />
                </div>
                <div className="block overflow-hidden text-clip whitespace-nowrap text-xs">
                  {user.firstName} {user.lastName}
                </div>
                <HoverOpacityButton
                  className="text-gray-500 text-xs hover:enabled:scale-100 ml-2 hover:opacity-60"
                  onClick={() => {
                    const newValues = [...values];
                    newValues.splice(index, 1);
                    onChange?.(newValues);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </HoverOpacityButton>
              </div>
            );
          })}
        </div>
      )}
      renderList={(options) => (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            options.map((user) => (
              <Listbox.Option
                key={`${user[VALUE_KEY]}`}
                value={user}
                as={Fragment}
              >
                {({ active, selected }) => (
                  <li
                    className={cn(
                      { "bg-lightAqua-200": selected },
                      "py-2 pl-2 pr-4 text-sm flex text-grey-900 active:bg-lightAqua-100"
                    )}
                  >
                    <div className="h-full aspect-square rounded-full block mr-2 overflow-hidden flex-grow-0 flex-shrink-0">
                      <Image
                        src="/images/repair_lab_logo.png"
                        width={30}
                        height={30}
                        alt="repair-labs"
                        className="h-full object-cover  "
                      />
                    </div>
                    <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                      {user.firstName} {user.lastName} {user.emailAddress}
                    </div>
                  </li>
                )}
              </Listbox.Option>
            ))
          )}
        </>
      )}
    />
  );
}
