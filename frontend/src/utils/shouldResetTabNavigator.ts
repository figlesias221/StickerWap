const RESET_TAB_NAVIGATION_ENABLED = true;

const shouldResetTabNavigator = (index: number, activeIndex: number) =>
  RESET_TAB_NAVIGATION_ENABLED && index === activeIndex;

export default shouldResetTabNavigator;
