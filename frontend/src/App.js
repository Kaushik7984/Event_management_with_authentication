import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/Home";
import EventPage, { loader as eventsLoader } from "./Pages/Event";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./Pages/EventDetail";
import NewEventPage from "./Pages/NewEvent";
import EditEventPage from "./Pages/EditEvent";
import Root from "./Pages/Root";
import EventRoot from "./Pages/EventRoot";
import ErrorPage from "./Pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./Pages/Newsletter";
import AuthenticationPage, {
  action as authAction,
} from "./Pages/Authentication";
import { action as logoutAction } from "./Pages/Logout";
import { checkAuthLoader, tokenLoader } from './util/auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventRoot />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
