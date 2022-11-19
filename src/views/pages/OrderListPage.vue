<template>
  <div class="pa-4">
    <page-title>
      My Offers
      <template #backButton>
        <v-btn outlined style="border-radius: 8px" icon @click="goBackPage">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </page-title>
    <div class="mt-12">
      <div class="py-1"
           style="display: grid;grid-template-columns: repeat(3,minmax(0,1fr));background: #f0f0f0;border-radius: 24px">
        <v-card
            @click="tab=0"
            style="border-radius: 24px"
            :color="tab===0?'success black--text lighten-2':'transparent'"
            :elevation="tab===0?1:0"
            class="pa-2 d-flex align-center text-caption justify-center"
        >
          Active
        </v-card>
        <v-card
            @click="tab=1"
            style="border-radius: 24px"
            :color="tab===1?'success black--text lighten-2':'transparent'"
            :elevation="tab===1?1:0"
            class="pa-2 d-flex text-caption align-center justify-center"
        >
          Complete
        </v-card>
        <v-card
            @click="tab=2"
            style="border-radius: 24px"
            :color="tab===2?'success black--text lighten-2':'transparent'"
            :elevation="tab===2?1:0"
            class="pa-2 d-flex align-center text-caption justify-center"
        >
          Logs
        </v-card>
      </div>
      <template v-if="tab===0">
        <div class="py-2">
          <v-list three-line>
            <order-list-item>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </order-list-item>
          </v-list>
        </div>
      </template>
      <template v-else-if="tab===1">
        <div class="py-2">
          <v-list three-line>
            <order-list-item>
              <template>
                <v-list-item-action-text>
                  from
                  <v-avatar size="16">
                    <v-img :src="'https://api.multiavatar.com/'+123+'.svg'"></v-img>
                  </v-avatar>
                </v-list-item-action-text>
              </template>
            </order-list-item>
            <order-list-item>
              <template>
                <v-list-item-action-text>
                  to
                  <v-avatar size="16">
                    <v-img :src="'https://api.multiavatar.com/'+123+'.svg'"></v-img>
                  </v-avatar>
                </v-list-item-action-text>
              </template>
            </order-list-item>
          </v-list>
        </div>
      </template>
      <template v-else>
        <div class="py-2">
          <v-list three-line>
            <order-list-item>
              <template>
                <template>
                  <v-list-item-action-text>
                    <span class="success--text text--darken-2">Add</span>
                  </v-list-item-action-text>
                </template>
              </template>
            </order-list-item>
            <order-list-item>
              <template>
                <template>
                  <v-list-item-action-text>
                    <span class="error--text text--darken-2">Delete</span>
                  </v-list-item-action-text>
                </template>
              </template>
            </order-list-item>
            <order-list-item>
              <template>
                <v-list-item-action-text>
                  <span>Fullfilled</span>
                </v-list-item-action-text>
              </template>
            </order-list-item>
          </v-list>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";
import PageTitle from "@/views/widgets/PageTitle";
import OrderListItem from "@/views/widgets/items/OrderListItem";

export default {
  components: {OrderListItem, PageTitle},
  name: "OrderListPage",
  computed: {},
  data: () => {
    return {
      tab: 2,
      userId: getCurrentUserId(),
    }
  },
  methods: {
    goBackPage() {
      this.$emit('close')
    }
  },
}
</script>

<style scoped>

</style>
