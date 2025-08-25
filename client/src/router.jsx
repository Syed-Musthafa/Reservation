import { createBrowserRouter } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Layout from './components/Layout';
import Bookings from './pages/Bookings';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFount';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/rooms", element: (
            <PrivateRoute>
                <Layout>
                    <Rooms />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/room/:id", element: (
            <PrivateRoute>
                <Layout>
                    <Room />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: "/bookings", element: (
            <PrivateRoute>
                <Layout>
                    <Bookings />
                </Layout>
            </PrivateRoute>
        ),
    },

    // not fount
    {
        path: "*",
        element: <NotFound />,
    },




]);
