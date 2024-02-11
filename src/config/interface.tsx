export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  thumbnail: string;
  images: string[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IProductFormError {
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  stock?: string;
  thumbnail?: string;
  images?: string;
  status?: string;
}

export interface ICategory {
  _id?: string;
  name: string;
  status: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  className?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
  disabled?: boolean;
  type: "button" | "submit";
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { name: string; value: string }[];
  className?: string;
  paramName?: string;
}

export interface RadioButtonProps {
  name?: string;
  options: { label: string; value: string; icon: JSX.Element }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
}

export interface ListBoxProps {
  name?: string;
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
}
