export interface User {
    // Variable Deceleration
    "_id": string,
    "shoppingcart":{
        "recipeList": [
            {
                "recipeId": string,
                "quantity": string 
            }
        ]
    }
    "recs": {
        [recId: string]: {
            "timestamp": string,
            "name": string,
            "recipeList": [
                {
                    "recipeId": string,
                    "quantity": string 
                }
            ]
        }
    }
}