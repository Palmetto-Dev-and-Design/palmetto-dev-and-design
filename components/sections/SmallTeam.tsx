import {
  ChatsCircleIcon,
  ShapesIcon,
  SmileyIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react/ssr';

const reasons = [
  {
    icon: UsersThreeIcon,
    text: 'You work directly with us—no middlemen or hand-offs',
  },
  {
    icon: ShapesIcon,
    text: 'Design & development go hand in hand from day one',
  },
  {
    icon: ChatsCircleIcon,
    text: 'Communication is clear, quick & straightforward',
  },
  {
    icon: SmileyIcon,
    text: 'You get a personal, invested relationship every step of the way',
  },
];

const SmallTeam = () => (
  <section className="bg-pri-500 pt-[81px] pb-[122px] text-fg-inverse lg:pt-[101px] lg:pb-[182px]">
    <div className="h-px w-[55%] bg-fg-inverse/40 lg:w-[30%]" />
    <div className="mx-auto max-w-6xl px-6 pt-10 md:px-10 lg:px-20 lg:pt-20">
      <h2 className="heading-2-mobile uppercase lg:heading-2-desktop">
        Why a small team works better:
      </h2>
      <ul className="mt-12 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-16">
        {reasons.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex max-w-[16rem] flex-col gap-4 max-sm:mx-auto"
          >
            <Icon size={28} weight="fill" aria-hidden />
            <p className="heading-4-mobile">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SmallTeam;
