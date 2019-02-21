import * as request from "request";
import db = require("../db/main");

export class RecipeService{
    public async addRecipe(recipeId: string, recipeIngredients: object):Promise<any>{
        let updateClient: any = {
            "id":recipeId,
            "ingredients": recipeIngredients
        };
        let result = await new Promise<any>((resolve, reject) => {
            db.conn.insert(updateClient, (err, result) => {
                updateClient.rev = result.rev;
                resolve(updateClient);
            })
        }).catch(err=>{
            console.log("error: "+err)
        });
        return result;
    }

    public async getRecipe(recipeId: string):Promise<any>{
        let result = await new Promise<any>((resolve, reject) => {
            db.conn.get(recipeId, (err, existingRecipe) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(existingRecipe);
                }
            });
        }).catch(err=>{
            console.log("error: "+err)
        });
        return result;
    }
};