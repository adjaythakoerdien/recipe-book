import { Injectable } from '@angular/core';


import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Hamburger',
      'Meeeaaaaat!',
      'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8aGFtYnVyZ2VyfHx8fHx8MTY0NDIxOTkyNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bun', 1)
      ]),
    new Recipe('Pasta',
      'What else you need to say?',
      'https://images.unsplash.com/photo-1615502732386-6be2dffffb1a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8cGFzdGF8fHx8fHwxNjQ0MjE5OTk0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=600',
      [
        new Ingredient('Pasta', 85),
        new Ingredient('Something else', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
