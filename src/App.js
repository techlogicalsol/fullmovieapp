import './App.css';
import SimpleBottomNavigation from './Components/MainNav';
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import { Container } from '@material-ui/core';

import Header from './Components/Header'
import Trending from './Components/Trending';
import Movies from './Components/Movies';
import Series from './Components/Series';
import Search from './Components/Search';
import Details from './Components/Details';
import Trending1 from './Components/Trending1';


function App() {
  return (

    <>
      <BrowserRouter>
      <Header />

      <Container> 

        <Switch>
          <Route exact path='/' component={Trending} />
          <Route exact path="/trending1" component={Trending1} />
          <Route path='/movies' component={Movies} />
          <Route path='/series' component={Series} />
          <Route path='/search' component={Search} />
          {/* <Route path="/details/:id" component={Details} /> */}
        </Switch>

      </Container>


      <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
