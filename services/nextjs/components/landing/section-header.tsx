interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 smalltablet:gap-4 max-w-xl smalltablet:max-w-2xl tablet:max-w-3xl text-center px-4">
      <h2 className="font-bold text-3xl smalltablet:text-4xl tablet:text-5xl desktop:text-6xl bg-linear-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-base smalltablet:text-lg tablet:text-xl text-muted-foreground max-w-sm smalltablet:max-w-lg tablet:max-w-2xl">
        {description}
      </p>
    </div>
  );
}
