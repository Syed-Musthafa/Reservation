import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Layout from './components/Layout';
import Bookings from './pages/Bookings';

export const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,          // Layout wraps nested routes
        children: [
            { index: true, element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/rooms", element: <Rooms /> },
            { path: "/room/:id", element: <Room /> },
            { path: "/bookings", element: <Bookings /> },

        ]
    }
]);
