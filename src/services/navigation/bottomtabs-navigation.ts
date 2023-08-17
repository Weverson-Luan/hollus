import { ChatList } from "../../screens/BottomTabs/ChatList";
import { Home } from "../../screens/BottomTabs/Home";
import { ScreenProducts } from "../../screens/BottomTabs/Products";
import { ScreenQuery } from "../../screens/BottomTabs/Query";
import { ScreenSearch } from "../../screens/BottomTabs/Search";
import { UserPanel } from "../../screens/StackNavigation/UserPanel";
import BalaioSVG from '../../assets/svg/balaio.svg'

export const bottomTabsNavigationList = [
  {
    id: 1,
    name: "Home",
    component: Home,
    icon: "home",
  },
  {
    id: 2,
    name: "Perfil",
    component: UserPanel,
    icon: "user",
  },
  // {
  //   id: 3,
  //   name: "Pesquisar",
  //   component: ScreenSearch,
  //   icon: "search",
  // },
  {
    id: 4,
    name: "Consultas", 
    component: ScreenQuery,
    icon: "calendar-alt"
  },
  // {
  //   id: 5,
  //   name: "Chat",
  //   component: ChatList,
  //   icon: "comment"
  // }
  {
    id: 6,
    name: "Produtos",
    component: ScreenProducts,
    icon: 'balaio'
  },
];