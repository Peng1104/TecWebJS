const axios = require("axios");

const options = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

async function getNewToken() {
    return await axios.post(
        "https://tecweb-js.insper-comp.com.br/token", // URL
        { username: "lucash" },
        options
    ).then((response) => {
        return response.data.accessToken;
    });
}

async function updateToken() {
    options.headers["Authorization"] = `Bearer ${await getNewToken()}`;
}

async function start() {
    response = await axios.get("https://tecweb-js.insper-comp.com.br/exercicio", options);

    Object.keys(response.data).forEach((key) => {
        logResult(key, handleExercise(key, response.data[key]));
    });
}

async function logResult(name, resposta) {
    if (resposta != null) {
        result = await axios.post("https://tecweb-js.insper-comp.com.br/exercicio/" + name, { "resposta": resposta }, options);

        console.log((result.data.sucesso ? "\x1b[92m" : "\x1b[91m") + name + "\x1b[0m");
    }
}

function handleExercise(name, exercise) {
    console.log(exercise.titulo);

    switch (name) {
        case "soma":
            const a = exercise.entrada.a;
            const b = exercise.entrada.b;
            const soma = a + b;
            console.log(`a = ${a}, b = ${b}, soma = ${soma}`);

            return soma;

        case "tamanho-string":
            const text = exercise.entrada.string;
            const size = text.length;
            console.log(`Texto = ${text}, tamanho = ${size}`);

            return size;

        case "nome-do-usuario":
            const mail = exercise.entrada.email;
            const user = mail.split("@")[0];
            console.log(`Email = ${mail}, nome = ${user}`);

            return user;

        case "jaca-wars":
            const v = exercise.entrada.v;
            const theta = exercise.entrada.theta;
            const result = v * v * Math.sin(2 * Math.PI * theta / 180) / 9.8;
            var match;

            if (result < 98) {
                match = -1;
            }
            else if (result <= 102) {
                match = 0;
            }
            else {
                match = 1;
            }
            console.log(`v = ${v}, theta = ${theta}, resultado = ${result}, acertou = ${match}`);

            return match;

        case "ano-bissexto":
            const year = exercise.entrada.ano;
            const leap = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);

            console.log(`Ano = ${year}, bissexto = ${leap}`);

            return leap;

        case "volume-da-pizza":
            const r = exercise.entrada.z;
            const h = exercise.entrada.a;
            const volume = Math.round(Math.PI * r * r * h);

            console.log(`Raio = ${r}, altura = ${h}, volume = ${volume}`);

            return volume;

        case "mru":
            const s0 = exercise.entrada.s0;
            const velocidade = exercise.entrada.v;
            const t = exercise.entrada.t;
            const posicao = s0 + velocidade * t;

            console.log(`s0 = ${s0}, velocidade = ${velocidade}, t = ${t}, posicao = ${posicao}`);

            return posicao;

        case "inverte-string":
            const string = exercise.entrada.string;
            const inverted = string.split("").reverse().join("");

            console.log(`String = ${string}, invertida = ${inverted}`);

            return inverted;

        case "soma-valores":
            const objeto = exercise.entrada.objeto;

            const total = Object.values(objeto).reduce((soma, value) => {
                return soma + value
            });

            console.log("Objeto =")
            console.log(objeto);
            console.log(`Soma = ${total}`);

            return total;

        case "n-esimo-primo":
            const max = exercise.entrada.n;

            let primes = [2, 3];

            const isPrime = n => {
                var i = 1;
                var prime = primes[i++];

                while (prime <= Math.ceil(Math.sqrt(n))) {
                    if (n % prime == 0) {
                        return false;
                    }
                    prime = primes[i++];
                }
                return true;
            }
            var n = 5;

            for (i = 2; i <= max; i++) {
                while (!isPrime(n)) {
                    n += 2;
                }
                primes.push(n);
                n += 2;
            };
            const targetPrime = primes[max - 1];

            console.log(`n = ${max}, primo = ${targetPrime}`);
            return targetPrime;

        case "maior-prefixo-comum":
            const strings = exercise.entrada.strings.sort();

            if (strings.length == 0) {
                return "";
            }
            if (strings.length == 1) {
                return strings[0];
            }
            let commonPrefix = "";
            let frequece = 1;

            strings.forEach((str, z) => {
                // Min de 2 ja que prefixo é uma string de tamanho 2 ou maior
                for (let i = str.length; i >= 2; i--) {
                    let prefix = str.substring(0, i);

                    let count = strings.filter(x => x.substring(0, i) === prefix).length

                    if (count > frequece) {
                        commonPrefix = prefix;
                        frequece = count;
                    }
                    else if (count == frequece && prefix.length > commonPrefix.length) {
                        commonPrefix = prefix;
                        frequece = count;
                    }
                }
            });
            console.log("Strings =")
            console.log(strings);
            console.log(`Prefixo = '${commonPrefix}'`);

            return commonPrefix;

        case "soma-segundo-maior-e-menor-numeros":
            const numbers = exercise.entrada.numeros.sort(function (a, b) {
                return a - b;
            });

            const secondMin = numbers[1];
            const secondMax = numbers[numbers.length - 2];
            const sum = secondMin + secondMax;

            console.log("Numeros =")
            console.log(numbers);
            console.log(`min = ${secondMin}, max = ${secondMax}, Soma = ${sum}`);

            return sum;

        case "conta-palindromos":
            const palavras = exercise.entrada.palavras;
            let re = /[\W_]/g;

            const palindrome = str => {
                var lowRegStr = str.toLowerCase().replace(re, '');
                var reverseStr = lowRegStr.split('').reverse().join('');
                return reverseStr === lowRegStr;
            }
            const amount = palavras.filter((palavra, z) => palindrome(palavra)).length;

            console.log("Palavras =")
            console.log(palavras);
            console.log(`Palindromos = ${amount}`);

            return amount;

        case "soma-de-strings-de-ints":
            const stringsDeEntrada = exercise.entrada.strings;

            const somaDeStrings = stringsDeEntrada.map(str => parseInt(str)).reduce((soma, value) => {
                return soma + value
            });

            console.log("Strings =")
            console.log(stringsDeEntrada);
            console.log(`Soma = ${somaDeStrings}`);

            return somaDeStrings;

        case "soma-com-requisicoes":
            const endpoints = exercise.entrada.endpoints;
            somaComRequisicoes(name, endpoints);

            console.log("Endpoints =");
            console.log(endpoints);

            return null;

        case "caca-ao-tesouro":
            const endpoint = exercise.entrada.inicio;
            cacaAoTesouro(name, endpoint);

            console.log("Início = " + endpoint);

            return null;
    }
    console.log(name);
    console.log(exercise);

    return null;
}

async function somaComRequisicoes(name, endpoints) {
    var total = 0;

    for (let i = 0; i < endpoints.length; i++) {
        let endpoint = endpoints[i];
        response = await axios.get(endpoint, options);

        number = parseInt(response.data);
        console.log("[Soma com requisições] Número do endpoint " + endpoint + " = " + number);

        total += parseInt(response.data);
    }
    logResult(name, total);
}

async function cacaAoTesouro(name, endpoint) {
    response = await axios.get(endpoint, options);

    const nextEndpoint = response.data;

    if (isNaN(nextEndpoint)) {
        console.log("[Caça ao tesouro] Next endpoint = " + nextEndpoint);
        cacaAoTesouro(name, nextEndpoint);
    }
    else {
        console.log("[Caça ao tesouro] Número = " + nextEndpoint);
        logResult(name, parseInt(nextEndpoint));
    }
}

updateToken().then(() => {
    start();
});