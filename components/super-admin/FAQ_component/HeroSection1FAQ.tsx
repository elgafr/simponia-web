import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function HeroSection1FAQ() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] px-6">
      <div className="w-full max-w-7xl rounded-lg shadow-2xl p-6">
        <h2 className="text-4xl font-bold text-white text-left mb-10">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          {/* FAQ Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-white text-2xl font-semibold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-xl">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-white text-2xl font-semibold">
              Can I use it for commercial projects?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-xl">
              Yes, this component is free to use in any project.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-white text-2xl font-semibold">
              Is it customizable?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-xl">
              Yes, you can easily customize the styles with Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

export default HeroSection1FAQ;
