import dotenv from 'dotenv';
import networksConfig from './networks.js';
import { generateAddressesFromSeed } from '../accounts/generator';
import testNetworksConfig from './mock/networks.js';
import path from 'path';

export const isTest = process.env.APP_ENV === 'test';

if (isTest) {
  dotenv.config({ path: './test/.test.functional.env' });
}

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const DOCKER_LAUNCH = process.env.DOCKER_LAUNCH;
export const HTTP_PORT = process.env.PORT || '3000';
export const CODEFI_ENV_ID = process.env.CODEFI_ENV_ID;

export const M2M_TOKEN_REDIS_ENABLE = process.env.M2M_TOKEN_REDIS_ENABLE;
export const M2M_TOKEN_REDIS_HOST = process.env.M2M_TOKEN_REDIS_HOST;
export const M2M_TOKEN_REDIS_PASS = process.env.M2M_TOKEN_REDIS_PASS;
export const AUTH0_URL = process.env.AUTH0_URL;

export const M2M_TOKEN_CLIENT_ID = process.env.M2M_TOKEN_CLIENT_ID;
export const M2M_TOKEN_CLIENT_SECRET = process.env.M2M_TOKEN_CLIENT_SECRET;
export const M2M_TOKEN_AUDIENCE = process.env.M2M_TOKEN_AUDIENCE;

export const ASSETS_API_URL = process.env.ASSETS_API_URL;
export const ASSETS_API_SECRET = process.env.ASSETS_API_SECRET;

export const NETWORK_KEY = process.env.DEFAULT_NETWORK_KEY || 'mainnet';

export const SERVICE_TYPE_ORCHESTRATE = 'orchestrate';
export const SERVICE_TYPE_LEDGER = 'ledger';
export const SERVICE_TYPE_WEB3 = 'web3';
export const SERVICE_TYPE_PAYLOAD = 'data';

export const FAUCET_MNEMONIC = process.env.FAUCET_MNEMONIC;

export const SERVICE_TYPES = [
  SERVICE_TYPE_ORCHESTRATE,
  SERVICE_TYPE_LEDGER,
  SERVICE_TYPE_WEB3,
  SERVICE_TYPE_PAYLOAD,
];

// Standard place to put contracts that will be deployed in Orchestrate registry
export const CONTRACTS_DIRECTORY = path.resolve(
  __dirname,
  `../../${process.env.CONTRACTS_DIRECTORY || 'contracts'}`,
);
// Truffle build output of those standard contracts
export const CONTRACTS_TRUFFLE_BUILD_DIRECTORY = path.resolve(
  __dirname,
  `../../${process.env.CONTRACTS_TRUFFLE_BUILD_DIRECTORY || 'build/contracts'}`,
);
// We can also directly put build files in this folder
export const CONTRACTS_CUSTOM_BUILD_DIRECTORY = path.resolve(
  __dirname,
  `../../${process.env.CONTRACTS_CUSTOM_BUILD_DIRECTORY || 'buildCustom'}`,
);

export const ALL_CONTRACTS_BUILD_PATH = path.resolve(
  __dirname,
  'contracts.json',
);

export const DEFAULT_ACCOUNTS_NUMBER = 10;

// For Functional tests load test networks only
export const NETWORKS = (
  !isTest ? networksConfig.networks : testNetworksConfig.networks
).map((network) => ({ ...network, faucetMnemonic: FAUCET_MNEMONIC }));

export const FILTERED_NETWORKS = NETWORKS.filter(({ faucetMnemonic, key }) => {
  if (key && key.includes('hardhat')) {
    if (!process.env.ENABLE_HARDHAT) {
      return false;
    }
  }
  return faucetMnemonic !== '';
});
export const BLOCKCHAIN_NETWORKS = FILTERED_NETWORKS.map(
  ({ tenantId, key, urls, chainId, kaleido }) => ({
    tenantID: tenantId,
    name: key,
    urls,
    chainId,
    listener: kaleido
      ? {
          backOffDuration: '5s',
        }
      : {},
  }),
);

export const DEFAULT_BLOCKCHAIN_NETWORK = BLOCKCHAIN_NETWORKS.find(
  (network) => network.name === NETWORK_KEY,
);

