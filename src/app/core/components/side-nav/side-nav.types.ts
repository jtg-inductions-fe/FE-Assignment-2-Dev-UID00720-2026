export interface SidenavNode {
  name: string;
  role: string[];
  link?: string;
  icon?: string;
  children?: SidenavNode[];
}
