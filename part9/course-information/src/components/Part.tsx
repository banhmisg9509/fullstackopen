import {
  CoursePart,
  CoursePartBackground,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartSpecial,
} from "src/types";

type Props = {
  part: CoursePart;
};

const isCourseParseDescription = (
  part: CoursePart
): part is CoursePartBasic | CoursePartBackground => "description" in part;

const isCoursePartBackground = (
  part: CoursePart
): part is CoursePartBackground => part.kind === "background";

const isCoursePartGroup = (part: CoursePart): part is CoursePartGroup =>
  part.kind === "group";

const isCoursePartSpecial = (part: CoursePart): part is CoursePartSpecial =>
  part.kind === "special";

export const Part = ({ part }: Props) => {
  return (
    <div>
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
      </div>
      {isCourseParseDescription(part) && (
        <div>
          <em>{part.description}</em>
        </div>
      )}
      {isCoursePartBackground(part) && (
        <div>submit to {part.backgroundMaterial}</div>
      )}
      {isCoursePartGroup(part) && (
        <div>project exercises {part.groupProjectCount}</div>
      )}
      {isCoursePartSpecial(part) && (
        <div>required skills: {part.requirements.join(", ")}</div>
      )}
    </div>
  );
};
