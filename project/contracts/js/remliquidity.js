const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const defaultPrivateKey = "5JvA9M2LEZJEfvtv2LtsBRoAmeMiYVBnrormDRfAg2ScQG3S5tT"; // ali
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

(async () => {
    const result = await api.transact({
        actions: [{
        account: 'evolutiondex',
        name: 'remliquidity',
        authorization: [{
            actor: 'ali',
            permission: 'active',
        }],
        data: {
            user: 'ali',
            to_sell: '20.0000 EVO',
            min_ext_asset1: {"contract":"eosio.token", "quantity":"1.0000 EOS"},
            min_ext_asset2: {"contract":"voice4", "quantity":"10.0000 VOICE"}, 
        },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
    });
    console.dir(result);
})();
