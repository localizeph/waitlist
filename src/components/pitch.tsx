import AnimationContainer from "~/components/global/animation-container";
import MaxWidthWrapper from "~/components/global/max-width-wrapper";

export function Pitch() {
  const BENEFITS = [{
    key: 1,
    title: "Built for Scalability",
    description: "Localize is engineered for fast-paced environments and modern technologies."
  },
  {
    key: 2,
    title: "Powered by Cloud",
    description: "Designed for digital workflows. From campaign creation, planning, launching, and tracking campaigns."
  },
  {
    key: 3,
    title: "Maximized for Efficiency",
    description: "Localize eliminates resource waste and labor costs to maximize brand awareness, recall, and ROI."
  }];

  return <>
    {/* The pitch */}
    <MaxWidthWrapper>
      <AnimationContainer delay={0.1}>
        <div className="flex flex-col w-full items-center justify-center py-8">
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl leading-[1.15] font-medium font-heading text-muted-foreground mt-6">
            <span className="text-foreground font-semibold">The foundation for transit media.</span>{' '}
            Purpose-built for digital advertisers with cloud orchestration at its core,
            Localize gives you one place to launch, track, and scale advertisements.
          </h2>
        </div>

        {/* Benefits */}
        <div className="flex md:grid md:grid-cols-3 w-full gap-2 py-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {BENEFITS.map((benefit) => (
            <div key={benefit.key} className="flex flex-col gap-4 min-w-[80vw] md:min-w-0 snap-start border bg-card rounded-sm p-4">
              {/* Square placeholder figure */}
              <div className="w-full aspect-square rounded-md bg-foreground/10 border border-dashed border-foreground/20 flex items-center justify-center">
                <span className="text-xs text-muted-foreground/30">IMG</span>
              </div>

              <div className="flex flex-col items-start justify-start gap-2">
                <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  </>
}