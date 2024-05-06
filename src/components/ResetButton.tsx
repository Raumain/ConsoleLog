import ResetIcon from "../icons/reset";

type ResetButtonPropsType = {
  resetFn: () => void;
};

export default function ResetButton({ resetFn }: ResetButtonPropsType) {
  return (
    <button
      onClick={resetFn}
      className=" hover:text-dark-300 scale-75 -scale-x-75 cursor-pointer rounded-sm text-neutral-800 transition ease-in-out"
    >
      <ResetIcon />
    </button>
  );
}
