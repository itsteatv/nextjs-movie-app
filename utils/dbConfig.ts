import mongoose from "mongoose";

export async function connect() {
    if (mongoose.connections[0].readyState) return;

    try {
        mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connection established");
        });

        mongoose.connection.on("error", (error) => {
            console.log("MongoDB connection error" + error);
            process.exit();
        })
    } catch (error: any) {
        console.log(error);
    }
}