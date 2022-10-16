interface IScreens {
  name: string;
  component: (props: any) => JSX.Element;
  options?: any;
}

export default IScreens;
