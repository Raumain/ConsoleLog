import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Main from "./routes";
import Background from "./routes/background";
import Box from "./routes/box";
import Text from "./routes/text";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Box /> },
      { path: "background", element: <Background /> },
      { path: "box", element: <Box /> },
      { path: "text", element: <Text /> },
    ],
  },
]);

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
