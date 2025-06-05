'use client';

import { FAQList } from "@/components/user/faq/FAQList";
import type { FAQItem } from "@/components/user/faq/types";

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

export default function FAQClient() {
  return (
    <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-30">
      <FAQList items={faqItems} />
    </main>
  );
} 