export const MNEMONICS = FILTERED_NETWORKS.map(({ key, faucetMnemonic }) => ({
  key,
  faucetMnemonic,
}));
export const DEFAULT_MNEMONIC = MNEMONICS.find(
  ({ key }) => key === DEFAULT_BLOCKCHAIN_NETWORK.name,
).faucetMnemonic;

export const WALLETS = FILTERED_NETWORKS.map(
  ({ key, faucetMnemonic, urls, ace }) => ({
    key,
    accounts: generateAddressesFromSeed(
      faucetMnemonic,
      DEFAULT_ACCOUNTS_NUMBER,
    ),
    rpcEndpoint: urls[0],
    ace,
  }),
);

export const DEFAULT_WALLETS = WALLETS.find(
  (wallet) => wallet.key === NETWORK_KEY,
).accounts;
export const DEFAULT_WALLET = DEFAULT_WALLETS[0];

export const MINIMUM_ETH_AMOUNT_THRESHOLD = 10 ** 17; // in Wei - 0.1 ether

export const BALANCE_READER = 'BatchBalanceReader';
export const ERC1820 = 'ERC1820Registry';
// ERC1820 address is deterministic
export const ERC1820_ADDRESS = '0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24';
export const ERC1820_RAW_TX =
  '0xf90a388085174876e800830c35008080b909e5608060405234801561001057600080fd5b506109c5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a5576000357c010000000000000000000000000000000000000000000000000000000090048063a41e7d5111610078578063a41e7d51146101d4578063aabbb8ca1461020a578063b705676514610236578063f712f3e814610280576100a5565b806329965a1d146100aa5780633d584063146100e25780635df8122f1461012457806365ba36c114610152575b600080fd5b6100e0600480360360608110156100c057600080fd5b50600160a060020a038135811691602081013591604090910135166102b6565b005b610108600480360360208110156100f857600080fd5b5035600160a060020a0316610570565b60408051600160a060020a039092168252519081900360200190f35b6100e06004803603604081101561013a57600080fd5b50600160a060020a03813581169160200135166105bc565b6101c26004803603602081101561016857600080fd5b81019060208101813564010000000081111561018357600080fd5b82018360208201111561019557600080fd5b803590602001918460018302840111640100000000831117156101b757600080fd5b5090925090506106b3565b60408051918252519081900360200190f35b6100e0600480360360408110156101ea57600080fd5b508035600160a060020a03169060200135600160e060020a0319166106ee565b6101086004803603604081101561022057600080fd5b50600160a060020a038135169060200135610778565b61026c6004803603604081101561024c57600080fd5b508035600160a060020a03169060200135600160e060020a0319166107ef565b604080519115158252519081900360200190f35b61026c6004803603604081101561029657600080fd5b508035600160a060020a03169060200135600160e060020a0319166108aa565b6000600160a060020a038416156102cd57836102cf565b335b9050336102db82610570565b600160a060020a031614610339576040805160e560020a62461bcd02815260206004820152600f60248201527f4e6f7420746865206d616e616765720000000000000000000000000000000000604482015290519081900360640190fd5b6103428361092a565b15610397576040805160e560020a62461bcd02815260206004820152601a60248201527f4d757374206e6f7420626520616e204552433136352068617368000000000000604482015290519081900360640190fd5b600160a060020a038216158015906103b85750600160a060020a0382163314155b156104ff5760405160200180807f455243313832305f4143434550545f4d4147494300000000000000000000000081525060140190506040516020818303038152906040528051906020012082600160a060020a031663249cb3fa85846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182600160a060020a0316600160a060020a031681526020019250505060206040518083038186803b15801561047e57600080fd5b505afa158015610492573d6000803e3d6000fd5b505050506040513d60208110156104a857600080fd5b5051146104ff576040805160e560020a62461bcd02815260206004820181905260248201527f446f6573206e6f7420696d706c656d656e742074686520696e74657266616365604482015290519081900360640190fd5b600160a060020a03818116600081815260208181526040808320888452909152808220805473ffffffffffffffffffffffffffffffffffffffff19169487169485179055518692917f93baa6efbd2244243bfee6ce4cfdd1d04fc4c0e9a786abd3a41313bd352db15391a450505050565b600160a060020a03818116600090815260016020526040812054909116151561059a5750806105b7565b50600160a060020a03808216600090815260016020526040902054165b919050565b336105c683610570565b600160a060020a031614610624576040805160e560020a62461bcd02815260206004820152600f60248201527f4e6f7420746865206d616e616765720000000000000000000000000000000000604482015290519081900360640190fd5b81600160a060020a031681600160a060020a0316146106435780610646565b60005b600160a060020a03838116600081815260016020526040808220805473ffffffffffffffffffffffffffffffffffffffff19169585169590951790945592519184169290917f605c2dbf762e5f7d60a546d42e7205dcb1b011ebc62a61736a57c9089d3a43509190a35050565b600082826040516020018083838082843780830192505050925050506040516020818303038152906040528051906020012090505b92915050565b6106f882826107ef565b610703576000610705565b815b600160a060020a03928316600081815260208181526040808320600160e060020a031996909616808452958252808320805473ffffffffffffffffffffffffffffffffffffffff19169590971694909417909555908152600284528181209281529190925220805460ff19166001179055565b600080600160a060020a038416156107905783610792565b335b905061079d8361092a565b156107c357826107ad82826108aa565b6107b85760006107ba565b815b925050506106e8565b600160a060020a0390811660009081526020818152604080832086845290915290205416905092915050565b6000808061081d857f01ffc9a70000000000000000000000000000000000000000000000000000000061094c565b909250905081158061082d575080155b1561083d576000925050506106e8565b61084f85600160e060020a031961094c565b909250905081158061086057508015155b15610870576000925050506106e8565b61087a858561094c565b909250905060018214801561088f5750806001145b1561089f576001925050506106e8565b506000949350505050565b600160a060020a0382166000908152600260209081526040808320600160e060020a03198516845290915281205460ff1615156108f2576108eb83836107ef565b90506106e8565b50600160a060020a03808316600081815260208181526040808320600160e060020a0319871684529091529020549091161492915050565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff161590565b6040517f01ffc9a7000000000000000000000000000000000000000000000000000000008082526004820183905260009182919060208160248189617530fa90519096909550935050505056fea165627a7a72305820377f4a2d4301ede9949f163f319021a6e9c687c292a5e2b2c4734c126b524e6c00291ba01820182018201820182018201820182018201820182018201820182018201820a01820182018201820182018201820182018201820182018201820182018201820';

