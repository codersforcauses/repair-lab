import React, { useState, Fragment, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import SelectedOption from '@/components/Tag/tag';

const options = ['toys', 'bikes', 'furniture', 'clothing', 'jewellery', 'curtains', 'household items', 'garden tools'];

const Dropdown: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    setFilter('');
  };

  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter(i => i !== item));
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div className="flex border border-gray-300 rounded">
        <div className="flex flex-wrap items-center p-1 flex-grow">
          {selectedItems.map((item) => (
            <SelectedOption key={item} option={item} onRemove={removeItem} />
          ))}
          {/* Adjusted condition for displaying the input */}
          {(!selectedItems.length || isOpen) && (
            <input
              ref={inputRef}
              type="text"
              className="flex-1 p-1 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder="Add Skills"
            />
          )}
        </div>
        <Menu.Button
          className="px-4 py-2 bg-primary-600 text-white rounded-r-md"
          onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
        >
          {isOpen ? '-' : '+'}
        </Menu.Button>
      </div>
      {isOpen && (
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-auto"
          >
            <div className="px-1 py-1">
              {filteredOptions.map((option) => (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <button
                      onClick={() => toggleItem(option)}
                      className={`${active ? 'bg-lightAqua-500 text-white' : 'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {option}
                    </button>
                  )}
                </Menu.Item>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">No skills found</div>
              )}
            </div>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default Dropdown;






