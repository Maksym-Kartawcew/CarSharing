import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  title: string;
//   textStyles?: string;
//   rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
