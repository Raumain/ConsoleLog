import { useState } from "react";
import ChevronIcon from "../icons/chevron";
import TickIcon from "../icons/tick";

type SelectPropsType = {
  title: string;
  list: string[];
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
};

export default function Select({ title, list, onChange, value }: SelectPropsType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${isOpen ? "block" : "hidden"} absolute left-0 top-0 h-screen w-screen`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="relative">
        <button
          className="border-dark-800 relative flex h-12 w-32 flex-col rounded border"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <p className="text-primary-300 px-2 pt-1 text-xs">{title}</p>
          <div className="flex w-full items-center justify-between truncate px-2 text-xs">
            {value || "none"}
            <ChevronIcon
              className={`h-4 w-4 opacity-50 transition ease-in-out ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} border-dark-800 bg-dark-900 absolute left-0 top-12 z-[99] mt-1 flex w-full flex-col rounded border p-1`}
        >
          {list.map((item) => (
            <button
              key={item}
              className={`${value === item ? "bg-primary-500" : ""} hover:bg-primary-500 my-0.5 flex w-full items-center justify-between rounded p-1 pl-2 text-start text-xs`}
              onClick={(e) => {
                onChange(e);
                setIsOpen(false);
              }}
            >
              {item}
              {value === item && <TickIcon />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
