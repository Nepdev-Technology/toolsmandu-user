import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
} from '@mantine/core';
import { FAQItem } from '../ProductArea/ScrollArea/ScrollArea';

export default function CustomAccordion({ faqs }: { faqs: FAQItem[] }) {
  const items = faqs.map((item) => (
    <AccordionItem key={item.id} value={item.title}>
      <AccordionControl>{item.title}</AccordionControl>
      <AccordionPanel>{item.summary}</AccordionPanel>
    </AccordionItem>
  ));

  return <Accordion defaultValue="Apples">{items}</Accordion>;
}
