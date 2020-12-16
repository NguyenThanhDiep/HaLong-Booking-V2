<template>
    <div class="hotel">
        <SearchComponent @onAfterSearchHotel="onAfterSearchHotel" />
        <div class="row text-left">
            <!-- Search Menu when Screen Large -->
            <div class="col-3 p-3 pl-4 d-none d-lg-block">
                <div class="panel-filter p-3">
                    <div class="mb-3">
                        <div class="font-weight-bold">Theo mức giá</div>
                        <div class="d-flex justify-content-between">
                            <div>{{ minPrice | number-masked }}đ</div>
                            <div>{{ maxPrice | number-masked }}đ</div>
                        </div>
                        <div class="filter-price-area">
                            <b-form-input v-model="firstPrice" type="range" min="0" max="5000000" step="100000"></b-form-input>
                            <b-form-input v-model="secondPrice" type="range" min="0" max="5000000" step="100000"></b-form-input>
                        </div>
                        <b-form-checkbox v-model="filterIsSale" class="black small">Đang giảm giá</b-form-checkbox>
                    </div>
                    <div>
                        <div class="font-weight-bold">Theo tiêu chuẩn sao</div>
                        <b-form-group>
                            <b-form-checkbox-group v-model="filterStars" stacked>
                                <b-form-checkbox v-for="star in starHotel" :key="star" :value="star">
                                    <i v-for="(s, index) in star" class="fas fa-star yellow" :key="index"></i>
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </div>
                    <div>
                        <div class="font-weight-bold">Dịch vụ miễn phí</div>
                        <b-form-group>
                            <b-form-checkbox-group v-model="filterFreeServices" stacked>
                                <b-form-checkbox v-for="freeService in freeServiceHotel" :key="freeService.code" :value="freeService.code">{{ freeService.name }}</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </div>
                    <div>
                        <div class="font-weight-bold">Các tiện ích</div>
                        <b-form-group>
                            <b-form-checkbox-group v-model="filerServices" stacked>
                                <b-form-checkbox v-for="service in serviceHotel" :key="service.code" :value="service.code">{{ service.name }}</b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </div>
                </div>
            </div>
            <!-- Search Menu in Sidebar when Screen small -->
            <b-sidebar
                id="search-menu-sidebar"
                right
                shadow="lg"
                backdrop
                backdrop-variant="transparent"
                no-header
                sidebar-class="d-lg-none"
            >
                <div class="p-3">
                    <div class="mb-3">
                        <div class="font-weight-bold">Theo mức giá</div>
                        <div class="d-flex justify-content-between">
                            <div>{{ minPrice | number-masked }}đ</div>
                            <div>{{ maxPrice | number-masked }}đ</div>
                        </div>
                        <div class="filter-price-area">
                            <b-form-input v-model="firstPrice" type="range" min="0" max="5000000" step="100000"></b-form-input>
                            <b-form-input v-model="secondPrice" type="range" min="0" max="5000000" step="100000"></b-form-input>
                        </div>
                        <b-form-checkbox v-model="filterIsSale" class="black small">Đang giảm giá</b-form-checkbox>
                    </div>
                    <div>
                        <div class="font-weight-bold">Theo tiêu chuẩn sao</div>
                        <b-form-group>
                            <b-form-checkbox-group v-model="filterStars" stacked>
                                <b-form-checkbox v-for="star in starHotel" :key="star" :value="star">
                                    <i v-for="(s, index) in star" class="fas fa-star yellow" :key="index"></i>
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </div>
                    <div>
                        <div class="font-weight-bold">Dịch vụ miễn phí</div>
                        <b-form-group>
                            <b-form-checkbox-group v-model="filterFreeServices" stacked>
                                <b-form-checkbox
                                    v-for="freeService in freeServiceHotel"
                                    :key="freeService.code"
                                    :value="freeService.code"
                                >
                                    {{ freeService.name }}
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </div>
                    <div>
                        <div class="font-weight-bold">Các tiện ích</div>
                        <b-form-group>
                            <b-form-checkbox-group v-model="filerServices" stacked>
                                <b-form-checkbox v-for="service in serviceHotel" :key="service.code" :value="service.code">
                                    {{ service.name }}
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </div>
                </div>
            </b-sidebar>
            <div class="col-12 col-lg-9 text-left">
                <div class="d-flex justify-content-start p-3">
                    <div v-b-toggle.search-menu-sidebar class="d-lg-none m-0 mr-3 btn py-0"><i class="fas fa-bars"></i></div>
                    <div class="font-weight-bold text-nowrap">Sắp xếp theo</div>
                    <div class="mx-2 mx-md-5 pointer text-nowrap" @click="onClickSortStar">
                        Tiêu chuẩn sao
                        <i :class="['fas', sortStarIcon]"></i>
                    </div>
                    <div class="pointer text-nowrap" @click="onClickSortPrice">
                        Giá phòng
                        <i :class="['fas', sortPriceIcon]"></i>
                    </div>
                    <div class="ml-auto font-weight-bold text-nowrap d-none d-sm-block">
                        {{ hotelsFiltered.length }} khách sạn phù hợp
                    </div>
                </div>
                <div class="my-3 pr-md-5 pr-xl-0">
                    <b-row v-for="(hotel, index) in hotelsFiltered" :key="hotel.name" class="p-3">
                        <div class="col-md-5 col-lg-5 col-xl-4 d-none d-md-block">
                            <b-img :src="hotel.srcImg" fluid :alt="'Card Image ' + index"></b-img>
                        </div>
                        <div class="col-8 col-md-5 col-lg-5 col-xl-5 d-flex flex-column">
                            <div class="title">Khách sạn {{ hotel.name }}</div>
                            <div class="yellow"><i v-for="(star, indexStar) in hotel.star" class="fas fa-star" :key="indexStar"></i></div>
                            <div><span class="black">{{ hotel.address }}</span> <b-button variant="link" @click="onClickMap"><i class="fas fa-map-marker-alt"></i> Bản đồ</b-button></div>
                            <div class="font-weight-bold">Dịch vụ và tiện ích</div>
                            <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                            <div v-for="(service, indexService) in [...hotel.freeServices, ...hotel.services]" :key="indexService" v-if="indexService<=4 || hotel.isShowAll" class="black">
                                - {{ service.name }}
                            </div>
                            <div v-if="!hotel.isShowAll && hotel.totalServises>5" class="pointer" @click="hotel.isShowAll=true">...hiện thêm >></div>
                            <!-- eslint-disable-next-line vue/no-parsing-error -->
                            <div v-if="hotel.isShowAll && hotel.totalServises>5" class="pointer" @click="hotel.isShowAll=false"><< thu gọn</div>
                        </div>
                        <div class="col-4 col-md-2 col-lg-2 col-xl-3 d-flex flex-column">
                            <div class="yellow font-weight-bold">{{ hotel.price | number-masked }}đ</div>
                            <div>/ đêm</div>
                            <div class="mt-auto"><b-button class="text-nowrap" variant="primary" @click="onClickBookHotel(hotel.id)">Đặt khách sạn</b-button></div>
                        </div>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'nuxt-property-decorator';
