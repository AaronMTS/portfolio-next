const DEFAULT_BG = "bg-[#080808]";
const DEFAULT_BORDER_RADIUS = "rounded-sm";

export default function Loader({
  bgClass = DEFAULT_BG,
  borderRadiusClass = DEFAULT_BORDER_RADIUS,
  otherClasses = "",
}: {
  bgClass?: string;
  borderRadiusClass?: string;
  otherClasses?: string;
}) {
  return (
    <div
      className={`relative ${bgClass} ${otherClasses} ${borderRadiusClass} overflow-hidden`}
    >
      <div className="absolute top-0 left-0 size-full bg-loader -translate-x-full animate-slideFullRightLoop"></div>
    </div>
  );
}
