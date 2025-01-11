// 引入必要的库
import * as bitcoin from 'bitcoinjs-lib'; // 引入 BitcoinJS 库
const ecc = require('tiny-secp256k1'); // 引入 ECC 算法库
const { BIP32Factory } = require('bip32'); // 从 BIP32 库中引入工厂类
const bip32 = BIP32Factory(ecc); // 创建 BIP32 实例

/**
 * 创建新的地址
 * @param params - 包含生成地址所需的各种参数
 * @returns {any} - 返回一个包含私钥、公钥和地址的对象
 */
export function createAddress (params: any): any {
  const { seedHex, receiveOrChange, addressIndex, network, method } = params; // 解构参数
  const root = bip32.fromSeed(Buffer.from(seedHex, 'hex')); // 创建根节点
  let path = "m/44'/0'/0'/0/" + addressIndex + ''; // 默认路径
  if (receiveOrChange === '1') {
    path = "m/44'/0'/0'/1/" + addressIndex + ''; // 更新为更改地址路径
  }
  const child = root.derivePath(path); // 派生子节点
  let address: string; // 定义地址变量
  switch (method) { // 依据不同的方法生成相应的地址
    case 'p2pkh':
      // eslint-disable-next-line no-case-declarations
      const p2pkhAddress = bitcoin.payments.p2pkh({
        pubkey: child.publicKey, // 使用派生的公钥
        network: bitcoin.networks[network] // 指定网络
      });
      address = p2pkhAddress.address; // 获取生成的地址
      break;
    case 'p2wpkh':
      // eslint-disable-next-line no-case-declarations
      const p2wpkhAddress = bitcoin.payments.p2wpkh({
        pubkey: child.publicKey, // 使用派生的公钥
        network: bitcoin.networks[network] // 指定网络
      });
      address = p2wpkhAddress.address; // 获取生成的地址
      break;
    case 'p2sh':
      // eslint-disable-next-line no-case-declarations
      const p2shAddress = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
          pubkey: child.publicKey, // 使用派生的公钥
          network: bitcoin.networks[network] // 指定网络
        })
      });
      address = p2shAddress.address; // 获取生成的地址
      break;
    default:
      console.log('This way can not support'); // 输出不支持的消息
  }

  return { // 返回包含私钥、公钥和地址的对象
    privateKey: Buffer.from(child.privateKey).toString('hex'),
    publicKey: Buffer.from(child.publicKey).toString('hex'),
    address
  };
}

/**
 * 创建多重签名地址
 * @param params - 包含生成多重签名地址所需的参数
 * @returns {string} - 返回生成的多重签名地址
 */
export function createMultiSignAddress (params: any): string {
  const { pubkeys, network, method, threshold } = params; // 解构参数
  switch (method) { // 根据方法生成相应的多重签名地址
    case 'p2pkh':
      return bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({
          m: threshold, // 指定签名数量
          network: bitcoin.networks[network], // 指定网络
          pubkeys // 公钥数组
        })
      }).address; // 返回生成的地址
    case 'p2wpkh':
      return bitcoin.payments.p2wsh({
        redeem: bitcoin.payments.p2ms({
          m: threshold, // 指定签名数量
          network: bitcoin.networks[network], // 指定网络
          pubkeys // 公钥数组
        })
      }).address; // 返回生成的地址
    case 'p2sh':
      return bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wsh({
          redeem: bitcoin.payments.p2ms({
            m: threshold, // 指定签名数量
            network: bitcoin.networks[network], // 指定网络
            pubkeys // 公钥数组
          })
        })
      }).address; // 返回生成的地址
    default:
      console.log('This way can not support'); // 输出不支持的消息
      return '0x00'; // 返回默认值
  }
}

/**
 * 创建 Schnorr 地址
 * @param params - 包含生成 Schnorr 地址所需的参数
 * @returns {any} - 返回包含私钥、公钥和地址的对象
 */
export function createSchnorrAddress (params: any): any {
  bitcoin.initEccLib(ecc); // 初始化 ECC 库
  const { seedHex, receiveOrChange, addressIndex } = params; // 解构参数
  const root = bip32.fromSeed(Buffer.from(seedHex, 'hex')); // 创建根节点
  let path = "m/44'/0'/0'/0/" + addressIndex + ''; // 默认路径
  if (receiveOrChange === '1') {
    path = "m/44'/0'/0'/1/" + addressIndex + ''; // 更新为更改地址路径
  }
  const childKey = root.derivePath(path); // 派生子节点
  const privateKey = childKey.privateKey; // 获取私钥
  if (!privateKey) throw new Error('No private key found'); // 检查私钥是否存在

  const publicKey = childKey.publicKey; // 获取公钥

  // 生成 P2TR (Taproot) 地址
  const { address } = bitcoin.payments.p2tr({
    internalPubkey: publicKey.length === 32 ? publicKey : publicKey.slice(1, 33) // 处理公钥
  });

  return { // 返回包含私钥、公钥和地址的对象
    privateKey: Buffer.from(childKey.privateKey).toString('hex'),
    publicKey: Buffer.from(childKey.publicKey).toString('hex'),
    address
  };
}
