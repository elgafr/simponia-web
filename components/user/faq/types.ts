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