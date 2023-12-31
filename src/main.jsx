import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider,
	Navigate
} from "react-router-dom";
import App from './App.jsx';
import HouseData from './pages/HouseData.jsx';
import House from './pages/House.jsx';
import Onboarding from './pages/Onboarding.jsx';
import BedroomData from './pages/BedroomData.jsx';
import KitchenData from './pages/KitchenData.jsx';
import LivingRoomData from './pages/LivingRoomData.jsx';
import BathroomData from './pages/BathroomData.jsx';
import StairsData from './pages/StairsData.jsx';
import RoomRedict from './pages/RoomRedirect.jsx';
import Auth from './pages/Auth.jsx';
import Main from './pages/Main.jsx';
import Room from './pages/Room.jsx';
import SupabaseContext, {supabase} from './components/SupabaseContext.jsx';
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/main" replace />,
	},
	{
		path: "auth",
		element: <Auth />,
	},
	{
		path: "main",
		element: <Main />,
	},
	{
		path: "house",
		element: <House />,
	},
	{
		path: "room",
		element: <Room />,
	},
	{
		path: "onboarding",
		element: <Onboarding />,
	},
	{
		path: "housedata",
		element: <HouseData />,
	},
	{
		path: "bedroomdata",
		element: <BedroomData />,
	},
	{
		path: "kitchendata",
		element: <KitchenData />,
	},
	{
		path: "livingroomdata",
		element: <LivingRoomData />,
	},
	{
		path: "bathroomdata",
		element: <BathroomData />,
	},
	{
		path: "stairsdata",
		element: <StairsData />,
	},
	{
		path: "roomredirect",
		element: <RoomRedict />,
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SupabaseContext.Provider value={supabase}>
			<RouterProvider router={router} />
		</SupabaseContext.Provider>
	</React.StrictMode>
)