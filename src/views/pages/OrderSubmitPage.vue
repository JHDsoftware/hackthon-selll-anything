<template>
  <v-container style="background: #f6f6f6" class="fill-height align-start">
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
              v-model="selectedItem"
              return-object
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
          <next-step-button v-if="selectedItem" @click="step=2"/>
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
            <v-card elevation="0" class="pa-4 d-flex align-center"
                    style="border-radius: 16px;width: 100%"
            >
              <v-img style="border-radius: 16px" class="flex-grow-0" width="144" aspect-ratio="1"
                     src="https://random.imagecdn.app/500/500"></v-img>
              <div class="flex-grow-1 ml-4">
                <div class="text-body-1 font-weight-medium">
                  Some Item Name
                </div>
                <div style="max-lines: 3;
                text-overflow: ellipsis;
                overflow: hidden;
                line-clamp: 2"
                     class="text-body-2 mt-4">
                  Some Item Named wadhuaw dh iuahd uiahdindhawuid hawuidhauihdui ahdui hauid huiawhd uiawhuid haui hdwuh
                  ahuidia uwn...
                </div>
                <div class="text-caption mt-4">
                  Id: Iwadw12387
                </div>
              </div>
            </v-card>
            <div class="text-body-1 mt-12 font-weight-medium">
              I would like to...
            </div>
            <div class="mt-4 d-flex">
              <v-card @click="buyOrSell='buy'"
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
            <div class="text-body-1 mt-12 font-weight-medium">
              for..
            </div>
            <div class="mt-4 d-flex">
              <v-text-field
                  placeholder="price, e.g. 123.5"
                  type="number" step="0.01" min="0"
                  rounded filled>
                <template #append>
                  <v-icon size="20">mdi-currency-eur</v-icon>
                </template>
              </v-text-field>
            </div>
            <div class="text-body-1 font-weight-medium"
            >
              Amount
            </div>
            <div class="mt-4 d-flex">
              <v-text-field
                  placeholder="The amount of your offer"
                  type="number" step="1" min="0"
                  rounded filled>
              </v-text-field>
            </div>
            <v-btn @click="submitOffer" height="52" rounded elevation="0"
                   color="primary lighten-4 black--text">
              Submit Offer
              <v-icon right>mdi-check</v-icon>
            </v-btn>
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
import {addItem} from "@/dataLayer/service/firebase/item";

export default {
  name: "OrderSubmitPage",
  components: {BackStepButton, NextStepButton, PageTitle},
  watch: {
    searchInput(val) {
      if (val) {
        this.lastSearchInput = val
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
    }
  },
  data: function () {
    return {
      itemName: '',
      itemDesc: '',
      step: 0,
      file: null,
      items: ['apple', 'banana', 'banana2'],
      selectedItem: null,
      searchInput: '',
      lastSearchInput: '',
      buyOrSell: null,
    };
  },
  methods: {
    submitOffer() {
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
      console.log(imageUrl)
      await addItem(this.itemName, this.itemDesc, imageUrl, []);
      this.step = 2
    },
    lostFocus() {
      if (this.lastSearchInput) {
        if (!this.selectedItem) {
          this.startAddItem()
        }
      }
    }
  }

}
</script>

<style scoped>

</style>
