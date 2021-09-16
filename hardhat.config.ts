import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-web3'
import '@typechain/hardhat'
import 'solidity-coverage'
import 'hardhat-docgen'
import "@nomiclabs/hardhat-etherscan"

require('dotenv').config()
// require('./tasks')

const chainIds: {[key:string]: number} = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3
}

// Ensure that we have all the environment variables we need.
let mnemonic: string
if (!process.env.MNEMONIC) {
  throw new Error('Please set your MNEMONIC in a .env file')
} else {
  mnemonic = process.env.MNEMONIC
}

let infuraApiKey: string
if (!process.env.INFURA_API_KEY) {
  throw new Error('Please set your INFURA_API_KEY in a .env file')
} else {
  infuraApiKey = process.env.INFURA_API_KEY
}

function createNetworkConfig (network:string) {
  const url = 'https://' + network + '.infura.io/v3/' + infuraApiKey
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[network],
    url,
    gas: 'auto',
    // gasPrice: 1000000000
  }
}

module.exports = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.SCAN_API_KEY
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: '0x68619b8adb206de04f676007b2437f99ff6129b672495a6951499c6c56bc2fa6',
          balance: '1000000000000000000000000'
        }
      ],
      chainId: chainIds.hardhat,
    },
    mainnet: createNetworkConfig('mainnet'),
    goerli: createNetworkConfig('goerli'),
    kovan: createNetworkConfig('kovan'),
    rinkeby: createNetworkConfig('rinkeby'),
    ropsten: createNetworkConfig('ropsten'),
    bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      gasPrice: 'auto',
      // gasLimit: 10000000,
      accounts: { mnemonic: mnemonic },
    },
    bsc: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 'auto',
      // gasLimit: 10000000,
      accounts: { mnemonic: mnemonic },
    }
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      // 0.4.19
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  }
}
