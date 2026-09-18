import Loader from "./Loader";

export default function ProjectsPageSkeleton({
  projectQuantity,
}: {
  projectQuantity: number;
}) {
  return (
    <div className="space-y-12">
      {Array.from({ length: projectQuantity }).map((_, index) => {
        let additionalClasses = "md:flex-row";

        const isEvenCard = (index + 1) % 2 === 0;
        if (isEvenCard) additionalClasses = `md:flex-row-reverse md:ms-auto`;

        return (
          <div
            key={index}
            className={`w-full flex flex-col ${additionalClasses} lg:w-95/100`}
          >
            <Loader
              bgClass="bg-surface"
              borderRadiusClass="rounded-none"
              otherClasses="shrink-0 max-md:h-68 md:grow"
            ></Loader>
            <div className="space-y-6 bg-lighterBg p-10 md:w-45/100">
              <div className="space-y-5">
                <div className="flex gap-3 justify-between items-center">
                  <Loader
                    bgClass="bg-accent/10"
                    borderRadiusClass="rounded-none"
                    otherClasses="h-6.25 w-23.75"
                  ></Loader>
                  <Loader
                    bgClass="bg-surfaceLower"
                    borderRadiusClass="rounded-none"
                    otherClasses="h-6.25 w-40"
                  ></Loader>
                </div>
                <ul className="flex gap-3 flex-wrap *:bg-surfaceLower">
                  <Loader otherClasses="h-7 w-17"></Loader>
                  <Loader otherClasses="h-7 w-17"></Loader>
                  <Loader otherClasses="h-7 w-17"></Loader>
                  <Loader otherClasses="h-7 w-17"></Loader>
                </ul>
              </div>
              <div className="space-y-3 mb-6">
                <Loader
                  bgClass="bg-surfaceLower"
                  otherClasses="h-[37.5px] w-91/100"
                ></Loader>
                <div className="space-y-0.75 w-full *:bg-surfaceLower">
                  <Loader otherClasses="h-5.5 w-93/100"></Loader>
                  <Loader otherClasses="h-5.5 w-95/100"></Loader>
                  <Loader otherClasses="h-5.5 w-80/100"></Loader>
                </div>
              </div>
              <Loader
                bgClass="bg-surfaceLower"
                otherClasses="h-5.5 w-29.5"
              ></Loader>
            </div>
          </div>
        );
      })}
    </div>
  );
}
