import app from "./app";
import connectMongoDB from "./db";

// Start the server and connect to the database
const port = process.env.PORT || 5000;

(async () => {
  try {
    const connection = await connectMongoDB();

    if (connection) {
      app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Database connection established successfully`);
      });
    }
  } catch (error) {
    console.error("Error starting the server: ", error);
    process.exit(1);
  }
})();
