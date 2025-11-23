interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 max-w-3xl text-center">
      <h2 className="font-bold text-4xl tablet:text-5xl pc:text-6xl bg-linear-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-lg tablet:text-xl text-muted-foreground max-w-2xl">
        {description}
      </p>
    </div>
  );
}
