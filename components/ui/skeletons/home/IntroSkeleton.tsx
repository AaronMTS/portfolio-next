import Loader from "../Loader";

export default function IntroSkeleton() {
  return (
    <div className="space-y-5 *:space-y-2">
      <div className="*:h-5.5 *:min-w-16">
        <Loader otherClasses="w-[96%]" />
        <Loader otherClasses="w-3/4" />
        <Loader otherClasses="w-[94%]" />
        <Loader otherClasses="w-[90%] xl:hidden" />
        <Loader otherClasses="w-[92%] lg:hidden" />
        <Loader otherClasses="w-[24%] md:hidden" />
      </div>
      <div className="*:h-5.5 *:min-w-16">
        <Loader otherClasses="w-[90%]" />
        <Loader otherClasses="w-[97%]" />
        <Loader otherClasses="w-[96%]" />
        <Loader otherClasses="w-[92%] xl:hidden" />
        <Loader otherClasses="w-[91%] lg:hidden" />
        <Loader otherClasses="w-[15%] md:hidden" />
      </div>
    </div>
  );
}
