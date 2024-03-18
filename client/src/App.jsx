import {
  RouterProvider,
} from "react-router-dom";
import router from './router';

function App() {
  return (
    <RouterProvider router={router}>
      <App></App>
    </RouterProvider>
  )
}

export default App
