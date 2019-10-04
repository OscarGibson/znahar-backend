import React from 'react';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import { 
  searchInitState,
  topNavBarState,
  homePageState,
  footerBlockState
} from './redusers/initState'
import store from './store';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { IAction, IActionPayload, ICart, ITopNavBarState, IProfilePage } from './types'
import TopNavBar from './components/TopNavBar';
import BottomFooterBlock from './components/BottomFooterBlock';
import FooterBlock from './components/FooterBlock';
import NotFoundPage from './pages/NotFoundPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ForClients from './pages/ForClients';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import Promotions from './pages/Promotions';


const getProductsRequestSended:IAction = () => {
  return {
    type:"",action:{}
  }
}

const setProductsSuccess:IActionPayload = (products) => {
  return {
    type:"",action:products
  }
}

const App = () => {
  // let newTopNavBarState:ITopNavBarState
  // let newProfilePageState:IProfilePage

  // const cartStateJsonStr = localStorage.getItem("cart")
  // if (cartStateJsonStr) {
  //     const newCartState:ICart = JSON.parse(cartStateJsonStr)
  //     console.log("cartState", newCartState)
  //     newTopNavBarState = {
  //       ...topNavBarState,
  //       cartOrdersCount:newCartState.products.length
  //     }
  //     newProfilePageState = {
  //       ...profilePageState,
  //       cartState: newCartState
  //     }
  // } else {
  //   newTopNavBarState = {
  //     ...topNavBarState
  //   }
  //   newProfilePageState = {
  //     ...profilePageState
  //   }
  // }

  return (
    <div>
      <Provider store={store}>
        <Router>
          <div className="App">
            <TopNavBar { ...topNavBarState } />
            <Switch>
              <Route path="/" exact component={() => <Home {...homePageState}/>} />
              <Route path="/search" component={() =>
                <Search
                  {...searchInitState}
                  getProductsRequestSended={getProductsRequestSended}
                  setProductsSuccess={setProductsSuccess}
                />
              }/>
              <Route path="/profile" component={Profile} />
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route path="/for-clients" component={ForClients} />
              <Route path="/news" exact component={News} />
              <Route path="/news/:postId" component={NewsPost}/>
              <Route path="/promotions" exact component={Promotions} />
              <Route path="/404" exact component={() => <NotFoundPage {...homePageState}/>} />
              <Redirect path="*" to="/404" />
            </Switch>
            <FooterBlock {...footerBlockState}/>
            <BottomFooterBlock text={"©2019 Аптека Знахар Львів"}/>
          </div>
        </Router>
      </Provider>
    </div>
  )
}

export default App;
