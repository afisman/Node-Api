import mongoose from "mongoose";
import { mongoConnect } from "../mongoConfig";
import { bookingsSeedDB } from "./bookingsSeed";
import { contactsSeedDB } from "./contactsSeed";
import { roomsSeedDB } from "./roomsSeed";
import { usersSeedDB } from "./usersSeed";

async function seedDB() {
    try {
        await mongoConnect();

        await roomsSeedDB();
        await bookingsSeedDB();
        await usersSeedDB();
        await contactsSeedDB();
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB()

