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

        {/* Benefits */}
        <div className="flex md:grid md:grid-cols-3 w-full gap-4 py-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
          <div className="flex flex-col gap-4 min-w-[80vw] md:min-w-0 snap-start">
            <div className="w-full aspect-square rounded-lg border border-dashed border-foreground/20 bg-foreground/5 flex items-start justify-start p-4 text-xs text-muted-foreground/40 uppercase tracking-widest">
              FIG 0.1
            </div>
            <h3 className="text-sm font-semibold text-foreground">Built for Scalability</h3>
            <p className="text-sm text-muted-foreground">
              Engineered specifically for transit environments to enable real-time content uploading, scheduling, and city-wide synchronization.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-w-[80vw] md:min-w-0 snap-start">
            <div className="w-full aspect-square rounded-lg border border-dashed border-foreground/20 bg-foreground/5 flex items-start justify-start p-4 text-xs text-muted-foreground/40 uppercase tracking-widest">
              FIG 0.2
            </div>
            <h3 className="text-sm font-semibold text-foreground">Powered by Cloud</h3>
            <p className="text-sm text-muted-foreground">
              Gives advertisers flexible, measurable access to high-frequency commuter audiences while unlocking new digital revenue streams for transport cooperatives.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-w-[80vw] md:min-w-0 snap-start">
            <div className="w-full aspect-square rounded-lg border border-dashed border-foreground/20 bg-foreground/5 flex items-start justify-start p-4 text-xs text-muted-foreground/40 uppercase tracking-widest">
              FIG 0.3
            </div>
            <h3 className="text-sm font-semibold text-foreground">Designed for Efficiency</h3>
            <p className="text-sm text-muted-foreground">
              Eliminates physical waste and costly manpower dependencies, ensuring consistent playback even in mobile, network-variable environments.
            </p>
          </div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  </>
}