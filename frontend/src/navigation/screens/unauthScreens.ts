import SignInStack from 'navigation/stacks/SignInStack';
import IScreens from './IScreens';
import {
    SIGN_IN
  } from 'utils/route';
import i18n from 'translations';

const unauthScreens = [
    {
        component: SignInStack,
        name: SIGN_IN,
        title: i18n.t('signin.title'),
      },
];

export default unauthScreens;
