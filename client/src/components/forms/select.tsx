import React, { useState } from "react";

import ChevronDownIcon from "../../assets/svg/chevronDown";

type Item = { id: string; title: string };

type Props = {
  defaultText: string;
  items: Item[];
  setItem: (item: string) => void;
};

export default function Select({ defaultText, items, setItem }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const itemsWithoutActive = items.filter((item) => item.id !== activeItem?.id);

  const handleItemClick = (item: Item) => {
    setItem(item.id);
    setIsOpen(false);
    setActiveItem(item);
  };

  return (
    <div className="select-wrapper">
      <div className="select-selected" onClick={() => setIsOpen(!isOpen)}>
        <span>{activeItem?.title || defaultText}</span>
        <ChevronDownIcon className={` ${isOpen && "select-icon-open"}`} />
      </div>
      {isOpen && itemsWithoutActive.length ? (
        <div className={`select-list`}>
          {itemsWithoutActive.map((item) => (
            <div
              key={item.id}
              className="select-list-item"
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
