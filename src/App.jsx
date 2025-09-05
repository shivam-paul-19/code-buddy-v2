import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home';
import Enhancer from './enhancer';
import Pseudo from './pseudo';
import Solver from './solver';
import EditorPage from './editorpage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/enhancer',
      element: <Enhancer />
    },
    {
      path: '/pseudo',
      element: <Pseudo />
    },
    {
      path: '/solve',
      element: <Solver />
    },
    {
      path: '/test',
      element: <EditorPage />
    }
  ]);

  return (
    <>
        <RouterProvider router={router}/>
    </>
  );
}

export default App;