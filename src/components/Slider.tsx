type SliderPropsType = {
  title: string;
  range: [number, number];
  step?: number;
  unit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Slider({ title, range, step = 1, unit = "px", onChange, value }: SliderPropsType) {
  return (
    <div className="border-dark-800 flex h-12 w-32 flex-col items-center gap-2 rounded border">
      <div className="flex w-full items-center justify-between">
        <p className="text-primary-300 px-2 pt-1 text-xs">{title}</p>
        <p className="text-primary-300 px-2 pt-1 text-[10px]">
          {value || 0}
          {unit}
        </p>
      </div>
      <input
        type="range"
        step={step}
        value={value || 0}
        onChange={onChange}
        min={range[0]}
        max={range[1]}
        className="[&::-webkit-slider-thumb] bg-dark-800 [&::-webkit-slider-thumb]:bg-primary-400 [&::-webkit-slider-thumb]:hover:bg-primary-300 w-28 appearance-none rounded-lg bg-transparent [&::-webkit-slider-runnable-track]:rounded [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:active:scale-110"
      />
    </div>
  );
}
