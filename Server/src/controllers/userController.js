const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUser(request, response) {
    const userId = request.userId;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) return response.status(404).send({ error: "User not found" });

        response.status(200).send(user);
    } catch (err) {
        response.status(500).send({ error: err });
    }
}

async function createUser(request, response) {
    try {
        const { email, name, password } = request.body;

        const hash = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                name,
                password: hash,
            },
        });

        return response.status(201).send({ error: false });
    } catch (err) {
        return response.status(500).send({ error: err });
    }
}

async function loginUser(request, response) {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).send({ error: "Missing required information" });

    const foundUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!foundUser) return response.status(400).send({ error: "User with this email does not exist" });

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return response.status(400).send({ error: "Invalid password" });

    const jwtToken = jwt.sign({ id: foundUser.id, email: foundUser.email, name: foundUser.name }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    response.status(200).send({ token: jwtToken });
}

module.exports = {
    getUser,
    createUser,
    loginUser,
};
