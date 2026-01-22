import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./pages/Form";
import Success from "./pages/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
