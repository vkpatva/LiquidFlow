import { toast } from 'react-toastify';
import { GHOToken, LiquidityFlow } from '../utils/constants';
import ContractAbi from './Contract.abi.json';
import ERC20Abi from './ERC20.abi.json'
import { ethers } from 'ethers';
interface FormValues {
    _receiver: string;
    _amount: number;
    _paymentDays: number;
    _tradeDescription: string;
  }
  const gasLimit = 1000000;
export const InitateTrade = async (signer: any, values :FormValues ) => {
    const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
    const tradeTx =await liquidityFlowInstance.initiateTrade(values._receiver,values._amount,values._paymentDays,values._tradeDescription, {
        gasLimit: gasLimit,
      });
      console.log({ ...tradeTx });
    await tradeTx.wait();
    console.log('Trade Transaction Completed',{...tradeTx});
    toast('Trade Intiated',{type : 'success'})
    return 

}

export const requestFinance = async (signer: any, tradeId : string , amount : number ) => {
  toast('Finance Request Started',{type : 'info'});

  const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
  const tradeTx =await liquidityFlowInstance.requestFinance(tradeId,amount,{
    gasLimit: gasLimit,
  })
    console.log({ ...tradeTx });
  await tradeTx.wait();
  console.log('Trade Transaction Completed',{...tradeTx});
  toast('Finance Request Send',{type : 'success'});
  return 

}


export const invest = async (signer: any, tradeId : string , amount : number ) => {
  toast('Invest Request Sent',{type : 'info'});
  const GHOInstance = new ethers.Contract(GHOToken,ERC20Abi,signer);
  const amountInWei = ethers.utils.parseEther(amount.toString());
  const approveTx = await GHOInstance.approve(LiquidityFlow,amountInWei,{gasLimit});
  await approveTx.wait();
  console.log({...approveTx})
  const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
  const tradeTx =await liquidityFlowInstance.investInvoice(tradeId,amount,{
    gasLimit
  })
  await tradeTx.wait();
  console.log('Trade Transaction Completed',{...tradeTx});
  toast('Investment made',{type : 'success'})
  return 
}

export const payInvoice = async (signer: any, tradeId : string , amount : number ) => {
  toast('Payment in progress',{type : 'info'})
  const GHOInstance = new ethers.Contract(GHOToken,ERC20Abi,signer);
  const amountInWei = ethers.utils.parseEther(amount.toString());
  const approveTx = await GHOInstance.approve(LiquidityFlow,amountInWei,{gasLimit});
  await approveTx.wait();
  console.log("Approve Transaction Completed",{...approveTx})
  const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
  const tradeTx =await liquidityFlowInstance.payInvoice(tradeId,{
    gasLimit
  })
  await tradeTx.wait();
  console.log('Trade Transaction Completed',{...tradeTx});
  toast('payment successful',{type : 'success'})

}