export const ERC1820_DEPLOYER_ADDRESS =
  '0xa990077c3205cbDf861e17Fa532eeB069cE9fF96';

export const ORCHESTRATE_FLAG_ENVIRONMENT_NAME = 'environmentName';
export const ORCHESTRATE_FLAG_TENANT_ID = 'tenantId';
export const ORCHESTRATE_FLAG_SERVICE_NAME = 'serviceName';
export const ORCHESTRATE_FLAG_SERVICE_URL = 'serviceUrl';
export const ORCHESTRATE_REGISTRY_TAG = process.env.ORCHESTRATE_REGISTRY_TAG;
export const ORCHESTRATE_USE_DEPRECATED_TYPES =
  process.env.ORCHESTRATE_USE_DEPRECATED_TYPES;
export const ORCHESTRATE_BROKER_HOST = process.env.ORCHESTRATE_BROKER_HOST;
export const ORCHESTRATE_BROKER_PORT = process.env.ORCHESTRATE_BROKER_PORT;
export const ORCHESTRATE_URL = process.env.ORCHESTRATE_URL;
export const ORCHESTRATE_TOPIC_RECOVER = process.env.ORCHESTRATE_TOPIC_RECOVER;
export const ORCHESTRATE_TOPIC_DECODED = process.env.ORCHESTRATE_TOPIC_DECODED;
export const ORCHESTRATE_NEW_CONTRACT_TX =
  process.env.ORCHESTRATE_NEW_CONTRACT_TX;

export const FAUCET_AMOUNT = process.env.FAUCET_AMOUNT;

export enum CodefiService {
  ASSETS_API = 'ASSETS_API',
  NONE = 'NONE',
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
