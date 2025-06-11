interface ShowcaseHeaderProps {
  title: string;
  description: string;
}

export function ShowcaseHeader({ title, description }: ShowcaseHeaderProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-9 mb-7 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}