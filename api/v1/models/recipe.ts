export interface Recipe {
    // Variable Deceleration
    "_id": string,
    "ingredients": {
        [ingredientsId: string]: {
            "name": string,
            "unit": string,
            "quantity": string
        }
    }
}
