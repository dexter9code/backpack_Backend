const app = require("./app");
const mongoose = require("mongoose");

//mongodb connection
mongoose
  .connect(process.env.db)
  .then(() => console.log(`Connected to mongodb`))
  .catch((err) =>
    console.log(`Error whilte connecting to mongodb ${err.message}`)
  );

// listining
const PORT = process.env.PORT || 9696;
app.listen(PORT, () => console.log(`listinig on port ${PORT}...`));
