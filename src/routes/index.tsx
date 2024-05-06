import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useLogState } from "../store";
import { useState } from "react";

export default function Main() {
  const logState = useLogState();
  const [tooltipContent, setTooltipContent] = useState("Copy");

  function handleCopy() {
    setTooltipContent("Copied!");
    setTimeout(() => {
      setTooltipContent("Copy");
    }, 3000);

    navigator.clipboard.writeText(logState.getConsoleLog());
  }

  return (
    <div className="bg-dark-900 font-outfit flex h-screen flex-col text-white">
      <Nav />
      <div className="flex h-[90%] w-full p-2 max-sm:flex-col">
        <div className="flex w-2/3 flex-col max-sm:w-full">
          <div className="bg-dark-950 border-dark-800 m-0.5 h-1/3 rounded-sm border p-2">
            <h3 className="text-primary-500 text-lg font-bold">Content to log</h3>
            <input
              type="text"
              className="bg-dark-900 mt-2 w-full rounded-sm p-1"
              onChange={(e) => logState.updateContent(e.currentTarget.value)}
              value={logState.content}
            />
          </div>
          <div className="bg-dark-950 border-dark-800 m-0.5 h-2/3 overflow-y-auto overflow-x-hidden rounded-sm border p-2">
            <Outlet />
          </div>
        </div>
        <div className="flex w-1/3 flex-col max-sm:w-full">
          <div className="bg-dark-950 border-dark-800 m-0.5 flex h-1/2 flex-col rounded-sm border p-2">
            <h3 className="text-primary-500 text-lg font-bold">Render</h3>
            <div className="bg-dark-900 mt-4 flex h-full w-full items-center justify-center rounded-sm">
              <div className="border-y-dark-800 relative w-full border-y p-2">
                <span className="text-dark-600 absolute right-0 top-0 pr-2 pt-1 font-mono text-xs underline">
                  index.ts:1
                </span>
                <p
                  className="w-fit"
                  key={JSON.stringify(logState.getCssStyle())}
                  style={logState.getCssStyle()}
                >
                  {logState.content}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-dark-950 border-dark-800 m-0.5 flex h-1/2 flex-col overflow-y-auto overflow-x-hidden rounded-sm border p-2">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-primary-500 text-lg font-bold">Code</h3>
              <button
                className="bg-dark-950 border-dark-800 hover:bg-dark-800 active:bg-dark-900 active:border-dark-800 disabled:bg-dark-800 rounded border px-2 py-1 text-xs transition ease-in-out"
                disabled={tooltipContent === "Copied!"}
                onClick={handleCopy}
              >
                {tooltipContent}
              </button>
            </div>
            <pre className="mt-4 h-full w-full text-wrap rounded-sm bg-neutral-900 p-1">
              {logState.getConsoleLog()}
            </pre>
          </div>
        </div>
      </div>
      <span className="flex items-center justify-center w-full text-xs text-primary-400">Made with love by Raumain • 2024</span>
    </div>
  );
}