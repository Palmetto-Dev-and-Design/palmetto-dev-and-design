export type Faq = {
  question: string;
  answer: string;
};

const placeholder =
  'Answer coming soon. This is placeholder text until we finalize the answer to this question.';

export const faqs: Faq[] = [
  { question: 'How much does a website cost?', answer: placeholder },
  { question: 'How long does a project take?', answer: placeholder },
  { question: 'Can you redesign my existing website?', answer: placeholder },
  { question: 'Do I need to provide the content?', answer: placeholder },
  {
    question: 'Will I be able to edit the website myself?',
    answer: placeholder,
  },
  { question: 'Do you provide hosting?', answer: placeholder },
  { question: 'What happens after launch?', answer: placeholder },
  {
    question: 'Do you work with my existing domain?',
    answer: placeholder,
  },
  { question: 'Do you offer SEO?', answer: placeholder },
];
