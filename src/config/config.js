module.exports = (mongoose) => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err, "Not Connecting");
    });
  mongoose.connection.on("err", (err) => {
    console.log(err);
  });
};
