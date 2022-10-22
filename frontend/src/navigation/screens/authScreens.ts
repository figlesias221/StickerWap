import Chat from 'screens/Chat';
import Collection from 'screens/Collection';
import Settings from 'screens/Settings';
import SignIn from 'screens/SignIn';
import Swipe from 'screens/Swipe';
import { CHAT, COLLECTION, SETTINGS, SWIPE } from 'utils/route';
import IScreens from './IScreens';

const authScreens: IScreens[] = [
  {
    name: COLLECTION,
    component: Collection,
  },
  {
    name: SWIPE,
    component: Swipe,
  },
  {
    name: SETTINGS,
    component: Settings,
  },
  {
    name: CHAT,
    component: Chat,
  },
];

export default authScreens;
