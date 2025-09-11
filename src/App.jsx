/**
 * Main entry point of the frontend application.
 * - Defines all available routes in the app using React Router.
 * - Maps each path to its respective page/component.
 * - Provides the routing configuration to the application.
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home';
import Enhancer from './enhancer';
import Pseudo from './pseudo';
import Solver from './solver';
import EditorPage from './editorpage';

/**
 * App Component
 *
 * This component configures and initializes the React Router.
 * It maps application routes to their corresponding components.
 *
 * Routes:
 *  - "/"         → Home page
 *  - "/enhancer" → Enhancer tool
 *  - "/pseudo"   → Pseudocode generator
 *  - "/solve"    → Solver utility
 *  - "/test"     → Editor playground
 */
function App() {
  // Define route configuration for the app
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/enhancer', element: <Enhancer /> },
    { path: '/pseudo', element: <Pseudo /> },
    { path: '/solve', element: <Solver /> },
    { path: '/test', element: <EditorPage /> },
  ]);

  return (
    <>
      {/* Provide router configuration to the application */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;