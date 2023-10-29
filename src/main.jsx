import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider,
	Navigate
} from "react-router-dom";
import App from './App.jsx';
import Auth from './pages/Auth.jsx';
import Main from './pages/Main.jsx';
import SupabaseContext, {supabase} from './components/SupabaseContext.jsx';
import './index.css'

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
	// {
	// 	path: "house",
	// 	element: <Contact />,
	// },
	// {
	// 	path: "room",
	// 	element: <Contact />,
	// },
	// {
	// 	path: "onboarding",
	// 	element: <Contact />,
	// },
	// {
	// 	path: "housedata",
	// 	element: <Contact />,
	// },
	// {
	// 	path: "roomdata",
	// 	element: <Contact />,
	// },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SupabaseContext.Provider value={supabase}>
			<RouterProvider router={router} />
		</SupabaseContext.Provider>
	</React.StrictMode>
)