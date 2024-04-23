import { Room } from "../interfaces/Room";
import { faker } from '@faker-js/faker';
import { amenities_list } from "../util/constants";


export const roomsSeedDB = async () => {
    try {

        await Room.collection.drop();


        for (let i = 0; i < 15; i++) {
            const offer = faker.helpers.arrayElement(["Yes", "No"])

            const document = new Room({
                photos: [faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }), faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }), faker.image.urlLoremFlickr({ category: 'hotel,bedroom' })],
                room_type: faker.helpers.arrayElement(["Single Room", "Double Room", "Deluxe Superior", "Suite"]),
                room_number: faker.lorem.word() + '-' + faker.number.int({ max: 500 }),
                description: faker.lorem.paragraph(2),
                offer: offer,
                room_floor: faker.number.int({ max: 21 }),
                rate: faker.commerce.price({ min: 5000, max: 35000 }),
                discount: offer === "Yes" ? faker.number.int({ min: 1, max: 99 }) : 0,
                amenities: faker.helpers.arrayElements(amenities_list, { min: 1, max: amenities_list.length }),
                status: faker.helpers.arrayElement(["Available", "Booked"])
            })
            await document.save();
        }

    } catch (err) {
        console.log(err);
    }
}

