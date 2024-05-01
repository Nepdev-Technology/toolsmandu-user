import { FAQItem } from '@/src/types/interfaces/ProductInterface';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
} from '@mantine/core';

export default function CustomAccordion({ faqs }: { faqs: FAQItem[] }) {
  const items = faqs.map((item) => (
    <AccordionItem key={item.id} value={item.title}>
      <AccordionControl
        className="hover:bg-tertiary  "
        classNames={{
          chevron: 'text-textPrimary',
        }}
      >
        <h5 className="text-textPrimary">{item.title}</h5>
      </AccordionControl>
      <AccordionPanel>{item.summary}</AccordionPanel>
    </AccordionItem>
  ));

  return (
    <>
      <h1 className="sm:text-1xl xs:text-lg  md:text-1xl  font-bold">
        Frequently asked questions
        <Accordion
          classNames={{
            content: 'bg-tertiary',
            item: 'bg-primary',
          }}
        >
          {items}
        </Accordion>
      </h1>
    </>
  );
}
