'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/landing-page/Footer";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h1>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
                  Lorem ipsum dolor sit amet consectetur. Porttitor euismod
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
                  Lorem ipsum dolor sit amet consectetur. Porttitor euismod
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
                  Lorem ipsum dolor sit amet consectetur. Porttitor euismod
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
                  Lorem ipsum dolor sit amet consectetur. Porttitor euismod
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
                  Lorem ipsum dolor sit amet consectetur. Porttitor euismod
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-none bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 text-white hover:text-white hover:no-underline">
                  Lorem ipsum dolor sit amet consectetur. Porttitor euismod
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 px-6 pb-4">
                  Lorem ipsum dolor sit amet consectetur. Et libero viverra velit augue sit neque id faucibus. Cras sed nisi massa maecenas netus magnis dignissim eget lorem. Augue tempor sapien ipsum tristique pellentesque. Sit senectus facilisis tempor non augmentum dolor.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
