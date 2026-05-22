import PageFrame from '../components/PageFrame';
import CollatzWorld from '../modules/collatz/CollatzWorld';

export default function CollatzPage() {
  return (
    <PageFrame
      eyebrow="World 06"
      title="The Collatz Machine"
      thesis="If a number is even, halve it. If it is odd, triple it and add one. A tiny rule creates behavior nobody has fully tamed."
    >
      <CollatzWorld />
    </PageFrame>
  );
}