import HotelService from '@/services/hotelService';
import Hotel, { FreeService, ServiceHotel, StarHotel, FilterCriteria } from '@/models/Hotel';
import SearchComponent from '@/components/Search.vue';
import moment from 'moment';

@Component({
    components: { SearchComponent }
})
export default class FindHotelComponent extends Vue {
    // ------------ Service -------------//
    hotelService: HotelService = new HotelService();

    hotelsOrigin: Array<Hotel> = [];
    hotelsFiltered: Array<Hotel> = [];

    filterCriteria: FilterCriteria = new FilterCriteria();
    firstPrice: number = 0;
    secondPrice: number = 5000000;
    filterIsSale: boolean = false;
    filterStars: Array<any> = [];
    starHotel: Array<number> = StarHotel;
    filterFreeServices: Array<any> = [];
    freeServiceHotel = FreeService;
    filerServices: Array<any> = [];
    serviceHotel = ServiceHotel;
    isSortStarAsc: boolean | null = null;
    sortStarIcon: string = '';
    isSortPriceAsc: boolean | null = null;
    sortPriceIcon: string = '';

    // -----Method-----//
    async mounted() {
        const searchString = this.$route.query.searchString as string;
        let resAllHotels: any[] = [];
        if (searchString) {
            resAllHotels = await this.hotelService.getHotelsByName(searchString);
        } else resAllHotels = await this.hotelService.getAllHotels();
        this.hotelsOrigin = this.mapDataFromAPI(resAllHotels);
        this.hotelsFiltered = this.hotelsOrigin.splice(0, this.hotelsOrigin.length, ...this.hotelsOrigin);
    }

    mapDataFromAPI(data: Array<any>): Hotel[] {
        return data.map((h) => {
            const freeServices = h.freeServices.split(',').map((s: string) => FreeService[s]);
            const services = h.services.split(',').map((s: string) => ServiceHotel[s]);
            return new Hotel(h.id, h.name, h.srcImg, Number(h.price), h.star, h.address, freeServices, services, h.isSale);
        });
    }

    onClickSortStar() {
        switch (this.isSortStarAsc) {
        case true:
            this.isSortStarAsc = false;
            this.hotelsFiltered = this.hotelsFiltered.sort((a, b) => b.star - a.star);
            this.sortStarIcon = 'fa-caret-down'
            break;
        case false:
            this.isSortStarAsc = null;
            this.hotelsFiltered = this.hotelsOrigin;
            this.sortStarIcon = '';
            break;
        default:
            this.isSortStarAsc = true;
            this.hotelsFiltered = this.hotelsFiltered.sort((a, b) => a.star - b.star);
            this.sortStarIcon = 'fa-caret-up';
        }
        this.isSortPriceAsc = null;
        this.sortPriceIcon = '';
    }

