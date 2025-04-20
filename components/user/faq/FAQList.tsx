import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./FAQItem";
import type { FAQListProps } from "./types";

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item) => (
            <FAQItem key={item.id} item={item} />
          ))}
        </Accordion>
      </div>
    </div>
  );
} 