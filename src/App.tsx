import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Search from './pages/Search'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { IRootApp, ISettings, IWarehouse } from './types'
import BottomFooterBlock from './components/BottomFooterBlock'
import FooterBlock from './components/FooterBlock'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import Login from './pages/Login'
import News from './pages/News'
import NewsPost from './pages/NewsPost'
import Promotions from './pages/Promotions'
import { GET_SETTINGS_URL } from './constants'
import { setSettings, setWarehouses, setAutofill } from './actions'
import Maps from './pages/Maps'
import Jobs from './pages/Jobs'
import TopNav from './components/TopNav'

interface IRootAppAction {
  setSettings:(payload:ISettings) => void,
  setWarehouses:(payload:IWarehouse[]) => void,
  setAutofill:(payload:string[]) => void,
}



const mapStateToProps = (reducer:any):IRootApp => {
  const { DefaultReducer } = reducer
  return {
    ...DefaultReducer
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    setSettings:(payload:ISettings) => {dispatch(setSettings(payload))},
    setWarehouses:(payload:IWarehouse[]) => {dispatch(setWarehouses(payload))},
    setAutofill:(payload:string[]) => {dispatch(setAutofill(payload))},
  }
}


class AppTemplate extends React.Component<IRootAppAction, IRootAppAction> {
  constructor(props:IRootAppAction, state:IRootAppAction) {
    super(props, state)
    this.getSettings = this.getSettings.bind(this)
    this.getAutofill = this.getAutofill.bind(this)

    this.getSettings()
  }

  async getAutofill(url:string) {
    const { setAutofill } = this.props
    console.log({url})

    await axios.get(url, {
        headers: {
          'Content-Type': 'text/plain',
      }
    })
    .then( response => {
      try {
        const data:string = response.data
        const list:string[] = data.split("\n")
        setAutofill(list.slice(1))
      } catch (error) {
        console.log({error})
      }
    })
    .catch( err => {
      console.log({err})
    })
  }

  getSettings() {
    const { setSettings, setWarehouses } = this.props
    axios.get(GET_SETTINGS_URL, {})
    .then((response) => {
        if (response.data.code === 200) {
          const {
            settings,
            warehouses,
            autosuggests_file_name,
          } = response.data.data
          this.getAutofill(autosuggests_file_name.file)
          setSettings(settings)
          setWarehouses(warehouses)
        }
    })
    .catch((error) => {
        console.log("ERROR", error)
    })
    .finally(() => {
  
    })
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            {/* <TopNavBar /> */}
            <TopNav.Component />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" component={Search}/>
              <Route path="/profile" component={Profile} />
              {/* <Route path="/register" component={Register}/> */}
              <Route path="/login" component={Login}/>
              <Route path="/jobs" component={Jobs} />
              <Route path="/news" exact component={News} />
              <Route path="/news/:postId" component={NewsPost}/>
              <Route path="/promotions" exact component={Promotions} />
              <Route path="/map" component={Maps} />
              <Route path="/404" exact component={NotFoundPage} />
              <Redirect path="*" to="/404" />
            </Switch>
            <FooterBlock />
            <BottomFooterBlock text={"©2019 Аптека Знахар Львів"}/>
          </div>
        </Router>
      </div>
    )
  }
}

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(AppTemplate)

const App = () => {
  return (
    <AppConnected />
  )
}

export default App