export interface INavItem {
  name: string;
  path?: string;
  children?: INavItem[];
  images?: string[];
}
