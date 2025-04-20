interface RequiredLabelProps {
  children: React.ReactNode;
}

export function RequiredLabel({ children }: RequiredLabelProps) {
  return (
    <div className="flex gap-1 text-gray-300 mb-2">
      {children}
      <span className="text-red-500">*</span>
    </div>
  );
} 