    onClickSortPrice() {
        switch (this.isSortPriceAsc) {
        case true:
            this.isSortPriceAsc = false;
            this.hotelsFiltered = this.hotelsFiltered.sort((a, b) => b.star - a.star);
            this.sortPriceIcon = 'fa-caret-down'
            break;
        case false:
            this.isSortPriceAsc = null;
            this.hotelsFiltered = this.hotelsOrigin;
            this.sortPriceIcon = '';
            break;
        default:
            this.isSortPriceAsc = true;
            this.hotelsFiltered = this.hotelsFiltered.sort((a, b) => a.star - b.star);
            this.sortPriceIcon = 'fa-caret-up';
        }
        this.isSortStarAsc = null;
        this.sortStarIcon = '';
    }

    @Watch('filterStars')
    onFilterByStar(val: Array<number>) {
        if (val && val.length > 0) {
            this.filterCriteria.star = val;
        } else {
            this.filterCriteria.star = [];
        }
        this.onFilterHotels();
    }

    @Watch('filterFreeServices')
    onFilterByFreeService(val: Array<string>) {
        if (val && val.length > 0) {
            this.filterCriteria.freeService = val;
        } else {
            this.filterCriteria.freeService = val;
        }
        this.onFilterHotels();
    }

    @Watch('filerServices')
    onFilterByService(val: Array<string>) {
        if (val && val.length > 0) {
            this.filterCriteria.service = val;
        } else {
            this.filterCriteria.service = [];
        }
        this.onFilterHotels();
    }

    @Watch('filterIsSale')
    onFilterByIsSale(val: boolean) {
        this.filterCriteria.onlyIsSale = val;
        this.onFilterHotels();
    }

    get rangeFilterPrice(): number[] {
        return [Math.min(this.firstPrice, this.secondPrice), Math.max(this.firstPrice, this.secondPrice)];
    }

    get minPrice(): number {
        return Math.min(this.firstPrice, this.secondPrice);
    }

    get maxPrice(): number {
        return Math.max(this.firstPrice, this.secondPrice);
    }

    @Watch('rangeFilterPrice')
    onFilterByPrice(val: number[]) {
        this.filterCriteria.price = val;
        this.onFilterHotels();
    }

    onFilterHotels() {
        let result = this.hotelsOrigin;
        if (this.filterCriteria.price.some(n => n !== 0 && n !== 5000000)) {
            result = result.filter(h => h.price >= this.filterCriteria.price[0] && h.price <= this.filterCriteria.price[1]);
        }
        if (this.filterCriteria.onlyIsSale) {
            result = result.filter(h => h.isSale);
        }
        if (this.filterCriteria.star.length > 0) {
            result = result.filter(h => this.filterCriteria.star.includes(h.star));
        }
        if (this.filterCriteria.freeService.length > 0) {
            result = result.filter(h => h.freeServices.some(s => this.filterCriteria.freeService.includes(s.code)));
        }
        if (this.filterCriteria.service.length > 0) {
            result = result.filter(h => h.services.some(s => this.filterCriteria.service.includes(s.code)));
        }
        this.hotelsFiltered = result;
        this.resetSort();
    }

    resetSort() {
        this.isSortStarAsc = this.isSortPriceAsc = null;
        this.sortStarIcon = this.sortPriceIcon = '';
    }

    onClickBookHotel(hotelId: number) {
        this.$router.push({ name: 'hotel-id', params: { id: hotelId.toString() } });
    }

    async onAfterSearchHotel(searchString) {
        let resAllHotels: any[] = [];
        if (searchString) {
            resAllHotels = await this.hotelService.getHotelsByName(searchString);
        } else {
            resAllHotels = await this.hotelService.getAllHotels();
        }
        this.hotelsOrigin = this.mapDataFromAPI(resAllHotels);
        this.hotelsFiltered = this.hotelsOrigin.splice(0, this.hotelsOrigin.length, ...this.hotelsOrigin);
    }

    onClickMap() {
        window.open('https://goo.gl/maps/6r9oNba2E3VoMJ9P9', '_blank');
    }
}
</script>

<style scoped lang="scss">
.hotel ::v-deep {
    color: $color-blue;
    font-size: 16px;
    .title {
        font-weight: bolder;
        font-size: 18px;
    }
    .panel-filter {
        border: 1px solid $color-grey;
        box-shadow: 1px 1px 1px 1px #d9d9d9;
    }
    .filter-price-area {
        position: relative;
        height: 50px;
        input {
            pointer-events: none;
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 15px;
            outline: none;
            height: 18px;
            margin: 0;
            padding: 0;
            &::-webkit-slider-thumb {
                pointer-events: all;
                position: relative;
                z-index: 1;
                outline: 0;
            }
            &::-moz-range-thumb {
                pointer-events: all;
                position: relative;
                z-index: 10;
                -moz-appearance: none;
                width: 9px;
            }
            &::-moz-range-track {
                position: relative;
                z-index: -1;
                background-color: rgba(0, 0, 0, 1);
                border: 0;
            }
            &:last-of-type::-moz-range-track {
                -moz-appearance: none;
                background: none transparent;
                border: 0;
            }
            &[type=range]::-moz-focus-outer {
                border: 0;
            }
        }
    }
    .search-area {
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
            top: 37.5px;
        }
        label.text-wrap {
            white-space: nowrap !important;
            overflow: hidden !important;
        }
    }
}
</style>
