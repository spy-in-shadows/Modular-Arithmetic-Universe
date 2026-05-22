import PageFrame from '../components/PageFrame';
import PrimesWorld from '../modules/primes/PrimesWorld';

export default function PrimesPage() {
  return (
    <PageFrame
      eyebrow="World 07"
      title="Prime Number Observatory"
      thesis="Prime numbers arrive like scattered stars. Viewed through the right instrument, their hidden lanes and densities begin to glow."
    >
      <PrimesWorld />
    </PageFrame>
  );
}
