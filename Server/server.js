const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const userRoute = require("./src/routes/userRoute");

app.use("/users", userRoute);

app.get("/", (request, response) => {
    response.send("Hello World 👋");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});