import PageFrame from '../components/PageFrame';
import RandomnessWorld from '../modules/randomness/RandomnessWorld';

export default function RandomnessPage() {
  return (
    <PageFrame
      eyebrow="World 05"
      title="Randomness Illusion Lab"
      thesis="Humans avoid clumps because clumps look suspicious. Actual randomness is messier, less polite, and more clustered than our instincts expect."
    >
      <RandomnessWorld />
    </PageFrame>
  );
}
