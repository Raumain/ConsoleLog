import ColorPicker from "../components/ColorPicker";
import ResetButton from "../components/ResetButton";
import Select from "../components/Select";
import Slider from "../components/Slider";
import CloseIcon from "../icons/close";
import PlusIcon from "../icons/plus";
import { useLogState } from "../store";

export default function Background() {
  const logState = useLogState();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Color
          <ResetButton
            resetFn={() => {
              logState.updateBackground({
                ...logState.background,
                color: "",
              });
            }}
          />
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          <ColorPicker
            title="Color"
            onChange={(e) =>
              logState.updateBackground({
                ...logState.background,
                color: e.currentTarget.value,
              })
            }
            value={logState.background.color}
          />
        </div>
      </div>
      <div>
        <h3 className="text-primary-500 flex items-center gap-4 text-lg font-bold">
          Gradient
          <ResetButton
            resetFn={() => {
              logState.updateBackground({
                ...logState.background,
                gradient: {
                  type: "none",
                  direction: "",
                  colors: [
                    ["", "0%"],
                    ["", "100%"],
                  ],
                },
              });
            }}
          />
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex gap-4">
            <Select
              title="Type"
              list={["linear-gradient", "radial-gradient", "none"]}
              onChange={(e) =>
                logState.updateBackground({
                  ...logState.background,
                  gradient: {
                    ...logState.background.gradient,
                    type: e.currentTarget.innerText,
                  },
                })
              }
              value={logState.background.gradient.type}
            />
            {logState.background.gradient.type === "radial-gradient" ? (
              <></>
            ) : (
              <Slider
                title="Direction"
                range={[0, 360]}
                step={1}
                unit="deg"
                onChange={(e) => {
                  logState.updateBackground({
                    ...logState.background,
                    gradient: {
                      ...logState.background.gradient,
                      direction: e.currentTarget.value + "deg,",
                    },
                  });
                }}
                value={logState.background.gradient.direction.replace("deg,", "")}
              />
            )}
          </div>
          {logState.background.gradient.colors.map((_, index) => (
            <div className="flex items-center gap-4">
              <ColorPicker
                title="Color"
                onChange={(e) => {
                  logState.updateBackground({
                    ...logState.background,
                    gradient: {
                      ...logState.background.gradient,
                      colors: logState.background.gradient.colors.map(([color, position], i) => {
                        if (i === index) return [e.target.value, position];
                        return [color, position];
                      }),
                    },
                  });
                }}
                value={logState.background.gradient.colors[index][0]}
              />
              <Slider
                title="Position"
                range={[0, 100]}
                step={1}
                unit="%"
                onChange={(e) =>
                  logState.updateBackground({
                    ...logState.background,
                    gradient: {
                      ...logState.background.gradient,
                      colors: logState.background.gradient.colors.map(([color, position], i) => {
                        if (i === index) return [color, e.target.value + "%"];
                        return [color, position];
                      }),
                    },
                  })
                }
                value={logState.background.gradient.colors[index][1].replace("%", "")}
              />
              {index > 1 && (
                <button
                  className="text-dark-700 hover:text-dark-300 scale-90 cursor-pointer transition ease-in-out hover:scale-100"
                  onClick={() => {
                    logState.updateBackground({
                      ...logState.background,
                      gradient: {
                        ...logState.background.gradient,
                        colors: logState.background.gradient.colors.filter((_, i) => i !== index),
                      },
                    });
                  }}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          ))}
          <div>
            <button
              className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2 rounded-sm p-2 text-xs transition ease-in-out"
              onClick={() => {
                logState.updateBackground({
                  ...logState.background,
                  gradient: {
                    ...logState.background.gradient,
                    colors: [...logState.background.gradient.colors, ["", "100%"]],
                  },
                });
              }}
            >
              <PlusIcon />
              Add color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
