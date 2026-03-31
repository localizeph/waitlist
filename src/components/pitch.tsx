import AnimationContainer from "~/components/global/animation-container";
import MaxWidthWrapper from "~/components/global/max-width-wrapper";

export function Pitch() {
  return <>
    {/* The pitch */}
    <MaxWidthWrapper>
      <AnimationContainer delay={0.1}>
        <div className="flex flex-col w-full items-center justify-center py-8">
          <h2 className="text-center text-2xl md:text-5xl leading-[1.15] font-medium font-heading text-muted-foreground mt-6">
            <span className="text-foreground font-semibold">The foundation for transit media.</span>{' '}
            Purpose-built for digital advertisers with cloud orchestration at its core,
            Localize gives you one place to launch, track, and scale advertisements.
          </h2>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  </>
}