import bip39 = require("bip39"); // 引入 bip39 库用于助记词生成
import { createAddress, createMultiSignAddress } from "../src/index"; // 引入地址生成函数
import * as assert from 'assert'; // 引入断言库用于测试验证

describe('btc unit test case', () => {
    test('createAddress by p2pkh mainnet', () => {
        // 给定的助记词示例
        const mnemonic = "around dumb spend sample oil crane plug embrace outdoor panel rhythm salon";
        // 生成种子
        const seed = bip39.mnemonicToSeedSync(mnemonic, "");
        // 创建参数对象
        const param = {
            seedHex: seed.toString("hex"), // 转换种子为十六进制字符串
            receiveOrChange: "0", // 指定地址类型
            addressIndex: "0", // 指定地址索引
            network: "mainnet", // 指定网络为主网
            method: "p2pkh" // 使用 p2pkh（传统地址）
        };
        // 调用创建地址函数
        const account = createAddress(param);
        // 打印生成的地址
        console.log(account.address);
        // 验证生成的地址是否匹配预期结果（预期结果根据需要设置）
    });

    test('createAddress by p2pkh testnet', () => {
        // 给定的助记词示例
        const mnemonic = "around dumb spend sample oil crane plug embrace outdoor panel rhythm salon";
        // 生成种子
        const seed = bip39.mnemonicToSeedSync(mnemonic, "");
        // 创建参数对象
        const param = {
            seedHex: seed.toString("hex"), // 转换种子为十六进制字符串
            receiveOrChange: "0", // 指定地址类型
            addressIndex: "0", // 指定地址索引
            network: "testnet", // 指定网络为测试网
            method: "p2pkh" // 使用 p2pkh（传统地址）
        };
        // 调用创建地址函数
        const account = createAddress(param);
        // 打印生成的地址
        console.log(account.address);
        // 断言生成的地址与预期匹配
        assert.strictEqual(account.address, 'mwd7uu5uJSM3KnN6KsLL54XoiFBg4JYX7o');
        assert.strictEqual(account.privateKey, '60164bec9512d004af7f71e7ed868c8e9ac2cc6234d8b682037ec80547595f2e');
        assert.strictEqual(account.publicKey, '030e93482fd0037d589b08c36bb22afc041338ba444f9f9d7ba129348f9be731c1');
    });

    test('createAddress by p2wpkh mainnet', () => {
        // 给定的助记词示例
        const mnemonic = "around dumb spend sample oil crane plug embrace outdoor panel rhythm salon";
        // 生成种子
        const seed = bip39.mnemonicToSeedSync(mnemonic, "");
        // 创建参数对象
        const param = {
            seedHex: seed.toString("hex"), // 转换种子为十六进制字符串
            receiveOrChange: "0", // 指定地址类型
            addressIndex: "0", // 指定地址索引
            network: "mainnet", // 指定网络为主网
            method: "p2wpkh" // 使用 p2wpkh（SegWit地址）
        };
        // 调用创建地址函数
        const account = createAddress(param);
        // 断言生成的地址与预期匹配
        assert.strictEqual(account.address, 'bc1qkzkgj7n4n72yhyjmpzs3a6uzy5kj3cmkad2dk7');
        assert.strictEqual(account.privateKey, '60164bec9512d004af7f71e7ed868c8e9ac2cc6234d8b682037ec80547595f2e');
        assert.strictEqual(account.publicKey, '030e93482fd0037d589b08c36bb22afc041338ba444f9f9d7ba129348f9be731c1');
    });

    test('createAddress by p2wpkh testnet', () => {
        // 给定的助记词示例
        const mnemonic = "around dumb spend sample oil crane plug embrace outdoor panel rhythm salon";
        // 生成种子
        const seed = bip39.mnemonicToSeedSync(mnemonic, "");
        // 创建参数对象
        const param = {
            seedHex: seed.toString("hex"), // 转换种子为十六进制字符串
            receiveOrChange: "0", // 指定地址类型
            addressIndex: "0", // 指定地址索引
            network: "testnet", // 指定网络为测试网
            method: "p2wpkh" // 使用 p2wpkh（SegWit地址）
        };
        // 调用创建地址函数
        const account = createAddress(param);
        // 打印账户对象以便调试
        console.log("account==", account);
        // 断言生成的地址与预期匹配
        assert.strictEqual(account.address, 'tb1qkzkgj7n4n72yhyjmpzs3a6uzy5kj3cmkht37dd');
        assert.strictEqual(account.privateKey, '60164bec9512d004af7f71e7ed868c8e9ac2cc6234d8b682037ec80547595f2e');
        assert.strictEqual(account.publicKey, '030e93482fd0037d589b08c36bb22afc041338ba444f9f9d7ba129348f9be731c1');
    });

    test('createAddress by p2sh mainnet', () => {
        // 给定的助记词示例
        const mnemonic = "around dumb spend sample oil crane plug embrace outdoor panel rhythm salon";
        // 生成种子
        const seed = bip39.mnemonicToSeedSync(mnemonic, "");
        // 创建参数对象
        const param = {
            seedHex: seed.toString("hex"), // 转换种子为十六进制字符串
            receiveOrChange: "0", // 指定地址类型
            addressIndex: "0", // 指定地址索引
            network: "mainnet", // 指定网络为主网
            method: "p2sh" // 使用 p2sh（锁定地址）
        };
        // 调用创建地址函数
        const account = createAddress(param);
        // 断言生成的地址与预期匹配
        assert.strictEqual(account.address, '35iXFVdZb5qxeqxgkZHBaS3KjaP89e79kP');
        assert.strictEqual(account.privateKey, '60164bec9512d004af7f71e7ed868c8e9ac2cc6234d8b682037ec80547595f2e');
        assert.strictEqual(account.publicKey, '030e93482fd0037d589b08c36bb22afc041338ba444f9f9d7ba129348f9be731c1');
    });

    test('createAddress by p2sh testnet', () => {
        // 给定的助记词示例
        const mnemonic = "around dumb spend sample oil crane plug embrace outdoor panel rhythm salon";
        // 生成种子
        const seed = bip39.mnemonicToSeedSync(mnemonic, "");
        // 创建参数对象
        const param = {
            seedHex: seed.toString("hex"), // 转换种子为十六进制字符串
            receiveOrChange: "0", // 指定地址类型
            addressIndex: "0", // 指定地址索引
            network: "testnet", // 指定网络为测试网
            method: "p2sh" // 使用 p2sh（锁定地址）
        };
        // 调用创建地址函数
        const account = createAddress(param);
        // 断言生成的地址与预期匹配
        assert.strictEqual(account.address, '2MwGjKEZbCYMJrdbERgu4CP2awvbHyHgyqt');
        assert.strictEqual(account.privateKey, '60164bec9512d004af7f71e7ed868c8e9ac2cc6234d8b682037ec80547595f2e');
        assert.strictEqual(account.publicKey, '030e93482fd0037d589b08c36bb22afc041338ba444f9f9d7ba129348f9be731c1');
    });

    // 多重签名测试用例
    test('p2pkh multi sign 3-2 address', () => {
        const param = {
            pubkeys: [
                '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
                '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
                '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
            ].map(hex => Buffer.from(hex, 'hex')), // 转换十六进制公钥为 Buffer
            network: "mainnet", // 指定网络为主网
            method: "p2pkh", // 使用 p2pkh（传统地址）
            threshold: 2 // 设置阈值为 2（需要 2 个签名）
        }
        const address = createMultiSignAddress(param); // 调用多重签名地址创建函数
        assert.strictEqual(address, '36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7'); // 验证生成的地址
    });

    // 测试 p2wpkh 多重签名
    test('p2wpkh multi sign 3-2 address', () => {
        const param = {
            pubkeys: [
                '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
                '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
                '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
            ].map(hex => Buffer.from(hex, 'hex')),
            network: "mainnet", // 指定网络为主网
            method: "p2wpkh", // 使用 p2wpkh（SegWit 地址）
            threshold: 2 // 设置阈值为 2
        }
        const address = createMultiSignAddress(param); // 调用多重签名地址创建函数
        assert.strictEqual(address, 'bc1qj67d3x5sv3cqdnfje67f9kdlavv7fv6xreznweymj3nqj493pulqz8e6gj'); // 验证生成的地址
    });

    // 测试 p2sh 多重签名
    test('p2sh multi sign 3-2 address', () => {
        const param = {
            pubkeys: [
                '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
                '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
                '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
            ].map(hex => Buffer.from(hex, 'hex')),
            network: "mainnet", // 指定网络为主网
            method: "p2sh", // 使用 p2sh（锁定地址）
            threshold: 2 // 设置阈值为 2
        }
        const address = createMultiSignAddress(param); // 调用多重签名地址创建函数
        assert.strictEqual(address, '3PLy7raPcJCaK4sJyMhWenbzFSZ3YTqo86'); // 验证生成的地址
    });
});
