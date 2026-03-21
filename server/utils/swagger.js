import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],

        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "connect.sid",
                },
            },
        },
        security: [{ cookieAuth: [] }],
    },
    apis: ["./routes/*.js", "./server.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;