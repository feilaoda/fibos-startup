// 私钥：5JYXp9cSWQizUXLw5K2sGGD8Mr6pHAjpcRk7xrHkY5zaPwXRppP
// 公钥：FO7sGkRxL2AFnqBdUHXKC2LziYeRTzsxYF7FjzFNGe14hV8U5Pi2
// Fibos密钥对生成工具地址：https://fibos.xyz/

var FIBOS = require("fibos.js");

var key = {
    "public-key": "FO7sGkRxL2AFnqBdUHXKC2LziYeRTzsxYF7FjzFNGe14hV8U5Pi2",
    "private-key": "5JYXp9cSWQizUXLw5K2sGGD8Mr6pHAjpcRk7xrHkY5zaPwXRppP"
}

var rpc = ["http://se-rpc.fibos.io:8870",
            "http://sl-rpc.fibos.io:8870",
            "http://to-rpc.fibos.io:8870",
            "http://ca-rpc.fibos.io:8870",
            "http://ln-rpc.fibos.io:8870",
            "http://va-rpc.fibos.io:8870",
]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var config = {
    chainId:"6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a",
    keyProvider:key["private-key"],
    httpEndpoint:rpc[getRandomInt(0, 5)],
    expireInSeconds: 60,
	broadcast: true,
	verbose: false,
	sign: true
}

var client = FIBOS(config);

// 把EOS@FO转到EOS@EOS，from是FO的账号，to是备注的EOS账号
function transferEOS(from, to, amount){
    var eosaccount = from; // 你的 EOS 账户名
    var value = amount.toFixed(4) + " EOS@eosio"; //兑换 EOS 数量
    var ctx = client.contractSync("eosio.token");
    var memo = to; //填入你的fibso 账号
    var result = ctx.transferSync(eosaccount, "fiboscouncil", value, memo);
    console.log(result);
}

function transferFO(from, to, amount){
    var account = from; // 你的 EOS 账户名
    var value = amount.toFixed(4) + " FO@eosio"; //兑换 EOS 数量
    var ctx = client.contractSync("eosio.token");
    var memo = ""; //填入你的fibso 账号
    var result = ctx.transferSync(account, to, value, memo);
    console.log(result);
}

transferEOS("orangeisfeng", "orangeisfeng", 1);
transferFO("orangeisfeng", "wrathionfibo", 1000);