import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers, network } from 'hardhat'
import { expect, assert } from 'chai'

import BigNumber from 'bignumber.js'
BigNumber.config({ EXPONENTIAL_AT: 60 })

import Web3 from 'web3'
// @ts-ignore
const web3 = new Web3(network.provider) as Web3

import { ImpBasic, ImpEIP712 } from '../typechain'
const sigUtil = require('eth-sig-util');

// const abi = require('ethereumjs-abi')
// const web3Abi = require('web3-eth-abi');

let impBasic: ImpBasic
let impEIP712: ImpEIP712

let owner: SignerWithAddress
let user0: SignerWithAddress
let user1: SignerWithAddress

async function reDeploy() {
	[owner, user0, user1] = await ethers.getSigners()
	let ImpBasic = await ethers.getContractFactory('ImpBasic')
	let ImpEIP712 = await ethers.getContractFactory('ImpEIP712')
	impBasic = await ImpBasic.deploy() as ImpBasic
	impEIP712 = await ImpEIP712.deploy() as ImpEIP712
}

const domainType = [
	{
		name: "name",
		type: "string"
	},
	{
		name: "version",
		type: "string"
	},
	{
		name: "chainId",
		type: "uint256"
	},
	{
		name: "verifyingContract",
		type: "address"
	}
];

const metaTransactionType = [
	{
		name: "nonce",
		type: "uint256"
	},
	{
		name: "from",
		type: "address"
	},
	{
		name: "functionSignature",
		type: "bytes"
	}
];

describe('forwarder test', () => {
	describe('test initial state', () => {
		it('EIP712', async () => {
			await reDeploy()
			expect(await impEIP712.valueOne()).to.to.equal('default')
			await impEIP712.setValueOne('new1')
			expect(await impEIP712.valueOne()).to.to.equal('new1')

			const domainData = {
				name: "TestContract",
				version: "1",
				verifyingContract: impEIP712.address,
				chainId: 31337
			};
			// const userAddress = owner.address;
			let publicKey = "0x726cDa2Ac26CeE89F645e55b78167203cAE5410E";
			let privateKey = "0x68619b8adb206de04f676007b2437f99ff6129b672495a6951499c6c56bc2fa6";

			const nonce = 0

			const contract = new web3.eth.Contract(
				(require('../artifacts/contracts/ImpEIP712.sol/ImpEIP712.json')).abi,
				'',
			)

			const value = 'new2'

			const functionSignature = contract.methods
				.setValueOne(value)
				.encodeABI()

			let message = {
				nonce,
				from: publicKey,
				functionSignature
			};

			const dataToSign = {
				types: {
					EIP712Domain: domainType,
					MetaTransaction: metaTransactionType
				},
				domain: domainData,
				primaryType: "MetaTransaction",
				message: message
			};

			const signature = sigUtil.signTypedData_v4(Buffer.from(privateKey.substring(2, 66), 'hex'), {
				data: dataToSign
			});

			const { v, r, s }  = ethers.utils.splitSignature(signature)

			const sendTransactionData = contract.methods
				.executeMetaTransaction(publicKey, functionSignature, r, s, v)
				.encodeABI()

			await web3.eth.sendTransaction({
				from: publicKey,
				to: impEIP712.address,
				data: sendTransactionData
			});

			expect(await impEIP712.valueOne()).to.to.equal(value)
		})
		// it('basic', async () => {
		// 	await reDeploy()
		// 	expect(await impBasic.valueOne()).to.to.equal('default')
		// 	await impBasic.setValueOne('new1')
		// 	expect(await impBasic.valueOne()).to.to.equal('new1')
		//
		// 	const contract = new web3.eth.Contract(
		// 		(require('../artifacts/contracts/ImpBasic.sol/ImpBasic.json')).abi,
		// 		'',
		// 	)
		//
		// 	const value = 'new2'
		// 	const functionSignature = contract.methods
		// 		.setValueOne(value)
		// 		.encodeABI()
		//
		// 	const userAddress = owner.address;
		//
		// 	const hashToSign = web3.utils.soliditySha3(
		// 		{ t: 'uint256', v: '0' },
		// 		{ t: 'address', v: impBasic.address },
		// 		{ t: 'uint256', v: '31337' }, // 31337 is hardhat chain id
		// 		{ t: 'bytes', v: functionSignature },
		// 	) as string;
		//
		// 	const signature = await web3.eth.sign(hashToSign, userAddress)
		//
		// 	const { v, r, s }  = ethers.utils.splitSignature(signature)
		// 	await impBasic.executeMetaTransaction(userAddress, functionSignature, r, s,v);
		// 	expect(await impBasic.valueOne()).to.to.equal(value)
		//
		// })
	})
})
