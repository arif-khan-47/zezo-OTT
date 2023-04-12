import { HomePage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthGuard } from "./guards";
import Login from "./pages/login";
import Search from "./pages/search";
import Register from "./pages/register";
import { Toaster } from 'react-hot-toast';
import { Provider, useSelector } from "react-redux";
import store from "./Redux/store";
import DetailsPage from "./pages/[slug]";
import Watch from "./pages/watch/[slug]";
import Favorite from "./pages/favorite";
import Profile from "./pages/profile";
import MyProfile from "./pages/myProfile";
import MyAccount from "./pages/myAccount";
import ManageDevice from "./pages/manageDevice";
import Settings from "./pages/settings";
import WatchHistory from "./pages/watchHistory";
import Subscription from "./pages/subscription";
import { RootState } from './Redux/store'
import RefreshTokenHandler from './hooks/RefreshTokenHandler'


export interface IAllRoutes {
  path: string;
  element: React.ReactNode;
}

export const AllRoutes: IAllRoutes[] = [
  {
    path: `/favorite`,
    element: <Favorite />,
  },
  {
    path: `/my-account`,
    element: <MyAccount />,
  },
  {
    path: `/my-watch-history`,
    element: <WatchHistory />,
  },
  {
    path: `/subscription`,
    element: <Subscription />,
  },
  {
    path: `/settings`,
    element: <Settings />,
  },
  {
    path: `/manage-device`,
    element: <ManageDevice />,
  },
  {
    path: `/my-profile`,
    element: <MyProfile />,
  },
  {
    path: `/profile`,
    element: <Profile />,
  },
  {
    path: `/:slug`,
    element: <DetailsPage />,
  },
  {
    path: `/:slug/:slug`,
    element: <Watch />,
  },
]

export const routes: IAllRoutes[] = [
  {
    path: `/`,
    element: <HomePage />,
  },
  {
    path: `/search`,
    element: <Search />,
  },
  {
    path: `/register`,
    element: <Register />,
  },
  {
    path: `/login`,
    element: <Login />,
  },
]


const ZezoTvAPP = () => {

  const { loading } = RefreshTokenHandler()
  console.log("🚀 ~ file: App.tsx:95 ~ ZezoTvAPP ~ loading:", loading)
  return loading ? <>
    <div className="bg-[#121212] flex min-h-screen">
      <div className="m-auto text-white">
        Loading...
      </div>
    </div>
  </>
    :
    <>
      <div className="bg-[#121212] min-h-screen">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route>
                {routes && routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
              </Route>
              <Route element={<AuthGuard />}>
                {AllRoutes && AllRoutes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </>

    ;
}

export default ZezoTvAPP;