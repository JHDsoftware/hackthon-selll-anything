<template>
  <v-container style="background: #f6f6f6;width: 100%" class="fill-height align-start">
    <div class="pa-6" style="width: 100%">
      <page-title>
        我可以帮带
        <template #backButton>
          <v-btn outlined style="border-radius: 8px" icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <template #subtitle>
          提交我的帮带信息，快速寻找帮带订单！
        </template>
      </page-title>
      <v-form v-model="formValid" ref="form">
        <div class="mt-16" style="width: 100%">
          <div>
            <div class="text-subtitle-1 font-weight-black text-decoration-underline">我的行程</div>
            <fly-to-china-selector v-model="flyToChina"></fly-to-china-selector>
            <div class="mt-8">
              <v-dialog style="width: min-content;" max-width="286px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-bind="attrs"
                                required
                                v-on="on" label="起飞日期*"
                                filled v-model="takeoffDate"
                                :rules="nameRules"
                                readonly>

                  </v-text-field>

                </template>
                <v-card>
                  <div>
                    <v-date-picker :min="today" v-model="takeoffDate"></v-date-picker>
                  </div>
                </v-card>
              </v-dialog>

            </div>
            <div style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 16px">
              <div>
                <v-text-field v-model="takeoffCity"
                              :rules="nameRules"
                              label="起飞机场*"
                              filled></v-text-field>
              </div>
              <div>
                <v-text-field
                    v-model="landingCity"
                    :rules="nameRules"
                    label="落地机场*"
                    filled></v-text-field>
              </div>
            </div>
            <div style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 16px">
              <div>
                <v-text-field
                    :rules="nameRules"
                    label="出发城市*"
                    filled
                    v-model="leavingCity"
                />
              </div>
              <div>
                <v-text-field
                    :rules="nameRules"
                    label="到达城市*"
                    filled
                    v-model="arriveCity"
                />
              </div>
            </div>
            <div>
              <v-card
                  width="100%" elevation="0"
                  color="white lighten-2"
                  style="position: relative"
                  class="mb-4">
                <div style="position: absolute;z-index: 1;width: 100%">
                  <v-file-input
                      style="opacity: 0;"
                      height="96"
                      full-width
                      filled
                      :rules="nameRules"
                      rounded
                      v-model="file"
                      prepend-icon=""
                      prepend-inner-icon="mdi-image"
                      accept="image/*"
                  />
                </div>
                <div v-if="uploadUrl">
                  <v-img width="100%"
                         height="96"
                         style="border-radius: 12px"
                         :src="uploadUrl"/>
                  <div class="text-body-2 mt-1 pa-1">✅ 机票照片已经上传</div>
                </div>

                <v-card
                    elevation="0"
                    color="transparent"
                    v-else
                    class="pa-4 d-flex align-center"
                >
                  <div class="mr-4">
                    <v-icon large>mdi-image</v-icon>
                  </div>
                  <div>
                    <div class="text-body-2">点击这里上传机票照片</div>
                    <div class="text-caption">
                      我们需要您的机票来校验您的信息真实性
                    </div>
                  </div>

                </v-card>
              </v-card>
            </div>
            <div>
              <v-card
                  width="100%" elevation="0"
                  color="white lighten-2"
                  style="position: relative"
                  class="mb-4">
                <div style="position: absolute;z-index: 1;width: 100%">
                  <v-file-input
                      style="opacity: 0;"
                      height="96"
                      full-width
                      filled
                      :rules="nameRules"
                      rounded
                      v-model="idFile"
                      prepend-icon=""
                      prepend-inner-icon="mdi-image"
                      accept="image/*"
                  />
                </div>
                <div v-if="fileUrl">
                  <v-img width="100%"
                         height="96"
                         style="border-radius: 12px"
                         :src="fileUrl"/>
                  <div class="text-body-2 mt-1 pa-1">✅ 个人证件照片已经上传</div>
                </div>

                <v-card
                    elevation="0"
                    color="transparent"
                    v-else
                    class="pa-4 d-flex align-center"
                >
                  <div class="mr-4">
                    <v-icon large>mdi-image</v-icon>
                  </div>
                  <div>
                    <div class="text-body-2">点击这里上传个人证件照片</div>
                    <div class="text-caption">
                      我们需要您的个人证件照片来校验您的信息真实性
                    </div>
                  </div>

                </v-card>
              </v-card>
            </div>


          </div>
          <div class="mt-8">
            <div class="text-subtitle-1 font-weight-black text-decoration-underline">价格设定</div>
            <div class="mt-2">
              <v-text-field :rules="nameRules" label="小件物品每千克价格*" filled
                            type="number" step="0.01" min="0"
                            v-model="smallPackagePrice"
                            messages="不足一千克部分按照一千克计算"
                            append-icon="mdi-currency-eur"/>
            </div>
            <div class="mt-2">
              <v-text-field :rules="nameRules"
                            step="0.01"
                            v-model="filePrice"
                            min="0"
                            label="每份文件价格*"
                            filled
                            type="number"
                            append-icon="mdi-currency-eur"/>
            </div>
            <div class="d-flex align-center mt-n4">
              <v-checkbox v-model="canTakeMedicine" hide-details label="我可以携带药品">
              </v-checkbox>
            </div>
            <div class="d-flex align-center">
              <v-checkbox v-model="canTakeLuxury" hide-details label="我可以携带奢饰品">
              </v-checkbox>
            </div>
          </div>
          <div class="mt-8">
            <div class="text-subtitle-1 font-weight-black text-decoration-underline">补充说明</div>
            <div class="text-caption">其他想要让您的潜在客户了解的一些详情</div>
            <div class="mt-2">
              <v-textarea label="补充说明" v-model="appendInfo" filled></v-textarea>
            </div>
          </div>
          <div class="mt-8">
            <div class="text-subtitle-1 font-weight-black text-decoration-underline">联系信息*</div>
            <div class="text-caption">以下联系信息将会在用户解锁信息后被用户获取，请注意保护个人隐私。</div>
            <div class="mt-2">
              <v-textarea label="联系信息*" v-model="contactInfo" filled :rules="nameRules"/>
            </div>
          </div>

          <div class="d-flex">
            <v-simple-checkbox color="primary" v-model="confirmOk" class="mr-2"></v-simple-checkbox>
            <div class="text-caption mt-4">我保证以上信息真实有效，我已经知晓本平台不对最终交易结果做任何保证。</div>
          </div>

          <v-btn @click="submit"
                 :loading="loading"
                 :disabled="!canSubmit" color="primary" elevation="0" class="mt-4"
                 large block>
            提交
            <v-icon right>mdi-check</v-icon>
          </v-btn>

        </div>
      </v-form>
      <v-dialog persistent v-model="showAddCompleteDialog" max-width="300px">
        <v-card class="pa-4 d-flex flex-column align-center">
          <div class="text-body-1">
            提交成功！
          </div>
          <div class="text-body-2 mt-4 text-center">
            您提交的信息将在审核后显示在平台上，审核通过时将会给您的注册邮箱发送一封邮件。非常感谢🙇‍！
          </div>
          <div class="mt-4">
            <v-btn @click="confirmed" elevation="0">
              好的
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import PageTitle from "@/views/widgets/PageTitle"
import dayjs from "dayjs"
import {uploadImage} from "@/dataLayer/service/firebase/uploadImage"
import {addPickupOrder} from "@/dataLayer/service/firebase/pickupOrder"
import FlyToChinaSelector from "@/views/widgets/FlyToChinaSelector.vue"

