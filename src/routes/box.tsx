import ColorPicker from "../components/ColorPicker";
import ResetButton from "../components/ResetButton";
import Select from "../components/Select";
import Slider from "../components/Slider";
import { useLogState } from "../store";

export default function Box() {
  const logState = useLogState();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Box
          <ResetButton
            resetFn={() => {
              logState.updateBox({
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
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <Slider
            range={[0, 100]}
            title="Margin"
            onChange={(e) => {
              logState.updateBox({
                ...logState.box,
                margin: {
                  top: e.currentTarget.value + "px",
                  right: e.currentTarget.value + "px",
                  bottom: e.currentTarget.value + "px",
                  left: e.currentTarget.value + "px",
                },
              });
            }}
            value={logState.box.margin.top.replace("px", "")}
          />
          <Slider
            range={[0, 100]}
            title="Padding"
            onChange={(e) => {
              logState.updateBox({
                ...logState.box,
                padding: {
                  top: e.currentTarget.value + "px",
                  right: e.currentTarget.value + "px",
                  bottom: e.currentTarget.value + "px",
                  left: e.currentTarget.value + "px",
                },
              });
            }}
            value={logState.box.padding.top.replace("px", "")}
          />
        </div>
      </div>
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Border
          <ResetButton
            resetFn={() => {
              logState.updateBorder({
                top: { color: "", style: "", size: "", radius: "" },
                right: { color: "", style: "", size: "", radius: "" },
                bottom: { color: "", style: "", size: "", radius: "" },
                left: { color: "", style: "", size: "", radius: "" },
              });
            }}
          />
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <ColorPicker
            title="Color"
            onChange={(e) =>
              logState.updateBorder({
                top: { ...logState.border.top, color: e.currentTarget.value },
                right: { ...logState.border.right, color: e.currentTarget.value },
                bottom: { ...logState.border.bottom, color: e.currentTarget.value },
                left: { ...logState.border.left, color: e.currentTarget.value },
              })
            }
            value={logState.border.top.color}
          />
          <Select
            title="Style"
            list={["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none"]}
            onChange={(e) => {
              logState.updateBorder({
                top: { ...logState.border.top, style: e.currentTarget.innerText },
                right: { ...logState.border.right, style: e.currentTarget.innerText },
                bottom: { ...logState.border.bottom, style: e.currentTarget.innerText },
                left: { ...logState.border.left, style: e.currentTarget.innerText },
              });
            }}
            value={logState.border.top.style}
          />
          <Slider
            title="Size"
            range={[0, 50]}
            onChange={(e) => {
              logState.updateBorder({
                top: { ...logState.border.top, size: e.currentTarget.value + "px" },
                right: { ...logState.border.right, size: e.currentTarget.value + "px" },
                bottom: { ...logState.border.bottom, size: e.currentTarget.value + "px" },
                left: { ...logState.border.left, size: e.currentTarget.value + "px" },
              });
            }}
            value={logState.border.top.size.replace("px", "")}
          />
          <Slider
            title="Radius"
            range={[0, 50]}
            onChange={(e) => {
              logState.updateBorder({
                top: { ...logState.border.top, radius: e.currentTarget.value + "px" },
                right: { ...logState.border.right, radius: e.currentTarget.value + "px" },
                bottom: { ...logState.border.bottom, radius: e.currentTarget.value + "px" },
                left: { ...logState.border.left, radius: e.currentTarget.value + "px" },
              });
            }}
            value={logState.border.top.radius.replace("px", "")}
          />
        </div>
      </div>
    </div>
  );
}
