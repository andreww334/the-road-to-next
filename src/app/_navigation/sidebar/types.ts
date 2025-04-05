export type NavItem = {
  separator?: boolean;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ReactElement<any>;
  href: string;
};