const today = dayjs().format('YYYY-MM-DD')
export default {
  props: {id: {}},
  name: "OrderSubmitPage",
  components: {FlyToChinaSelector, PageTitle},
  watch: {
    flyToChina() {
      this.takeoffCity = null
      this.landingCity = null
    }
  },
  computed: {
    uploadUrl: function () {
      return this.file ? URL.createObjectURL(this.file) : null
    },
    fileUrl: function () {
      return this.idFile ? URL.createObjectURL(this.idFile) : null
    },
    startCity: function () {
      return this.flyToChina ? this.germanyCities : this.chineseCities
    },
    targetCity: function () {
      return this.flyToChina ? this.chineseCities : this.germanyCities
    },
    canSubmit: function () {
      return this.confirmOk && this.formValid
    }
  },
  data: function () {
    return {
      loading: false,
      showAddCompleteDialog: false,
      formValid: false,
      today,
      nameRules: [
        v => !!v || '请填写此信息',
      ],
      germanyCities: [
        "杜塞",
        "法兰克福",
        "柏林",
        "汉堡",
        "慕尼黑",
        "斯图加特",
        "德累斯顿",
        "纽伦堡",
        "汉诺威",
      ],
      chineseCities: [
        "上海",
        "北京",
        "青岛",
        "天津",
        "广州",
        "成都",
      ],

      file: null,
      flyToChina: true,
      takeoffDate: today,
      takeoffCity: null,
      leavingCity: "",
      arriveCity: "",
      landingCity: null,
      smallPackagePrice: null,
      filePrice: null,
      appendInfo: null,
      contactInfo: null,
      confirmOk: false,
      idFile: null,
      canTakeMedicine: false,
      canTakeLuxury: false


    }
  },
  methods: {
    async submit() {
      this.loading = true
      const imageUrl = await uploadImage(this.file)
      const idCardUrl = await uploadImage(this.idFile)
      await addPickupOrder(
          this.flyToChina,
          this.takeoffDate,
          this.takeoffCity,
          this.landingCity,
          this.smallPackagePrice,
          this.filePrice,
          this.appendInfo,
          this.contactInfo,
          imageUrl,
          idCardUrl,
          this.arriveCity,
          this.leavingCity,
          this.canTakeMedicine,
          this.canTakeLuxury)
      this.loading = false
      this.showAddCompleteDialog = true

    },
    async confirmed() {
      this.showAddCompleteDialog = true
      await this.$router.push('/loading')
    }
  },
  mounted() {

  }

}
</script>


<style scoped>

</style>
