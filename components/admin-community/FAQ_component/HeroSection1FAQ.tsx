'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";


// Define interfaces
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQItemProps {
  item: FAQItem;
}

export interface FAQListProps {
  items: FAQItem[];
}

// FAQItem Component
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

// FAQList Component
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

// FAQ Items Data
const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "Lorem ipsum dolor sit amet consectetur. Porttitor euismod",
    answer: "Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor."
  },
  {
    id: "item-2",
    question: "Lorem ipsum dolor sit amet consectetur. Porttitor euismod",
    answer: "Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor."
  },
  {
    id: "item-3",
    question: "Lorem ipsum dolor sit amet consectetur. Porttitor euismod",
    answer: "Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor."
  },
  {
    id: "item-4",
    question: "Lorem ipsum dolor sit amet consectetur. Porttitor euismod",
    answer: "Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor."
  },
  {
    id: "item-5",
    question: "Lorem ipsum dolor sit amet consectetur. Porttitor euismod",
    answer: "Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor."
  },
  {
    id: "item-6",
    question: "Lorem ipsum dolor sit amet consectetur. Porttitor euismod",
    answer: "Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor."
  }
];

// Main HeroSection1FAQ Component
export default function HeroSection1FAQ() {
  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 py-30">
      <FAQList items={faqItems} />
    </main>
  );
}