import ColorPicker from "../components/ColorPicker";
import ResetButton from "../components/ResetButton";
import Select from "../components/Select";
import Slider from "../components/Slider";
import CloseIcon from "../icons/close";
import PlusIcon from "../icons/plus";
import { useLogState } from "../store";

export default function Text() {
  const logState = useLogState();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Text
          <ResetButton
            resetFn={() => {
              logState.updateText({
                ...logState.text,
                color: "",
                family: "",
                size: "",
                style: "",
                decoration: "",
                weight: "",
                transform: "",
              });
            }}
          />
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <ColorPicker
            title="Color"
            onChange={(e) =>
              logState.updateText({
                ...logState.text,
                color: e.currentTarget.value,
              })
            }
            value={logState.text.color}
          />
          <Select
            title="Font family"
            list={[
              "Arial",
              "Verdana",
              "Tahoma",
              "Trebuchet MS",
              "Times New Roman",
              "Georgia",
              "Garamond",
              "Courier New",
              "Brush Script MT",
              "Comic Sans MS",
              "Monospace"
            ]}
            onChange={(e) => {
              logState.updateText({
                ...logState.text,
                family: e.currentTarget.innerText,
              });
            }}
            value={logState.text.family}
          />
          <Slider
            title="Size"
            range={[0, 50]}
            onChange={(e) =>
              logState.updateText({
                ...logState.text,
                size: e.currentTarget.value + "px",
              })
            }
            value={logState.text.size.replace("px", "") || "16"}
          />
          <Select
            title="Style"
            list={["normal", "italic", "oblique"]}
            onChange={(e) =>
              logState.updateText({
                ...logState.text,
                style: e.currentTarget.innerText,
              })
            }
            value={logState.text.style}
          />
          <Select
            title="Decoration"
            list={["none", "underline", "overline", "line-through"]}
            onChange={(e) =>
              logState.updateText({
                ...logState.text,
                decoration: e.currentTarget.innerText,
              })
            }
            value={logState.text.decoration}
          />
          <Slider
            title="Weight"
            range={[100, 900]}
            step={100}
            onChange={(e) =>
              logState.updateText({
                ...logState.text,
                weight: e.currentTarget.value,
              })
            }
            value={logState.text.weight || "400"}
          />
          <Select
            title="Transform"
            list={["none", "capitalize", "uppercase", "lowercase"]}
            onChange={(e) =>
              logState.updateText({
                ...logState.text,
                transform: e.currentTarget.innerText,
              })
            }
            value={logState.text.transform}
          />
        </div>
      </div>
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Shadow
          <ResetButton
            resetFn={() => {
              logState.updateText({
                ...logState.text,
                shadow: [{ color: "", x: "", y: "", blur: "" }],
              });
            }}
          />
        </h3>
        <div className="mt-4 flex flex-col flex-wrap gap-4">
          {logState.text.shadow.map((_, index) => (
            <div className="flex gap-4">
              <ColorPicker
                title="Color"
                onChange={(e) =>
                  logState.updateText({
                    ...logState.text,
                    shadow: logState.text.shadow.map(({ color, x, y, blur }, i) => {
                      if (i === index) return { color: e.target.value, x, y, blur };
                      return { color, x, y, blur };
                    }),
                  })
                }
                value={logState.text.shadow[index].color}
              />
              <Slider
                title="Horizontal"
                range={[-20, 20]}
                step={1}
                unit="px"
                onChange={(e) =>
                  logState.updateText({
                    ...logState.text,
                    shadow: logState.text.shadow.map(({ color, x, y, blur }, i) => {
                      if (i === index) return { color, x: e.currentTarget.value + "px", y, blur };
                      return { color, x, y, blur };
                    }),
                  })
                }
                value={logState.text.shadow[index].x.replace("px", "")}
              />
              <Slider
                title="Vertical"
                range={[-20, 20]}
                step={1}
                unit="px"
                onChange={(e) =>
                  logState.updateText({
                    ...logState.text,
                    shadow: logState.text.shadow.map(({ color, x, y, blur }, i) => {
                      if (i === index) return { color, x, y: e.currentTarget.value + "px", blur };
                      return { color, x, y, blur };
                    }),
                  })
                }
                value={logState.text.shadow[index].y.replace("px", "")}
              />
              <Slider
                title="Blur"
                range={[0, 20]}
                step={1}
                unit="px"
                onChange={(e) =>
                  logState.updateText({
                    ...logState.text,
                    shadow: logState.text.shadow.map(({ color, x, y, blur }, i) => {
                      if (i === index) return { color, x, y, blur: e.currentTarget.value + "px" };
                      return { color, x, y, blur };
                    }),
                  })
                }
                value={logState.text.shadow[index].blur.replace("px", "")}
              />
              {index > 0 && (
                <button
                  className="text-dark-700 hover:text-dark-300 scale-90 cursor-pointer transition ease-in-out hover:scale-100"
                  onClick={() => {
                    logState.updateText({
                      ...logState.text,
                      shadow: logState.text.shadow.filter((_, i) => i !== index),
                    });
                  }}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-primary-500 hover:bg-primary-600 flex w-fit items-center gap-2 rounded-sm p-2 text-xs transition ease-in-out"
            onClick={() => {
              logState.updateText({
                ...logState.text,
                shadow: [...logState.text.shadow, { color: "", x: "", y: "", blur: "" }],
              });
            }}
          >
            <PlusIcon />
            Add shadow
          </button>
        </div>
      </div>
    </div>
  );
}
