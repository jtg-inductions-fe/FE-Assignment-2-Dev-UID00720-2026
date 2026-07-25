export interface SidenavNode {
  name: string;
  link?: string;
  icon?: string;
  role: string[];
  children?: SidenavNode[];
}
