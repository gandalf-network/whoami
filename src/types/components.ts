export type SliderOptionType = {
  value: string;
  content: React.ReactNode;
};

export interface VerticalSliderProps {
  options: SliderOptionType[];
  value?: string;
  containerClassName?: string;
  className?: string;
}
