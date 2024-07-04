require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// SWAGGER
const swaggerUi = require("swagger-ui-express");
const apiDoc = require("./apidocs.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc));
// END SWAGGER

const memberRoute = require("./routes/member");
const bookRoute = require("./routes/book");
const borrowRoute = require("./routes/borrow");

app.use("/member", memberRoute);
app.use("/book", bookRoute);
app.use("/borrow", borrowRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async function () {
  try {
    await sequelize.authenticate();
    console.log(`Berjalan di port ${PORT}`);
  } catch (error) {
    console.error("Gagal terhubung: ke DB", error);
  }
});
