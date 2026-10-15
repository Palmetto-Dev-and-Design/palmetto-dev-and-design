'use client';

import { ArrowUpRightIcon, CaretDownIcon } from '@phosphor-icons/react/ssr';
import { useId, useState } from 'react';
import type { Faq as FaqItem } from '@/lib/faqs';
import { cn } from '@/lib/utils';
import Button from '../primitives/Button';

/** Questions that open to show their answers, one at a time. */
const Faq = ({ id, faqs }: { id: string; faqs: FaqItem[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <section
      id={id}
      className="scroll-mt-4 bg-sec-200 px-6 py-16 lg:px-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_minmax(0,38rem)] lg:gap-x-16 xl:grid-cols-[minmax(0,22rem)_minmax(0,38rem)]">
        <h2 className="display-lg px-4 text-[4rem] leading-none text-pri-600 lg:px-0 lg:text-[3.5rem]">
          FAQ
        </h2>

        <div>
          <ul className="border-t border-sec-50/60">
            {faqs.map(({ question, answer }, i) => {
              const isOpen = open === i;
              return (
                <li key={question} className="border-b border-sec-50/60">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${base}-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-4 text-left lg:py-[18px]"
                    >
                      <span className="paragraph-body-semibold">
                        {question}
                      </span>
                      <CaretDownIcon
                        weight="fill"
                        aria-hidden
                        className={cn(
                          'size-4 shrink-0 text-pri-600 transition-transform duration-300 motion-reduce:transition-none',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>
                  </h3>
                  <div
                    id={`${base}-${i}`}
                    className={cn(
                      'grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none',
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="paragraph-body px-4 pb-5 text-fg-muted">
                        {answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col items-end gap-4 lg:flex-row lg:items-center lg:justify-end lg:gap-5">
            <p className="paragraph-body">Still have questions?</p>
            <Button
              href="/contact"
              variant="secondary"
              size="xs"
              iconR={<ArrowUpRightIcon />}
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
