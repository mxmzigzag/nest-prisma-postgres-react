import React, { useEffect, useState } from "react";

import ChevronDownIcon from "../../assets/svg/chevronDown";

type Item = { id: string; title: string };

type Props = {
  defaultText: string;
  items: Item[];
  currentItem: string | undefined;
  setItem: (item: string) => void;
};

export default function Select({
  defaultText,
  items,
  currentItem,
  setItem,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const itemsWithoutActive = items.filter((item) => item.id !== activeItem?.id);

  const handleItemClick = (item: Item) => {
    setItem(item.id);
    setIsOpen(false);
    setActiveItem(item);
  };

  useEffect(() => {
    if (currentItem) {
      const item = items.find((item) => item.id === currentItem) || null;
      setActiveItem(item);
    }
  }, [currentItem]);

  return (
    <div className="flex flex-col relative w-fit">
      <div
        className="flex items-center justify-between border-1 border-black rounded py-1 px-1.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{activeItem?.title || defaultText}</span>
        <ChevronDownIcon className={` ${isOpen && "rotate-180"}`} />
      </div>
      {isOpen && itemsWithoutActive.length ? (
        <div className="flex flex-col absolute top-full left-0 w-full bg-white border-1 border-black rounded z-10 max-h-[110px] overflow-y-scroll">
          {itemsWithoutActive.map((item) => (
            <div
              key={item.id}
              className="py-1 px-1.5 cursor-pointer hover:bg-bGrayLight"
              onClick={() => handleItemClick(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
