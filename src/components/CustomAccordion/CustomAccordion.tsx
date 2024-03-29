import { FAQItem } from '@/src/types/interfaces/ProductInterface';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
} from '@mantine/core';

export default function CustomAccordion({ faqs }: { faqs: FAQItem[] }) {
  const items = faqs.map((item) => (
    <AccordionItem key={item.id} value={item.title} variant="filled">
      <AccordionControl className="hover:bg-tertiary">
        <h5 className="text-textPrimary">{item.title}</h5>
      </AccordionControl>
      <AccordionPanel>{item.summary}</AccordionPanel>
    </AccordionItem>
  ));

  return <Accordion>{items}</Accordion>;
}
