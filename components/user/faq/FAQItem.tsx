import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FAQItemProps } from "./types";

export function FAQItem({ item }: FAQItemProps) {
  return (
    <AccordionItem 
      value={item.id} 
      className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-300 px-6 pb-4">
        {item.answer}
      </AccordionContent>
    </AccordionItem>
  );
} 