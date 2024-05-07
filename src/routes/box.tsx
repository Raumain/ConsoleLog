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
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <ColorPicker
            title="Color"
            onChange={(e) =>
              logState.updateBox({
                ...logState.box,
                border: {
                  top: { ...logState.box.border.top, color: e.currentTarget.value },
                  right: { ...logState.box.border.right, color: e.currentTarget.value },
                  bottom: { ...logState.box.border.bottom, color: e.currentTarget.value },
                  left: { ...logState.box.border.left, color: e.currentTarget.value },
                },
              })
            }
            value={logState.box.border.top.color}
          />
          <Select
            title="Style"
            list={["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none"]}
            onChange={(e) => {
              logState.updateBox({
                ...logState.box,
                border: {
                  top: { ...logState.box.border.top, style: e.currentTarget.innerText },
                  right: { ...logState.box.border.right, style: e.currentTarget.innerText },
                  bottom: { ...logState.box.border.bottom, style: e.currentTarget.innerText },
                  left: { ...logState.box.border.left, style: e.currentTarget.innerText },
                },
              });
            }}
            value={logState.box.border.top.style}
          />
          <Slider
            title="Size"
            range={[0, 50]}
            onChange={(e) => {
              logState.updateBox({
                ...logState.box,
                border: {
                  top: { ...logState.box.border.top, size: e.currentTarget.value + "px" },
                  right: { ...logState.box.border.right, size: e.currentTarget.value + "px" },
                  bottom: { ...logState.box.border.bottom, size: e.currentTarget.value + "px" },
                  left: { ...logState.box.border.left, size: e.currentTarget.value + "px" },
                },
              });
            }}
            value={logState.box.border.top.size.replace("px", "")}
          />
          <Slider
            title="Radius"
            range={[0, 50]}
            onChange={(e) => {
              logState.updateBox({
                ...logState.box,
                border: {
                  top: { ...logState.box.border.top, radius: e.currentTarget.value + "px" },
                  right: { ...logState.box.border.right, radius: e.currentTarget.value + "px" },
                  bottom: { ...logState.box.border.bottom, radius: e.currentTarget.value + "px" },
                  left: { ...logState.box.border.left, radius: e.currentTarget.value + "px" },
                },
              });
            }}
            value={logState.box.border.top.radius.replace("px", "")}
          />
        </div>
      </div>
    </div>
  );
}
