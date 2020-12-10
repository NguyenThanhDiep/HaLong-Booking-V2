<template>
    <div class="search-area w-100">
        <b-img
            src="https://static.asiawebdirect.com/m/bangkok/portals/vietnam/homepage/ha-long-bay/pagePropertiesImage/ha-long-bay.jpg.jpg"
            alt="Ha Long Background"
            block
            fuild
            center
            class="search-img"
            :style="{ height: heightImg }"
        />
        <div class="search-form px-md-0 px-lg-4 py-md-0 py-lg-3" :style="{ top: typePage1 === 'home' ? '100px' : '37.5px' }">
            <h5 class="text-left mb-3 mx-3">Trải nghiệm kì nghỉ tuyệt vời</h5>
            <div class="row mb-2 mb-lg-3 mx-3">
                <div class="col-lg-4 col-md-12 pl-0">
                    <b-input
                        id="inline-form-input-name"
                        v-model="nameHotel"
                        class="mb-2 mr-md-2 mb-md-0"
                        placeholder="Tên khách sạn"
                    ></b-input>
                </div>
                <div class="col-lg-3 col-md-12 mt-lg-0 pl-0 mt-md-2">
                    <!-- <b-form-datepicker
                        v-model="checkInDate"
                        class="mb-2 mr-md-2 mb-md-0"
                        placeholder="Nhận phòng"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        locale="vi"
                        :value-as-date="true"
                        :state="validateCheckInDate"
                    ></b-form-datepicker> -->
                    <div v-show="validateCheckInDate===false" class="required font-italic">
                        {{ wrongCheckInDateInfo }}
                    </div>
                </div>
                <div class="col-lg-3 col-md-12 mt-lg-0 pl-0 mt-md-2">
                    <!-- <b-form-datepicker
                        v-model="checkOutDate"
                        class="mb-2 mr-md-2 mb-md-0"
                        placeholder="Trả phòng"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        locale="vi"
                        :value-as-date="true"
                        :state="validateCheckOutDate"
                    ></b-form-datepicker> -->
                    <div v-show="validateCheckOutDate===false" class="required font-italic">
                        {{ wrongCheckOutDateInfo }}
                    </div>
                </div>
                <div class="col-lg-2 col-md-12 mt-md-2 mt-lg-0 pl-md-0 text-lg-left">
                    <b-button class="w-lg-100 px-5" :disabled="isDisableSearchButton" variant="primary" @click="onSearchHotel">Tìm</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop } from 'nuxt-property-decorator';
import moment from 'moment';
export default class SearchComponent extends Vue {
    // -----Prop-----//
    @Prop({ default: 'normal' }) typePage!: string;

    nameHotel: string = '';
    checkInDate: Date | null = null
    checkOutDate: Date | null = null;
    typePage1: string = 'normal';

    mounted() {
        this.typePage1 = this.typePage;
    }

    get heightImg(): string {
        return this.typePage === 'home' ? '100vh' : '300px';
    }

    onSearchHotel() {
        const searchString = this.nameHotel.trim();
        if (!!searchString || !!this.checkInDate || !!this.checkOutDate)
            this.$router.push({ name: 'FindHotel', query: { searchString, checkInDate: moment(this.checkInDate).format('D/M/YYYY'), checkOutDate: moment(this.checkOutDate).format('D/M/YYYY') } })
                .then(() => { }).catch(() => { });
        else this.$router.push({ name: 'FindHotel' }).then(() => { }).catch(() => { });
    }

    get validateCheckInDate(): boolean | null {
        if (this.checkInDate) {
            return moment(this.checkInDate).isSameOrAfter(moment().startOf('day'), 'dates');
        }
        return null;
    }

    get validateCheckOutDate(): boolean | null {
        if (!!this.checkInDate && !!this.checkOutDate) {
            return moment(this.checkOutDate).isAfter(moment().startOf('day'), 'dates') && moment(this.checkOutDate).isAfter(this.checkInDate);
        }
        if (this.checkOutDate) {
            return moment(this.checkOutDate).isAfter(moment().startOf('day'), 'dates');
        }
        return null;
    }

    get isDisableSearchButton(): boolean {
        return this.validateCheckInDate === false || this.validateCheckOutDate === false;
    }

    get wrongCheckInDateInfo(): string {
        if (!!this.checkInDate && !moment(this.checkInDate).isSameOrAfter(moment().startOf('day'), 'dates')) return 'Ngày nhận phòng phải bằng hoặc sau ngày hôm nay';
        return '';
    }

    get wrongCheckOutDateInfo(): string {
        if (!!this.checkInDate && !!this.checkOutDate && !moment(this.checkOutDate).isAfter(this.checkInDate)) return 'Ngày trả phòng phải sau ngày nhận phòng';
        if (!!this.checkOutDate && !moment(this.checkOutDate).isAfter(moment().startOf('day'), 'dates')) return 'Ngày trả phòng phải sau ngày hôm nay';
        return '';
    }
}
</script>

<style lang="scss">
.search-area ::v-deep {
    z-index: 1;
    color: $color-blue;
    position: relative;
    h5 {
        font-weight: bolder;
        margin: 30px 0;
    }
    .search-img {
        width: 100%;
    }
    .search-form {
        opacity: 0.7;
        position: absolute;
        width: 70%;
        background-color: $color-white;
        left: 15%;
    }
    label.text-wrap {
        white-space: nowrap !important;
        overflow: hidden !important;
    }
}
</style>
