/*
  Project Name: deno-solid-js
  License: MIT
  Created By: Lightnet
*/


import { lazy } from "solid-js"
import { 
  Router
//, useRoutes
, Routes
, Route 
} from 'https://cdn.skypack.dev/@solidjs/router';

import IndexMenus from "./IndexMenus.jsx";

//import ThemeProvider from "./theme/ThemeProvider.jsx";
//import NotifyProvider from "./notify/NotifyProvider.jsx"
import AuthProvider from "./auth/surrealdb/AuthProvider.jsx";
//import NotifyManager from './notify/NotifyManager.jsx';
/*
export default function App(){
  const [count, setCount] = createSignal(0);
  function clickAdd(){
    setCount(count()+1);
  }
  function clickSubtract(){
    setCount(count()-1);
  }
  //console.log("init client app...")
  return (<div>
    <label>Hello App!</label><br/>
    <button onClick={clickAdd}> Add </button>
    <button onClick={clickSubtract}> Subtract </button>
    <label> Count: {count()} </label>
  </div>)
}
*/

//const Home = lazy(() => import('../routes/index.jsx'))
import Home from '../routes/index.jsx'
import About from '../routes/about.jsx'
import Account from '../routes/account.jsx'
import SignIn from './auth/surrealdb/SignIn.jsx'
import SignUp from './auth/surrealdb/SignUp.jsx'
import SignOut from './auth/surrealdb/SignOut.jsx'

//const About = lazy(() => import('../routes/about.jsx'))
//const SignIn = lazy(() => import('./auth/surrealdb/SignIn.jsx'))
//const SignUp = lazy(() => import('./auth/surrealdb/SignUp.jsx'))
//const SignOut = lazy(() => import('./auth/surrealdb/SignOut.jsx'))
//const Account = lazy(() => import('../routes/account.jsx'))
/*
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About,
  }
]
const RouterApp = () => {
  const Route = useRoutes(routes);
  console.log(Route)
  return (
  <Router>
    <IndexMenus/>
    <Route />
  </Router>);
};
*/

const RouterApp = () => {
  return (
  <Router>
    <IndexMenus/>
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/account" component={Account} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signout" component={SignOut} />
    </Routes>
  </Router>);
};

/*
<Route path="/blog" component={Blog}/>
<Route path="/todolist" component={ToDoList}/>
<Route path="/surrealdb" component={SurrealDB}/>
<Route path="/testlab" component={TestLab}/>
*/

const RenderApp = () => {
  //<div>This site was made with Solid</div>
  return (<>
  <AuthProvider>
    <RouterApp/>
  </AuthProvider>
</>);
};

/*
const RenderApp = () => {
  //<div>This site was made with Solid</div>
  return (<>
  <ThemeProvider>
    <NotifyProvider>
      <AuthProvider>
        <RouterApp/>
        <NotifyManager/>
      </AuthProvider>
    </NotifyProvider>
  </ThemeProvider>
</>);
};
*/

export default RenderApp;