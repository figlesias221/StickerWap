// import SignInStack from 'navigation/stacks/SignInStack';
import IScreens from './IScreens';
import {
    SIGNIN
  } from 'utils/route';
import i18n from 'translations';
import SignIn from 'screens/SignIn';

export interface IUnauthScreens extends IScreens {
    title: string;
  }

const unauthScreens: IScreens[] = [
    {
      name: SIGNIN,
      component: SignIn,
    },
];

export default unauthScreens;
