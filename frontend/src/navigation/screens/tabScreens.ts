import { ImageSourcePropType } from 'react-native';

import {
  CHAT,
  CHAT_STACK,
  COLLECTION,
  COLLECTION_STACK,
  SETTINGS,
  SETTINGS_STACK,
  SWIPE,
  SWIPE_STACK,
} from 'utils/route';
import { Chat, Menu, Profile, Swap } from 'assets';
import i18n from 'translations';
import IScreens from './IScreens';
import CollectionStack from 'navigation/stacks/CollectionStack';
import SwipeStack from 'navigation/stacks/SwipeStack';
import SettingsStack from 'navigation/stacks/SettingsStack';
import ChatStack from 'navigation/stacks/ChatStack';

export interface ITabScreens extends IScreens {
  default: string;
  images: {
    active: ImageSourcePropType;
  };
  title: string;
}

const tabScreens: ITabScreens[] = [
  {
    component: CollectionStack,
    default: COLLECTION,
    images: {
      active: Menu,
    },
    name: COLLECTION_STACK,
    title: i18n.t('collection.title'),
  },
  {
    component: SwipeStack,
    default: SWIPE,
    images: {
      active: Swap,
    },
    name: SWIPE_STACK,
    title: i18n.t('swipe.title'),
  },
  {
    component: ChatStack,
    default: CHAT,
    images: {
      active: Chat,
    },
    name: CHAT_STACK,
    title: i18n.t('chat.title'),
  },
  {
    component: SettingsStack,
    default: SETTINGS,
    images: {
      active: Profile,
    },
    name: SETTINGS_STACK,
    title: i18n.t('settings.title'),
  },
];

export default tabScreens;
