const getFirstLine = (text: string) => {
  return text ? (text.split("<br>")[0] ?? "") : "";
};

const NoSSRSpan = ({ com }: { com: string }) => {
  return (
    <span
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: getFirstLine(com ?? ""),
      }}
    />
  );
};

export default NoSSRSpan;
