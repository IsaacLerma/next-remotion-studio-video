import { StyledIcon, StyledImage } from "./icons.style";

const iconOptions = {
  interrogation_circle: {
    path: "./icons/ic_interrogation_circle.svg",
    width: 24,
    height: 24,
  },
  arrow_left_back: {
    path: "/../../../../icons/ic_arrow_left_back.svg",
    width: 24,
    height: 24,
  },
} as const;

export type IconType = keyof typeof iconOptions;

type Props = {
  type?: IconType;
  width?: `${number}` | `${number}px` | number;
  height?: string | number;
  filter?: string;
};

const Icon = ({
  type = "analytics",
  width,
  height,
  filter = "none",
}: Props) => {
  const chosenIcon = iconOptions[type];

  // for backwards compatibility, remove px from width and height
  const intWidth =
    typeof width === "string" ? parseInt(width.replace("px", "")) : width;
  const intHeight =
    typeof height === "string" ? parseInt(height.replace("px", "")) : height;

  return (
    <StyledIcon width={width} height={height}>
      <StyledImage
        src={chosenIcon.path}
        alt={`${type} icon`}
        width={intWidth ?? chosenIcon.width}
        height={intHeight ?? chosenIcon.height}
        filter={filter}
      />
    </StyledIcon>
  );
};

export default Icon;
