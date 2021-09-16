// import { Recipient, BiconomyForwarder } from '../typechain'
// import {ethers, run} from 'hardhat'
// import {delay} from '../utils'
//
// async function deploy() {
// 	const Recipient = await ethers.getContractFactory('Recipient')
// 	console.log('starting deploying Recipient...')
// 	const recipient = await Recipient.deploy('0xBC6ae91F55af580B4C0E8c32D7910d00D3dbe54d') as Recipient
// 	console.log('Recipient deployed with address: ' + recipient.address)
// 	//
// 	const Forwarder = await ethers.getContractFactory('BiconomyForwarder')
// 	console.log('starting deploying Forwarder...')
// 	const forwarder = await Forwarder.deploy('0xBC6ae91F55af580B4C0E8c32D7910d00D3dbe54d') as BiconomyForwarder
// 	console.log('Forwarder deployed with address: ' + forwarder.address)
// 	await delay(2000)
// 	// const recipient = await Recipient.attach('0xBeE66D15D092Cb950d19A85473AD9C4704544093')
// 	console.log('Set forwarder...');
// 	await recipient.setTrustedForwarder(forwarder.address);
// 	console.log('Forwarder is set');
//
// 	// console.log('wait of deploying...')
// 	// await token.deployed()
// 	// console.log('wait of delay...')
// 	// await delay(25000)
// 	// console.log('starting verify token...')
// 	// try {
// 	// 	await run('verify:verify', {
// 	// 		address: token!.address,
// 	// 		contract: 'contracts/CustomToken.sol:CustomToken',
// 	// 		constructorArguments: [ 'CustomToken', 'Ctm' ],
// 	// 	});
// 	// 	console.log('verify success')
// 	// } catch (e: any) {
// 	// 	console.log(e.message)
// 	// }
// }
//
// deploy()
// .then(() => process.exit(0))
// .catch(error => {
// 	console.error(error)
// 	process.exit(1)
// })
