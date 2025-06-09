
import { Route, Router, Link } from "wouter";
import Login from "./pages/SignIn/login";
import Home from "./pages/Home/index";

function App() {
  return (
    <Router>
      <nav>
        <Link href="/">login</Link>
        <Link href="/home">Home</Link>
      </nav>

      <Route path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;
