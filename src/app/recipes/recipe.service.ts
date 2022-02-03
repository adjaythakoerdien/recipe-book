import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Hamburger',
      'Meeeaaaaat!',
      'https://source.unsplash.com/random/600x400/?hamburger',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bun', 1)
      ]),
    new Recipe('Pasta',
      'What else you need to say?',
      'https://source.unsplash.com/random/600x400/?pasta',
      [
        new Ingredient('Pasta', 85),
        new Ingredient('Something else', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
