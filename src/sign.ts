const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
BIP32Factory(ecc);
const bitcoin = require('bitcoinjs-lib');
const bitcore = require('bitcore-lib');

/**
 * 构建并签名交易
 * @param params - 包含私钥、签名对象和网络类型的参数
 * @returns {string} - 返回构建的交易的十六进制字符串
 */
export function buildAndSignTx (params: { privateKey: string; signObj: any; network: string; }): string {
  const { privateKey, signObj, network } = params; // 解构参数
  const net = bitcore.Networks[network]; // 获取指定网络的配置

  // 构建输入列表
  const inputs = signObj.inputs.map(input => {
    return {
      address: input.address, // 输入地址
      txId: input.txid, // 输入交易ID
      outputIndex: input.vout, // 输出索引
      // 将输入地址转换为脚本
      script: new bitcore.Script.fromAddress(input.address).toHex(),
      satoshis: input.amount // 输入金额
    };
  });

  // 构建输出列表
  const outputs = signObj.outputs.map(output => {
    return {
      address: output.address, // 输出地址
      satoshis: output.amount // 输出金额
    };
  });
  
  // 打印输入和输出以便调试
  console.log("Inputs:", inputs);
  console.log("Outputs:", outputs);

  // 创建交易并添加输入和输出
  const transaction = new bitcore.Transaction(net).from(inputs).to(outputs);
  transaction.version = 2; // 设置交易版本
  transaction.sign(privateKey); // 使用私钥对交易进行签名
  
  return transaction.toString(); // 返回交易的十六进制字符串
}

/**
 * 构建未签名交易并签名
 * @param params - 包含密钥对、签名对象和网络类型的参数
 */
export function buildUnsignTxAndSign (params) {
  const { keyPair, signObj, network } = params; // 解构参数
  const psbt = new bitcoin.Psbt({ network }); // 创建PSBT（部分签名交易）
  
  // 添加输入
  const inputs = signObj.inputs.map(input => {

    console.log(
      `input.address: ${input.address}`,
      `input.txid: ${input.txid}`,
      `input.vout: ${input.vout}`,
      `input.amount: ${input.amount}`
    )
    return {
      address: input.address, // 输入地址
      txId: input.txid, // 输入交易ID
      outputIndex: input.vout, // 输出索引
      script: new bitcore.Script.fromAddress(input.address).toHex(), // 将输入地址转换为脚本
      satoshis: input.amount // 输入金额
    };
  });
  psbt.addInput(inputs); // 将输入添加到PSBT

  // 添加输出
  const outputs = signObj.outputs.map(output => {
    return {
      address: output.address, // 输出地址
      satoshis: output.amount // 输出金额
    };
  });
  psbt.addOutput(outputs); // 将输出添加到PSBT
  psbt.toBase64(); // 将PSBT转换为Base64格式

  psbt.signInput(0, keyPair); // 使用密钥对签名第一个输入
  psbt.finalizeAllInputs(); // 最终确定所有输入

  const signedTransaction = psbt.extractTransaction().toHex(); // 提取并将签名交易转换为十六进制字符串
  console.log('signedTransaction==', signedTransaction); // 打印签名的交易
}
