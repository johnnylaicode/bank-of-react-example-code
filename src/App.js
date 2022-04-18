// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import {v4 as uuidv4} from 'uuid'; 

class App extends Component {

  componentDidMount(){  
    fetch("https://moj-api.herokuapp.com/debits")
      .then(res => res.json()
        .then(data => {
          this.setState({debits: data});
          this.setState({totalDebit: this.calculateDebit()});
          console.log(this.state);
          if(this.state.credits && this.state.debits) this.refreshBalance();
        }));
          
    fetch("https://moj-api.herokuapp.com/credits")
      .then(res => res.json()
        .then(data => {
          this.setState({credits: data});
          this.setState({totalCredit: this.calculateCredit()});
          if(this.state.credits && this.state.debits) this.refreshBalance();
        }));
  }

  addCredit = (desc, amount) => {
      this.state.credits.push({
      id: uuidv4(), 
      description: desc, 
      amount: amount, 
      date: new Date().toISOString()
    })
  }

  addDebit = (desc, amount) => {
    this.state.debits.push({
    id:uuidv4(), 
    description: desc, 
    amount: amount, 
    date: new Date().toISOString()
  })
}
  calculateDebit = () => {
    //parse through this.state.debits
    //add together all the amounts and return it
    if(this.state.debits){
      let debitSum = 0; 
      for (let i =0; i< this.state.debits.length; i++){
        debitSum += parseFloat(this.state.debits[i].amount) 
      }
      this.setState({totalDebit: debitSum})
      return debitSum; 
    }
    return 0;
  }

  calculateCredit = () => {
    //parse through this.state.credits
    //add together all the amounts and return it
    if(this.state.credits){
      let creditSum=0;
      for (let i=0; i< this.state.credits.length; i++) {
        creditSum += parseFloat(this.state.credits[i].amount)
      }
      this.setState({totalCredit: creditSum})
      return creditSum;
    }
    return 0;
  }

  refreshBalance = () => {
    //balance = calculateCredit - calculateDebit
    this.setState({accountBalance:(this.calculateCredit()-this.calculateDebit()).toFixed(2)})
  }

  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitComponent = () => (
      <Debits 
        balance = {this.state.accountBalance} 
        refreshBalance = {this.refreshBalance} 
        calculateDebit = {this.calculateDebit} 
        totalDebit = {this.state.totalDebit} 
        totalCredit = {this.state.totalCredit} 
        debits = {this.state.debits}/>)
    const CreditComponent = () => (
      <Credits 
        balance = {this.state.accountBalance} 
        addCredit = {this.addCredit}
        refreshBalance = {this.refreshBalance} 
        calculateCredit = {this.calculateCredit} 
        totalDebit = {this.state.totalDebit} 
        totalCredit = {this.state.totalCredit} 
        credits = {this.state.credits}/>)
    
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitComponent}/>
          <Route exact path="/credits" render={CreditComponent}/>

        </div>
      </Router>
    );
  }
}

export default App;