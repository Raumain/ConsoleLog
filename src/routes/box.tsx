import { useState } from "react";
import ColorPicker from "../components/ColorPicker";
import ResetButton from "../components/ResetButton";
import Select from "../components/Select";
import Slider from "../components/Slider";
import { useLogState } from "../store";

export default function Box() {
  const logState = useLogState();
  const [isAllSides, setIsAllSides] = useState(true);
  const [isAllBorders, setIsAllBorders] = useState(true);
  const sides = ["top", "right", "bottom", "left"] as const;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Box
          <ResetButton
            resetFn={() => {
              logState.updateBox({
                ...logState.box,
                margin: {
                  top: "",
                  right: "",
                  bottom: "",
                  left: "",
                },
                padding: {
                  top: "",
                  right: "",
                  bottom: "",
                  left: "",
                },
              });
            }}
          />
          <label
            htmlFor="side-selection"
            className="text-dark-700 flex items-center gap-2 text-xs font-normal"
          >
            Apply to all sides
            <input
              hidden
              type="checkbox"
              name="side-selection"
              id="side-selection"
              className="peer"
              onChange={(e) => {
                if(e.currentTarget.checked){logState.updateBox({
                  ...logState.box,
                  margin: {
                    top: e.currentTarget.checked ? logState.box.margin.top : "",
                    right: e.currentTarget.checked ? logState.box.margin.top : "",
                    bottom: e.currentTarget.checked ? logState.box.margin.top : "",
                    left: e.currentTarget.checked ? logState.box.margin.top : "",
                  },
                  padding: {
                    top: e.currentTarget.checked ? logState.box.padding.top : "",
                    right: e.currentTarget.checked ? logState.box.padding.top : "",
                    bottom: e.currentTarget.checked ? logState.box.padding.top : "",
                    left: e.currentTarget.checked ? logState.box.padding.top : "",
                  },
                });}
                setIsAllSides(e.currentTarget.checked);
              }}
              checked={isAllSides}
            />
            <div className="border-dark-700 peer-checked:bg-secondary-500 peer-checked:hover:bg-secondary-700 peer-checked:bg-tick h-3 w-3 rounded-sm border peer-checked:border-transparent peer-checked:bg-contain"></div>
          </label>
        </h3>
        <div className="mt-4 flex flex-col gap-2">
          {isAllSides ? (
            <SideSettings />
          ) : (
            sides.map((side) => (
              <div>
                <span className="mb-0.5 flex items-center gap-2 pl-1 text-xs">
                  {side}
                  <ResetButton
                    resetFn={() => {
                      logState.updateBox({
                        ...logState.box,
                        margin: {
                          ...logState.box.margin,
                          [side]: "",
                        },
                        padding: {
                          ...logState.box.padding,
                          [side]: "",
                        },
                      });
                    }}
                  />
                </span>
                <SideSettings side={side} />
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Border
          <ResetButton
            resetFn={() => {
              logState.updateBox({
                ...logState.box,
                border: {
                  top: { color: "", style: "", size: "", radius: "" },
                  right: { color: "", style: "", size: "", radius: "" },
                  bottom: { color: "", style: "", size: "", radius: "" },
                  left: { color: "", style: "", size: "", radius: "" },
                },
              });
            }}
          />
          <label
            htmlFor="border-selection"
            className="text-dark-700 flex items-center gap-2 text-xs font-normal"
          >
            Apply to all borders
            <input
              hidden
              type="checkbox"
              name="border-selection"
              id="border-selection"
              className="peer"
              onChange={(e) => {
                if (e.currentTarget.checked)
                  logState.updateBox({
                    ...logState.box,
                    border: {
                      top: {
                        color: logState.box.border.top.color,
                        style: logState.box.border.top.style,
                        size: logState.box.border.top.size,
                        radius: logState.box.border.top.radius,
                      },
                      right: {
                        color: logState.box.border.top.color,
                        style: logState.box.border.top.style,
                        size: logState.box.border.top.size,
                        radius: logState.box.border.top.radius,
                      },
                      bottom: {
                        color: logState.box.border.top.color,
                        style: logState.box.border.top.style,
                        size: logState.box.border.top.size,
                        radius: logState.box.border.top.radius,
                      },
                      left: {
                        color: logState.box.border.top.color,
                        style: logState.box.border.top.style,
                        size: logState.box.border.top.size,
                        radius: logState.box.border.top.radius,
                      },
                    },
                  });
                setIsAllBorders(e.currentTarget.checked);
              }}
              checked={isAllBorders}
            />
            <div className="border-dark-700 peer-checked:bg-secondary-500 peer-checked:hover:bg-secondary-700 peer-checked:bg-tick h-3 w-3 rounded-sm border peer-checked:border-transparent peer-checked:bg-contain"></div>
          </label>
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          {isAllBorders ? (
            <BorderSettings />
          ) : (
            sides.map((side) => (
              <div>
                <span className="mb-0.5 flex items-center gap-2 pl-1 text-xs">
                  {side}
                  <ResetButton
                    resetFn={() => {
                      logState.updateBox({
                        ...logState.box,
                        border: {
                          ...logState.box.border,
                          [side]: { color: "", style: "", size: "", radius: "" },
                        },
                      });
                    }}
                  />
                </span>
                <BorderSettings side={side} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const SideSettings = ({ side }: { side?: "top" | "right" | "bottom" | "left" }) => {
  const logState = useLogState();
  return (
    <div className="flex flex-wrap gap-4">
      <Slider
        range={[0, 100]}
        title="Margin"
        onChange={(e) => {
          if (side) {
            logState.updateBox({
              ...logState.box,
              margin: {
                ...logState.box.margin,
                [side]: e.currentTarget.value + "px",
              },
            });
          } else {
            logState.updateBox({
              ...logState.box,
              margin: {
                top: e.currentTarget.value + "px",
                right: e.currentTarget.value + "px",
                bottom: e.currentTarget.value + "px",
                left: e.currentTarget.value + "px",
              },
            });
          }
        }}
        value={side ? logState.box.margin[side].replace("px", "") : logState.box.margin.top.replace("px", "")}
      />
      <Slider
        range={[0, 100]}
        title="Padding"
        onChange={(e) => {
          if (side) {
            logState.updateBox({
              ...logState.box,
              padding: {
                ...logState.box.padding,
                [side]: e.currentTarget.value + "px",
              },
            });
          } else {
            logState.updateBox({
              ...logState.box,
              padding: {
                top: e.currentTarget.value + "px",
                right: e.currentTarget.value + "px",
                bottom: e.currentTarget.value + "px",
                left: e.currentTarget.value + "px",
              },
            });
          }
        }}
        value={
          side ? logState.box.padding[side].replace("px", "") : logState.box.padding.top.replace("px", "")
        }
      />
    </div>
  );
};

const BorderSettings = ({ side }: { side?: "top" | "right" | "bottom" | "left" }) => {
  const logState = useLogState();
  return (
    <div className="flex flex-wrap gap-4">
      <ColorPicker
        title="Color"
        onChange={(e) => {
          if (side) {
            logState.updateBox({
              ...logState.box,
              border: {
                ...logState.box.border,
                [side]: { ...logState.box.border[side], color: e.currentTarget.value },
              },
            });
          } else {
            logState.updateBox({
              ...logState.box,
              border: {
                top: { ...logState.box.border.top, color: e.currentTarget.value },
                right: { ...logState.box.border.right, color: e.currentTarget.value },
                bottom: { ...logState.box.border.bottom, color: e.currentTarget.value },
                left: { ...logState.box.border.left, color: e.currentTarget.value },
              },
            });
          }
        }}
        value={side ? logState.box.border[side].color : logState.box.border.top.color}
      />
      <Select
        title="Style"
        list={["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none"]}
        onChange={(e) => {
          if (side) {
            logState.updateBox({
              ...logState.box,
              border: {
                ...logState.box.border,
                [side]: { ...logState.box.border[side], style: e.currentTarget.innerText },
              },
            });
          } else {
            logState.updateBox({
              ...logState.box,
              border: {
                top: { ...logState.box.border.top, style: e.currentTarget.innerText },
                right: { ...logState.box.border.right, style: e.currentTarget.innerText },
                bottom: { ...logState.box.border.bottom, style: e.currentTarget.innerText },
                left: { ...logState.box.border.left, style: e.currentTarget.innerText },
              },
            });
          }
        }}
        value={side ? logState.box.border[side].style : logState.box.border.top.style}
      />
      <Slider
        title="Size"
        range={[0, 50]}
        onChange={(e) => {
          if (side) {
            logState.updateBox({
              ...logState.box,
              border: {
                ...logState.box.border,
                [side]: { ...logState.box.border[side], size: e.currentTarget.value + "px" },
              },
            });
          } else {
            logState.updateBox({
              ...logState.box,
              border: {
                top: { ...logState.box.border.top, size: e.currentTarget.value + "px" },
                right: { ...logState.box.border.right, size: e.currentTarget.value + "px" },
                bottom: { ...logState.box.border.bottom, size: e.currentTarget.value + "px" },
                left: { ...logState.box.border.left, size: e.currentTarget.value + "px" },
              },
            });
          }
        }}
        value={
          side
            ? logState.box.border[side].size.replace("px", "")
            : logState.box.border.top.size.replace("px", "")
        }
      />
      <Slider
        title="Radius"
        range={[0, 50]}
        onChange={(e) => {
          if (side) {
            logState.updateBox({
              ...logState.box,
              border: {
                ...logState.box.border,
                [side]: { ...logState.box.border[side], radius: e.currentTarget.value + "px" },
              },
            });
          } else {
            logState.updateBox({
              ...logState.box,
              border: {
                top: { ...logState.box.border.top, radius: e.currentTarget.value + "px" },
                right: { ...logState.box.border.right, radius: e.currentTarget.value + "px" },
                bottom: { ...logState.box.border.bottom, radius: e.currentTarget.value + "px" },
                left: { ...logState.box.border.left, radius: e.currentTarget.value + "px" },
              },
            });
          }
        }}
        value={
          side
            ? logState.box.border[side].radius.replace("px", "")
            : logState.box.border.top.radius.replace("px", "")
        }
      />
    </div>
  );
};
