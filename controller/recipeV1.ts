
import {RecipeService} from '../services/recipeService';
import {Recipe} from '../api/v1/models/recipe';
import {
    Body, Controller, Delete, Example, Get, Header, Patch, Path, Post, Put, Query, Request, Response,
    Route, SuccessResponse, Tags
} from "tsoa";

@Route('Recipe')
export class RecipeV1 extends Controller {


    private recipeService = new RecipeService();
    @SuccessResponse(200, "Retrieve recipe")
    @Response(404, "Not found")
    @Response("default", "Unexpected error")
    @Get('/by_id/{id}')
    public async getRecipe(id: string): Promise<Recipe> {
        return await this.recipeService.getRecipe(id);
    }


    @SuccessResponse(200, "Retrieve recipe")
    @Response(404, "Not found")
    @Response("default", "Unexpected error")
    @Post('/addRecipe')
    public async addRecipe(@Body() body: any): Promise<any> {
        try{
            let recipeId = body.id;
            let recipeIngredients = body.ingredients;
            return await this.recipeService.addRecipe(recipeId, recipeIngredients);
        }catch (err) {
            return { "error": err };
        }
    }

    

}
