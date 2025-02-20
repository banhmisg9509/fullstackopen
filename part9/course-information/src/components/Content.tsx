import { CoursePart } from "src/types";
import { Part } from "./Part";

type Props = {
  parts: CoursePart[];
};

export const Content = ({ parts }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};
