import { Fragment, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

import HoverOpacityButton from "@/components/Button/hover-opacity-button";
import Select from "@/components/select";
import { useInfiniteUsers } from "@/hooks/users";
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
  maxTag?: number;
}

// todo: improve UX
// todo: add dynamic loading when scroll to bottom
export function SelectUser({
  value,
  onChange,
  maxTag = 2,
  ...rest
}: SelectUserProps) {
  const [search, setSearch] = useState<string>("");
  const {
    data: usersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteUsers(search);

  // Concatenate all pages of users
  const allUsers = usersData?.pages.flatMap((page) => page.items) ?? [];

  const observer = useRef<IntersectionObserver>();
  const lastUserElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
    <Select
      {...rest}
      value={value}
      onChange={onChange}
      useOption
      options={allUsers}
      searchValue={search}
      onSearch={setSearch}
      nameKey={NAME_KEY}
      valueKey={VALUE_KEY}
      renderSelected={(values, options, onChange) => (
        <div className="flex-1 flex h-full gap-1">
          {options.slice(0, maxTag).map((user: User, index) => {
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
                  onClick={(e) => {
                    e.stopPropagation();
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
          {options.length > maxTag && (
            <div className="flex items-center justify-center text-gray-500 text-xs">
              +{options.length - maxTag}
            </div>
          )}
        </div>
      )}
      renderList={(options) => (
        <>
          {allUsers.map((user, index) => (
            <Listbox.Option
              key={`${user[VALUE_KEY]}`}
              value={user}
              as={Fragment}
              ref={index === allUsers.length - 1 ? lastUserElementRef : null}
            >
              {({ selected }) => (
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
          ))}
        </>
      )}
    />
  );
}

/**
 * Helper hook to get users from ids, used to initialize user-selector from ids,
 * after loading, it will call onChange function.
 * @param ids
 * @param onChange
 */
export function useUsersFromIds(
  ids: string[],
  onChange: (value: User[]) => void
) {
  const [initialized, setInitialized] = useState<boolean>(false);

  return useQuery({
    enabled: !initialized,
    queryKey: ["users", ids],
    queryFn: async () => {
      if (!isBlank(ids)) {
        // this blank check is because unstable of useRouter of next.js
        const res = await httpClient.get<User[]>(
          `/user/list?ids=${ids.join(",")}`
        );
        onChange(res.data);
        setInitialized(true);
      }
    }
  });
}

export default SelectUser;
