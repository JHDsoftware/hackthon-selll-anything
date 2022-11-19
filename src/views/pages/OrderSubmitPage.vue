<template>
  <v-container style="background: #f6f6f6;width: 100%" class="fill-height align-start">
    <div class="pa-6" style="width: 100%">
      <page-title>
        Submit New Offer
        <template #backButton>
          <v-btn outlined style="border-radius: 8px" icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <template #subtitle>
          meet something special 🐻
        </template>
      </page-title>
      <div class="mt-16" style="width: 100%">
        <template v-if="step===0">
          <div class="text-body-1
        font-weight-medium
        mb-8">What do you want to trade?
          </div>
          <v-autocomplete
              autofocus
              item-text="item_name"
              item-value="item_id"
              v-model="selectedItemId"
              :search-input.sync="searchInput"
              placeholder="A Cute... Car!"
              :items="items"
              @blur="lostFocus"
              filled
              rounded
          >
            <template #prepend-item>
              <v-subheader class="mb-1">
                <strong class="mr-1">Select one </strong> from our awesome list of wandering
              </v-subheader>
              <v-divider></v-divider>
            </template>
            <template v-slot:no-data>
              <v-list-item @click="lostFocus">
                <v-list-item-title>
                  <strong>Tap here</strong> to create this brand new Item
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-autocomplete>
          <next-step-button v-if="selectedItemId" @click="step=2"/>
        </template>
        <template v-else-if="step===1">
          <div>
            <div class="text-body-1
        font-weight-medium
        mb-8">Fill in some Details🔍
            </div>
            <div style="width: 100%" class="d-flex justify-center">
              <v-card
                  width="144" elevation="0"
                  color="grey lighten-2"
                  style="position: relative"
                  class="my-4">
                <div style="position: absolute;z-index: 1;width: 100%">
                  <v-file-input
                      style="opacity: 0;"
                      height="144"
                      full-width
                      filled
                      rounded
                      v-model="file"
                      prepend-icon=""
                      prepend-inner-icon="mdi-image"
                      accept="image/*"
                  />
                </div>
                <v-img width="100%"
                       height="144"
                       style="border-radius: 12px"
                       v-if="uploadUrl" :src="uploadUrl"/>
                <v-card
                    elevation="0"
                    color="transparent"
                    v-else
                    class="d-flex justify-center align-center"
                    height="144"
                >
                  <v-icon large>mdi-image</v-icon>
                </v-card>
                <v-btn elevation="0" color="green lighten-4" style="position: absolute;right: -12px;bottom: -12px" fab
                       x-small>
                  <v-icon>
                    mdi-plus
                  </v-icon>
                </v-btn>

              </v-card>
            </div>


            <div class="text-caption mb-2">
              Name of the Thing
            </div>
            <v-text-field v-model="itemName" placeholder="e.g. A cute Car" rounded filled></v-text-field>
            <div class="text-caption mb-2">
              Some detailed Description
            </div>
            <v-text-field
                v-model="itemDesc"
                placeholder="Something more you want to tell the people about this" rounded
                filled/>
            <back-step-button @click="step=1" class="mr-2"/>
            <next-step-button :disabled="!(itemDesc&&itemName&&file)" @click="confirmAddItem"/>
          </div>
        </template>
        <template v-else-if="step===2">
          <div style="width: 100%">
            <v-card
                v-if="currentItem"
                elevation="0" class="pa-4 d-flex align-center"
                style="border-radius: 16px;width: 100%"
            >
              <v-img style="border-radius: 16px" class="flex-grow-0" width="144" aspect-ratio="1"
                     :src="currentItem.imageUrl"></v-img>
              <div class="flex-grow-1 ml-4">
                <div class="text-caption">
                  Id: {{ currentItem.item_id }}
                </div>
                <div class="text-body-1 font-weight-medium">
                  {{ currentItem.item_name }}
                </div>
                <div style="max-lines: 3;
                text-overflow: ellipsis;
                overflow: hidden;
                line-clamp: 2"
                     class="text-body-2 mt-1">
                  {{ currentItem.description }}
                </div>


              </div>
            </v-card>
            <div class="text-body-1 mt-12 font-weight-medium">
              I would like to...
            </div>
            <div class="mt-4 d-flex">
              <v-card @click="buyOrSell='buy'"
                      v-on:click="scrollToElement()"
                      elevation="0"
                      :color="buyOrSell==='buy'?'primary lighten-4':''"
                      width="144"
                      style="border-radius: 16px">
                <v-responsive :aspect-ratio="1">
                  <div style="width: 100%;height: 100%;" class="d-flex align-center justify-center flex-column">
                    <v-icon size="36">mdi-basket-plus</v-icon>
                    <div class="text-body-2 mt-4 text--secondary font-weight-medium">
                      Buy this Item
                    </div>
                  </div>
                </v-responsive>
              </v-card>
              <v-card elevation="0"
                      class="ml-4"
                      @click="buyOrSell='sell'"
                      v-on:click="scrollToElement()"
                      :color="buyOrSell==='sell'?'primary lighten-4':''"
                      width="144"
                      style="border-radius: 16px">
                <v-responsive :aspect-ratio="1">
                  <div style="width: 100%;height: 100%;" class="d-flex align-center justify-center flex-column">
                    <v-icon size="36">mdi-store</v-icon>
                    <div class="text-body-2 mt-4 text--secondary font-weight-medium">
                      Sell this Item
                    </div>
                  </div>
                </v-responsive>
              </v-card>

            </div>
            <template v-if="buyOrSell">
              <div
                  class="mt-2">
                <div class="text-body-1 mt-12 font-weight-medium">
                  Current market status
                </div>
                <div class="d-flex mt-4">
                  <v-card width="120px" elevation="0" class="pa-2">
                    <div class="text-caption">Avg Price</div>
                    <div class="d-flex mt-4">
                      <v-icon small color="warning darken-2">mdi-finance</v-icon>
                      <v-spacer></v-spacer>
                      <div class="text-body-1">
                        {{ 15.95 | priceDisplay }}
                      </div>
                    </div>
                  </v-card>
                  <v-card width="120px" elevation="0" class="ml-2 pa-2">
                    <div class="text-caption">Total Stock</div>
                    <div class="d-flex mt-4">
                      <v-icon small color="success darken-2">mdi-server</v-icon>
                      <v-spacer></v-spacer>
                      <div class="text-body-1">
                        {{ 125 }}
                      </div>
                    </div>
                  </v-card>
                  <v-card width="120px" elevation="0" class="ml-2 pa-2">
                    <div class="text-caption">Min Price</div>
                    <div class="d-flex mt-4">
                      <v-icon small color="error darken-2">mdi-cart-percent</v-icon>
                      <v-spacer></v-spacer>
                      <div class="text-body-1">
                        {{ 12.5| priceDisplay }}(12)
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
              <div class="text-body-1 mt-12 font-weight-medium"
              >
                I {{ isBuy ? 'need' : 'will provide' }}...
              </div>
              <div class="mt-4 d-flex">
                <v-text-field
                    v-model="amount"
                    placeholder="The amount of your offer"
                    type="number" step="1" min="0"
                    rounded filled>
                </v-text-field>
              </div>
              <div class="text-body-1 font-weight-medium">
                {{ isBuy ? 'the max price I can afford is...' : 'the price for each is....' }}
              </div>
              <div v-if="isBuy&&amount" class="text-caption">
                <template v-if="rightNowPrice">
                  If you pay {{ rightNowPrice|priceDisplay }}, you can directly get the item you need.
                  <a
                      @click="price=rightNowPrice">Apply</a>
                </template>
                <template v-else>
                  <v-progress-circular size="8"></v-progress-circular>

                </template>

              </div>
              <div class="mt-4 d-flex">
                <v-text-field
                    v-model="price"
                    placeholder="price, e.g. 123.5"
                    type="number" step="0.01" min="0"
                    rounded filled>
                  <template #append>
                    <v-icon size="20">mdi-currency-eur</v-icon>
                  </template>
                </v-text-field>
              </div>

              <v-btn @click="submitOffer" height="52"
                     rounded
                     elevation="0"
                     color="primary lighten-4 black--text">
                Submit Offer
                <v-icon right>mdi-check</v-icon>
              </v-btn>
            </template>
            <div id="goDown"></div>
          </div>
        </template>

      </div>
    </div>
  </v-container>

