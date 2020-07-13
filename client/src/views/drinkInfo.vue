<template>
  <div class="drinkInfo">
    <el-row>
      <el-col :span="24">
        <navbar />
      </el-col>
      <el-col :span="24">
        <div class="content">
          <div v-loading="fetchingData" class="selectedDrink">
            <img
              :src="drinks[0] ? drinks[0].thumbImg : ''"
              class="selectedImage"
              alt="selectedCocktail"
            />
          </div>
          <div class="content_info">
            <ul class="content_infoList" v-if="drinkInfoForList.length > 0">
              <li v-for="(item, index) in drinkInfoForList" :key="index">
                <template v-if="item.name === 'Tags'">
                  <el-tag
                    v-for="(subItem, index) in item.value"
                    :key="index"
                    :type="subItem.type"
                    effect="dark"
                    class="tag"
                  >
                    {{ subItem.label }}
                  </el-tag>
                </template>
                <template v-else>
                  <p :class="`${item.name}--name general-name-style`">
                    {{ item.name }}
                  </p>
                  <p :class="`${item.name}--value general-value-style`">
                    {{ item.value }}
                  </p>
                </template>
              </li>
            </ul>
          </div>
          <ingredientsTable />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from "./../components/navbar";
import ingredientsTable from "./../components/ingredientsTable";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "drinkInfo",
  components: { navbar, ingredientsTable },
  created() {
    let drinkId = this.$route.params.id;
    this.getACocktail(drinkId);
  },
  destroyed() {
    this.setDrinks([]);
  },
  computed: {
    ...mapGetters("cocktails", ["fetchingData", "drinks"]),
    drinkInfoForList() {
      let result = [];

      if (this.drinks[0]) {
        let ObjectKeys = Object.keys(this.drinks[0]).filter(
          key => key !== "id" && key !== "ingredients" && key !== "thumbImg"
        );

        if (ObjectKeys.length !== 0) {
          ObjectKeys.forEach(key => {
            let set = { name: null, value: null };

            const mapping = {
              name: "Name",
              category: "Category",
              alcoholic: "Is it alcoholic?",
              modifiedDate: "Last Updated at",
              glass: "Glass",
              instructions: "Instructions",
              tags: "Tags",
              thumbImg: "ThumbImg"
            };

            set.name = mapping[key];
            set.value = this.drinks[0][key];

            if(set.name === 'Tags'){
              set.value = set.value.map((d,index)=>{
                let newObject = {}
                newObject.label = d

                switch(index){
                  case 0:
                    newObject.type = '';
                    break
                  case 1:
                    newObject.type = 'success';
                    break
                  case 2:
                    newObject.type = 'info';
                    break
                  case 3:
                    newObject.type = 'warning';
                    break
                  case 4:
                    newObject.type = 'danger';
                    break
                  default:
                    newObject.type = ''
                    break
                }

                return newObject
              })
            }

            result.push(set);
          });
        }
      }

      return result;
    }
  },
  methods: {
    ...mapMutations("cocktails", ["setDrinks"]),
    ...mapActions("cocktails", ["getACocktail"])
  }
};
</script>

<style lang="scss" scoped src="./../styles/drinkInfo.scss"></style>
