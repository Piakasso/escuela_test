import { ReactNode } from "react";

export interface MainProps {
  children: ReactNode;
}

export interface FormProps {
  placeholder: string;
  onSubmit: (payload?: any) => void;
  onBlur?: React.Dispatch<React.SetStateAction<string>>;
}

interface ICardStyle {
  color: string;
  type: string;
}

interface ITitleStyle {
  color: string;
}

interface ITitle {
  en: string;
  ru: string;
}

export interface IWord {
  learnWord: string;
  translate: ITranslate;
}

interface ITranslate {
  en: string;
  ru: string;
}

interface IConfigs {
  cardStyle: ICardStyle;
  titleStyle: ITitleStyle;
}

export interface ICard {
  configs: IConfigs;
  coverImage: string;
  title: ITitle;
  words: IWord[];
}

export interface IDictionaryItemProps {
  title: ITitle;
  coverImage: string;
}

export interface ISingleWordProps extends IWord {
  number: number;
}

export interface IButtonProps {
  handleSave: () => void;
  disabled: boolean;
}
