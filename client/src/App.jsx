import { Navbar, Footer, Services, Loader } from "./components"
import detectEthereumProvider from '@metamask/detect-provider';

import React, { Component } from "react";
import { ethers } from "ethers";
import Main from "./main";
import ReactDOM from "react-dom";

import Web3 from 'web3'
import  TestToken from '../src/utils/TestToken.json'
import  CredToken from '../src/utils/CredToken.json'
import  TokenFarm from '../src/utils/TokenFarm.json'
import { TransactionProvider } from "./context/TransactionContext";

class App extends Component {
 
 
  async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request( {method: 'eth_requestAccounts'} );
        //await ethereum.send('eth_requestAccounts');
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
}
  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

     const networkId = await web3.eth.net.getId()
      console.log(networkId);
   

    // load testToken
    const testTokenData = await TestToken.networks[networkId]
    if(testTokenData){
      const testToken = new web3.eth.Contract(TestToken.abi, testTokenData.address)
      console.log(testTokenData.address);
   
      this.setState({ testToken })
      let testTokenBalance = await testToken.methods.balanceOf(this.state.account).call()
      this.setState({ testTokenBalance: testTokenBalance.toString() })

    } else {
      window.alert('TestToken contract not deployed to detected network')
    }
// load credToken
    const credTokenData = CredToken.networks[networkId]
    if(credTokenData){
      const credToken = new web3.eth.Contract(CredToken.abi, credTokenData.address)
      this.setState({ credToken })
      let credTokenBalance = await credToken.methods.balanceOf(this.state.account).call()
      this.setState({ credTokenBalance: credTokenBalance.toString() })

    } else {
      window.alert('CredToken contract not deployed to detected network')
    }

    // Load TokenFarm

    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData){
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })

    



    } else {
      window.alert('TokenFarm contract not deployed to detected network')
    }

    this.setState({ loading: false})
  }
  async UNSAFE_componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData() 
  }
  
  connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });


      this.setState({ account: accounts[0] })
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.testToken.methods.approve(this.state.tokenFarm._address, amount).send({from: this.state.account }).on('transactionHash', (hash) => {
     this.state.tokenFarm.methods.stakeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({ loading: false})
     }) 
    })
  }

  unstakeTokens = (amount) => {
    this.setState({loading: true})
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '0x91770151aB0e5CBEDf771baAdAb9647BD4007888',
        testToken: {},
        credToken: {},
        tokenFarm: {},
        testTokenBalance: '0',
        credTokenBalance: '0',
        stakingBalance: '0',
        loading: true
    }
  }

  render() {
    let content 
    if (this.state.loading) {
      content = <Loader />
    } else {
      content = <Main
      testTokenBalance={this.state.testTokenBalance}
      credTokenBalance={this.state.credTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      
      />
      
    }

    return (
      <div>
        <TransactionProvider> <Navbar  /></TransactionProvider>
       
        <Services/>
        <div className="container-fluid mt-1">
          <div className="row">
            <main role="main" className="col-lg-12 ml-0 mr-0" style={{ maxWidth: '3000px' }}>
              <div className="content mr-0 ml-0">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

               {content}

              </div>
              
            </main>
   
        <Footer/>
            
            
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    
  <App />,

document.getElementById("root"),
);

  