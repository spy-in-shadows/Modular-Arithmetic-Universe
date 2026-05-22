import RandomFieldCanvas from './RandomFieldCanvas';

export default function ComparisonGrid({ fakeAnalysis, fakeHumanPoints, humanAnalysis, humanPoints, phase, rngAnalysis, rngPoints, showClusters, showEntropy, onPoint }) {
  if (phase === 'entry' || phase === 'human') {
    return (
      <section className="absolute inset-x-4 top-[54%] z-10 -translate-y-1/2 md:inset-x-10">
        <div className="mx-auto max-w-4xl">
          <RandomFieldCanvas analysis={humanAnalysis} label="Human randomness field" mode="click" onPoint={onPoint} points={humanPoints} showClusters={showClusters} showEntropy={showEntropy} />
        </div>
      </section>
    );
  }

  return (
    <section className="absolute inset-x-4 top-[55%] z-10 -translate-y-1/2 md:left-6 md:right-[27rem]">
      <div className="grid gap-3 md:grid-cols-3">
        <RandomFieldCanvas analysis={humanAnalysis} label="Human" mode="view" points={humanPoints} showClusters={showClusters} showEntropy={showEntropy} tone="103,232,249" />
        <RandomFieldCanvas analysis={rngAnalysis} label="True RNG" mode="view" points={rngPoints} showClusters={showClusters} showEntropy={showEntropy} tone="244,114,182" />
        <RandomFieldCanvas analysis={fakeAnalysis} label="Human-like fake" mode="view" points={fakeHumanPoints} showClusters={showClusters} showEntropy={showEntropy} tone="250,204,21" />
      </div>
    </section>
  );
}
