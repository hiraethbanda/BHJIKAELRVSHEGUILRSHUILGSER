exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { guess } = JSON.parse(event.body || "{}");
    let ans = "";

    if (guess === "example 1") {
        ans = "say someting";
    }
    else if (guess === "example 2") {
        ans = "say other thing";
    }
    else if (guess === "oi"){
        ans = "olá!";
    }
    else if (guess === "") {
        ans = "";
    }
    else {
        ans = "Error";
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ans }),
    };
};