</template>

<script>
import PageTitle from "@/views/widgets/PageTitle";
import NextStepButton from "@/views/widgets/NextStepButton";
import BackStepButton from "@/views/widgets/BackStepButton";
import {uploadImage} from "@/dataLayer/service/firebase/uploadImage";
import {addItem, getItems} from "@/dataLayer/service/firebase/item";
import {addOrder, SideOption} from "@/dataLayer/service/firebase/order";

export default {
  name: "OrderSubmitPage",
  components: {BackStepButton, NextStepButton, PageTitle},
  watch: {
    searchInput(val) {
      if (val) {
        this.lastSearchInput = val
      }
    },
    amount(val) {
      if (this.isBuy && val) {
        setTimeout(() => {
          this.rightNowPrice = 12.5
        }, 2000)

      } else {
        this.rightNowPrice = ''
      }
    }
  },
  computed: {
    isBuy: function () {
      return this.buyOrSell === 'buy'
    },
    uploadUrl: function () {
      console.log(this.file)
      return this.file ? URL.createObjectURL(this.file) : null
    },
    currentItem: function () {
      console.log(this.items, this.selectedItemId)
      return this.items.find(it => it.item_id === this.selectedItemId)
    }
  },
  data: function () {
    return {
      itemList: [],
      itemName: '',
      itemDesc: '',
      step: 0,
      file: null,
      items: [],
      selectedItemId: null,
      searchInput: '',
      lastSearchInput: '',
      buyOrSell: null,
      amount: '',
      rightNowPrice: '',
      price: '',
    };
  },
  methods: {
    scrollToElement() {
      const el = document.getElementById('goDown')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({behavior: "smooth"})
        }, 10)

      }
    },
    async reloadItems() {
      this.items = await getItems()
    },
    async submitOffer() {
      await addOrder(this.selectedItemId,
          this.price, this.amount,
          this.isBuy ? SideOption.Buy : SideOption.Sell)
      this.$router.push('/loading')
    },
    startAddItem() {
      this.itemName = this.lastSearchInput
      this.itemDesc = ''
      this.file = null
      this.step = 1
    },
    async confirmAddItem() {
      const imageUrl = await uploadImage(this.file)
      const id = await addItem(this.itemName, this.itemDesc, imageUrl, []);
      await this.reloadItems()
      this.selectedItemId = id
      this.step = 2
    },
    lostFocus() {
      if (this.lastSearchInput) {
        if (!this.selectedItemId) {
          this.startAddItem()
        }
      }
    }
  },
  mounted() {
    this.reloadItems()
  }

}
</script>

<style scoped>

</style>
