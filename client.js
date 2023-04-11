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

    Object.keys(response.data).forEach((key) => handleExercise(key, response.data[key]));
}

function handleExercise(name, exercise) {
    console.log(exercise.titulo);

    switch (name) {
        case "soma":
            console.log(`a = ${exercise.entrada.a} b = ${exercise.entrada.b}, soma = ${exercise.entrada.a + exercise.entrada.b}`);
            return;
        case "tamanho-string":
            let text = exercise.entrada.string;
            console.log(`Texto = ${text}, tamanho = ${text.length}`);
            return;
        case "nome-do-usuario":
            let mail = exercise.entrada.email;
            console.log(`Email = ${mail}, nome = ${mail.split("@")[0]}`);
            return;
    }
    console.log(name);
    console.log(exercise);
}

updateToken().then(() => {
    start();
});