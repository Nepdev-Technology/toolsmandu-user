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
      <AccordionControl>{item.title}</AccordionControl>
      <AccordionPanel>{item.summary}</AccordionPanel>
    </AccordionItem>
  ));

  return <Accordion defaultValue="Apples">{items}</Accordion>;
}
