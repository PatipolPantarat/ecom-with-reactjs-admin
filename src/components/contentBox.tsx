import clsx from "clsx";
interface ContentBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentBox({ children, className }: ContentBoxProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-3xl h-full w-full p-6 shadow duration-150",
        className
      )}
    >
      {children}
    </div>
  );
}
