import Hero from '@/components/sections/Hero';
import ProblemStatement from '@/components/sections/ProblemStatement';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import TechnologyDeepDive from '@/components/sections/TechnologyDeepDive';
import LiveDemo from '@/components/sections/LiveDemo';
import SocialProof from '@/components/sections/SocialProof';
import ComparisonTable from '@/components/sections/ComparisonTable';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemStatement />
      <HowItWorks />
      <Features />
      <TechnologyDeepDive />
      <LiveDemo />
      <SocialProof />
      <ComparisonTable />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
