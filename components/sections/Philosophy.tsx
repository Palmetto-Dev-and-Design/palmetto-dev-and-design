import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import { cn } from '@/lib/utils';
import Button from '../primitives/Button';

/**
 * Placeholder tiles. Tile height is a flex-grow ratio so the columns fill the
 * section; the first column (row on mobile) bleeds off the section edges.
 */
const columns = [
  {
    className: '-mx-12 lg:mx-0 lg:-my-12',
    tiles: [
      { id: 'a', grow: 'grow-[1.1]' },
      { id: 'b', grow: 'grow-[2]' },
      { id: 'c', grow: 'grow-[1.6]' },
    ],
  },
  {
    className: 'ml-4 -mr-12 lg:mx-0 lg:my-3',
    tiles: [
      { id: 'd', grow: 'grow-[2]' },
      { id: 'e', grow: 'grow-[2]' },
    ],
  },
];

const Philosophy = () => (
  <section className="grid overflow-hidden lg:grid-cols-[1.6fr_1fr]">
    <div className="flex flex-col items-start gap-6 px-6 py-16 md:px-10 lg:justify-center lg:py-20 lg:pr-12 lg:pl-20">
      <h2 className="display-lg">How we think about websites</h2>
      <div className="flex max-w-lg flex-col gap-4 paragraph-xl">
        <p>
          We started this studio because we genuinely want to see small business
          owners like you succeed. We believe your website should make things
          easier for you—showing off your work, building trust & helping you win
          more jobs.
        </p>
        <p>
          Every choice we make, from design to development, is about respecting
          your time, your budget & your goals. When your business grows, we know
          we’ve done something right.
        </p>
      </div>
      <Button href="/work" variant="charcoal" iconR={<ArrowUpRightIcon />}>
        Our work
      </Button>
    </div>
    <div
      aria-hidden
      className="flex h-[340px] flex-col gap-3 pb-6 lg:h-auto lg:flex-row lg:pr-[4.5vw] lg:pb-0"
    >
      {columns.map(({ className, tiles }) => (
        <div
          key={className}
          className={cn('flex flex-1 gap-3 lg:flex-col', className)}
        >
          {tiles.map(({ id, grow }) => (
            <div
              key={id}
              className={cn('basis-0 rounded-3xl bg-sec-200', grow)}
            />
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default Philosophy;
