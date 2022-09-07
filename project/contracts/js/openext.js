const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const defaultPrivateKey = "5JvA9M2LEZJEfvtv2LtsBRoAmeMiYVBnrormDRfAg2ScQG3S5tT"; // ali
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


const auth = [{
    actor: 'ali',
    permission: 'active',
}];

(async () => {
    const result = await api.transact({
        actions: [{
        account: 'evolutiondex',
        name: 'openext',
        authorization: auth,
        data: {
            user: 'ali',
            payer: 'ali',
            ext_symbol: {"contract":"eosio.token", "sym":"4,EOS"},
//            ext_symbol: {"contract":"voice4", "sym":"4,VOICE"},            
        },
    }] 
    },{
        blocksBehind: 3,
        expireSeconds: 30,
    });
    console.dir(result);
})();