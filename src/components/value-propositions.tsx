import { BentoCard, BentoGrid, CARDS } from "~/components/bento-grid";
import AnimationContainer from "~/components/global/animation-container";
import MaxWidthWrapper from "~/components/global/max-width-wrapper";

export function ValuePropositions() {
  return <>
    {/* Features Section */}
    <MaxWidthWrapper>
      <AnimationContainer delay={0.2}>
        <BentoGrid className="py-8">
          {CARDS.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </AnimationContainer>
    </MaxWidthWrapper></>
}