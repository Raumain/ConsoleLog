type ColorPickerPropsType = {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function ColorPicker({ title, onChange, value }: ColorPickerPropsType) {
  return (
    <div className="border-dark-800 text-primary-300 flex h-12 w-32 rounded border p-1">
      <div className="flex w-1/2 flex-col">
        <p className="pl-1 text-xs">{title}</p>
        <input
          type="color"
          className="h-1/2 border-transparent bg-transparent pl-1"
          onChange={onChange}
          value={value}
        />
      </div>
      <div className="w-1/2">
        <input
          type="text"
          maxLength={7}
          className="w-full bg-transparent pb-0.5 pt-4 text-xs text-white outline-none"
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
