<template>
  <div class="ingredientTable">
    <table
      v-if="drinks[0]"
      v-loading="fetchingData"
      class="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100% table-fullWidth"
    >
      <thead>
        <tr>
          <th scope="col" data-label="Name">Name</th>
          <th scope="col" data-label="Quantity">Quantity</th>
          <th scope="col" data-label="Image">Image</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(drink, index) in drinks[0].ingredients" :key="index">
          <td data-label="Name">{{ drink.name }}</td>
          <td data-label="Quantity">{{ drink.measure }}</td>
          <td data-label="Image">
            <img
              :src="drink.thumb"
              class="ingredientTable__image"
              alt="randomDrinkIngredientImage"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ingredientsTable",
  computed: {
    ...mapGetters("cocktails", ["drinks", "fetchingData"])
  }
};
</script>

<style lang="scss" scoped src="./../styles/ingredientsTable.scss"></style>
