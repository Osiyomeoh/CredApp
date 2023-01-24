import React, { Component } from 'react';
import { AiFillPlayCircle} from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import 'bootstrap/dist/css/bootstrap.css';


import "./index.css";
//import { TransactionContext } from "../context/TransactionContext";
//import { Loader } from './';
//import { shortenAddress } from "../utils/shortenAddress";
import logo from '../images/hhhh.png';

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

class Main extends Component {
 
 render() {
  return (
        <div id="content" className='  w-118 flex flex-col justify-center gradient-bg-main '>
          <p></p>
                        <table className='table table-borderless text-muted text-center  '>
                          <thead>
                            <tr>
                              <th className="text-light"scope="col">Asset Invested</th>
                              <th className="text-light" scope="col">Asset Earned</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                            <td className="text-light">{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mTest</td>
                            <td className="text-light">{window.web3.utils.fromWei(this.props.credTokenBalance, 'Ether')}Cred</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className='card mb-4 eth-card'>
                          <div className='card-body'>
                            <form className='mb-3' onSubmit={(event) => {
                              event.preventDefault()
                              let amount
                              amount = this.input.value.toString()
                              amount = window.web3.utils.toWei(amount, 'Ether')
                              this.props.stakeTokens(amount)
                            }}>
                              <div>
                                <label className="text-light float-left"><b>Invest Tokens</b></label>
                                <span className='float-right  text-light'>
                                  Balance: {window.web3.utils.fromWei(this.props.testTokenBalance, 'Ether')}
                                </span>
                              </div>
                              <div className='input-group mb-4'>
                                <input 
                                type="text"
                                ref={(input) => { this.input = input }}
                                className='form-control form-control-lg'
                                placeholder="0"
                                required/>
                                <div className='input-group-append'>
                                  <div className='input-group-text'>
                                    <img src={logo} height='32' alt=""/>
                                    &nbsp;&nbsp;&nbsp; mTest
                                  </div>
                                </div>
                              </div>
                              <div className='justify-center'>
                              <button type="submit" className='btn btn-success btn-lg btn-block 
                              pe-5 ps-5 transition ease-in-out delay-150 
                              bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300'>INVEST</button>
                              <button type="submit" 
                            className='btn btn-danger btn-block btn-lg pe-5 ps-5 transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-light-500 duration-300'
                            onClick={(event) => {
                              event.preventDefault()
                              this.props.unstakeTokens()
                            }}
                            >WITHDRAW</button>
                              </div>
                              
                            </form>
                            
                          </div>
                        </div>
                </div>             
     
      
    
    
    
        );

 }
    
}
    
export default Main;


