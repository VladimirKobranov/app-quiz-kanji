function Title() {
  return (
    <div className="flex flex-col items-center w-full py-4 md:py-6 border-b">
      <div className="relative flex flex-col items-center gap-2">
        {/* Decorative element */}
        <div className="absolute -inset-4 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-xl" />

        {/* Japanese title */}
        <h1 className="relative text-3xl md:text-4xl font-bold text-primary tracking-wider whitespace-nowrap">
          漢字クイズ
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-px w-10 bg-linear-to-r from-transparent to-primary/50" />
          <div className="size-1.5 rotate-45 bg-primary/30" />
          <div className="h-px w-10 bg-linear-to-l from-transparent to-primary/50" />
        </div>

        {/* English subtitle */}
        <p className="relative text-lg md:text-xl font-medium text-muted-foreground tracking-[0.3em] uppercase">
          Kanji Quiz
        </p>
      </div>
    </div>
  );
}

export default Title;
