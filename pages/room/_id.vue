<template>
    <div class="booking">
        <div class="mb-5">
            <SearchComponent />
        </div>
        <form id="form-booking" class="needs-validation" novalidate>
            <div class="text-left p-3">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="title">Thông tin đặt phòng</div>
                        <div class="px-3">
                            <div class="row my-3 form-row">
                                <div class="col-6">
                                    <div class="mb-2">Ngày nhận phòng <span class="required">*</span></div>
                                    <div>
                                        <b-form-datepicker
                                            placeholder="Ngày nhận phòng"
                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                            locale="vi"
                                            :value-as-date="true"
                                            @input="onInputCheckInDate"
                                            :state="validateCheckInDate"
                                        ></b-form-datepicker>
                                    </div>
                                    <div v-show="hasValidate && !validateCheckInDate" class="required font-italic">
                                        {{ wrongCheckInDateInfo }}
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-2">Ngày trả phòng <span class="required">*</span></div>
                                    <div>
                                        <b-form-datepicker
                                            placeholder="Ngày trả phòng"
                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                            locale="vi"
                                            :value-as-date="true"
                                            @input="onInputCheckoutDate"
                                            :state="validateCheckOutDate"
                                        ></b-form-datepicker>
                                    </div>
                                    <div v-show="hasValidate && !validateCheckOutDate" class="required font-italic">
                                        {{ wrongCheckOutDateInfo }}
                                    </div>
                                </div>
                            </div>
                            <div class="my-3">
                                <div class="mb-2">Số lượng người lớn <span class="required">*</span></div>
                                <div><b-form-input v-model="numberAdult" type="number" required></b-form-input></div>
                                <div class="invalid-feedback">
                                    Thông tin bắt buộc
                                </div>
                            </div>
                            <div class="my-3">
                                <div class="mb-2">Số lượng trẻ em</div>
                                <div><b-form-input v-model="numberChildren" type="number"></b-form-input></div>
                            </div>
                            <div class="my-3">
                                <div class="mb-2">Số lượng em bé</div>
                                <div><b-form-input v-model="numberBaby" type="number"></b-form-input></div>
                            </div>
                            <div class="my-3">
                                <div class="mb-2">Họ tên <span class="required">*</span></div>
                                <div><b-form-input v-model="fullName" type="text" required></b-form-input></div>
                                <div class="invalid-feedback">
                                    Thông tin bắt buộc
                                </div>
                            </div>
                            <div class="row my-3 form-row">
                                <div class="col-6">
                                    <div class="mb-2">Điện thoại <span class="required">*</span></div>
                                    <div><b-form-input v-model="phoneNumber" type="tel" required></b-form-input></div>
                                    <div class="invalid-feedback">
                                        Thông tin bắt buộc
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="mb-2">Email <span class="required">*</span></div>
                                    <div><b-form-input v-model="email" type="email" required></b-form-input></div>
                                    <div class="invalid-feedback">
                                        Thông tin bắt buộc
                                    </div>
                                </div>
                            </div>
                            <div class="my-3">
                                <div class="mb-2">Ghi chú</div>
                                <div>
                                    <b-form-textarea v-model="note"></b-form-textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="title mb-3">Tóm tắt thông tin</div>
                        <div class="row px-3 px-lg-0">
                            <div class="py-1 col-10 col-sm-5 col-lg-10 col-xl-5"><img :src="bookingHotel.srcImg" class="img-fluid w-100 rounded" /></div>
                            <div class="col-12 col-sm-7 col-lg-12 col-xl-7">
                                <div class="font-weight-bold">{{ bookingHotel.name }}</div>
                                <div><i class="fas fa-star yellow" v-for="(s, index) in bookingHotel.star" :key="index"></i></div>
                                <div>{{ bookingHotel.address }}</div>
                                <div>
                                    <div class="font-weight-bold">Miễn phí</div>
                                    <div>
                                        <div v-for="(service, indexService) in bookingHotel.allServices" :key="indexService">- {{ service.name }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex my-3 justify-content-center justify-content-lg-start">
                            <div class="text-right ml-3">
                                <div class="font-weight-bold">Ngày nhận phòng</div>
                                <div>{{ checkInDate }}</div>
                            </div>
                            <div class="text-center mx-3">
                                <div><i class="far fa-clock font-weight-bold"></i></div>
                                <div>{{ totalDaysRent }} đêm</div>
                            </div>
                            <div class="text-left">
                                <div class="font-weight-bold">Ngày trả phòng</div>
                                <div>{{ checkOutDate }}</div>
                            </div>
                        </div>
                        <div class="px-3 px-lg-0">
                            <div class="d-flex">
                                <div class="flex-grow-1 pl-xl-3" v-html="billAdult.text"></div>
                                <div v-if="!!billAdult.price">{{ billAdult.price | number-masked }}đ</div>
                            </div>
                            <div class="d-flex">
                                <div class="flex-grow-1 pl-xl-3" v-html="billChildren.text"></div>
                                <div v-html="billChildren.price"></div>
                            </div>
                            <div class="d-flex">
                                <div class="flex-grow-1 pl-xl-3" v-html="billBaby.text"></div>
                                <div v-html="billBaby.price"></div>
                            </div>
                        </div>
                        <div class="row font-weight-bold text-right my-3 px-3 px-lg-0">
                            <div class="col-8">Giá tạm tính</div>
                            <div v-if="!!billAdult.price" class="col-4 orange">{{ billAdult.price | number-masked }}đ</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-5">
                <b-button variant="primary" @click="onConfirmBook">Đặt phòng</b-button>
            </div>
        </form>
        <b-modal v-model="isShowConfirmPopup" scrollable hide-footer hide-header>
            <div>
                <div class="mb-3 font-weight-bold large orange text-center header-pannel">
                    Xác nhận thông tin đặt phòng
                    <div class="close-icon" @click="isShowConfirmPopup = false"><i class="fas fa-times"></i></div>
                </div>
                <div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Họ và tên khách hàng:</div>
                        <div>{{ fullName }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Điện thoại:</div>
                        <div>{{ phoneNumber }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Email:</div>
                        <div>{{ email }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Ngày nhận phòng:</div>
                        <div>{{ checkInDate }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Ngày trả phòng:</div>
                        <div>{{ checkOutDate }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Số lượng người lớn:</div>
                        <div>{{ numberAdult }}</div>
                    </div>
                    <div v-if="!!numberChildren" class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Số lượng trẻ em:</div>
                        <div>{{ numberChildren }}</div>
                    </div>
                    <div v-if="!!numberBaby" class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Số lượng em bé:</div>
                        <div>{{ numberBaby }}</div>
                    </div>
                    <div v-if="!!note" class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Note:</div>
                        <div>{{ note }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Tên khách sạn:</div>
                        <div>{{ bookingHotel.name }}</div>
                    </div>
                    <div class="d-flex">
                        <div class="font-weight-bold flex-grow-1">Giá tạm tính:</div>
                        <div class="font-italic font-weight-bold">{{ billAdult.price | number-masked }}đ</div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <div class="mx-1">
                        <b-button variant="primary" @click="onBookRoom">
                            Đặt phòng
                        </b-button>
                    </div>
                    <div class="mx-1">
                        <b-button variant="danger" @click="isShowConfirmPopup = false">
                            Hủy
                        </b-button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'nuxt-property-decorator';
import SearchComponent from '@/components/Search.vue';
import Hotel, { FreeService, ServiceHotel } from '@/models/Hotel';
import moment from 'moment';
import HotelService from '@/services/hotelService';

@Component({
    components: { SearchComponent }
})
export default class RoomComponent extends Vue {
    // ------------ Service -------------//
    hotelService: HotelService = new HotelService();

    bookingHotel: Hotel = new Hotel();
    checkInDate: string = '';
    checkInValue: Date | null = null;
    checkOutDate: string = '';
    checkOutValue: Date | null = null;
    numberAdult: number | null = null;
    numberChildren: number | null = null;
    numberBaby: number | null = null;
    fullName: string = '';
    phoneNumber: string = '';
    email: string = '';
    note: string = '';

    hasValidate: boolean = false;
    isShowConfirmPopup: boolean = false;

    async mounted() {
        const roomId = this.$route.params.id;
        if (roomId) {
            const resRoomInfo = await this.hotelService.getRoomById(roomId);
            if (resRoomInfo) this.mapDataFromAPI(resRoomInfo);
            else this.$router.push({ name: 'Home' });
        }
    }

    mapDataFromAPI(res: any) {
        const hotelInfo = res.hotel;
        const freeHotelServices = (hotelInfo.freeServices as string).split(',').map(s => FreeService[s]);
        const hotelServices = (hotelInfo.services as string).split(',').map(s => ServiceHotel[s]);
        this.bookingHotel = new Hotel(hotelInfo.id, hotelInfo.name, hotelInfo.srcImg, Number(hotelInfo.price), hotelInfo.star, hotelInfo.address, freeHotelServices, hotelServices, hotelInfo.isSale);
    }

    onInputCheckInDate(date: Date) {
        this.checkInDate = moment(date).format('D/M/YYYY');
        this.checkInValue = date;
    }

    onInputCheckoutDate(date: Date) {
        this.checkOutDate = moment(date).format('D/M/YYYY');
        this.checkOutValue = date;
    }

    get totalDaysRent() {
        if (this.checkInDate && this.checkOutDate) {
            return moment(this.checkOutDate, 'D-M-YYYY').diff(moment(this.checkInDate, 'D-M-YYYY'), 'days');
        } else return '';
    }

    get billAdult() {
        if (this.numberAdult && this.bookingHotel.price && this.totalDaysRent) {
            return {
                text: `<span class="font-weight-bold">${this.numberAdult} người lớn</span> (>= 12 tuổi) 
                    <span class="font-weight-bold">x ${this.bookingHotel.price} x ${this.totalDaysRent} đêm</span>`,
                price: Number(this.numberAdult) * this.bookingHotel.price * Number(this.totalDaysRent)
            }
        } else return {
            text: '',
            price: ''
        }
    }

    get billChildren() {
        if (this.numberChildren && this.totalDaysRent) {
            return {
                text: `<span class="font-weight-bold">${this.numberChildren} trẻ em</span> (2-11 tuổi)`,
                price: `Báo giá sau`
            }
        } else {
            return {
                text: '',
                price: ''
            }
        }
    }

    get billBaby() {
        if (this.numberBaby && this.totalDaysRent) {
            return {
                text: `<span class="font-weight-bold">${this.numberBaby} em bé</span> (<2 tuổi)`,
                price: `Báo giá sau`
            }
        } else {
            return {
                text: '',
                price: ''
            }
        }
    }

    get validateCheckInDate(): boolean | null {
        if (!this.hasValidate) return null;
        return !!this.checkInDate && moment(this.checkInValue).isSameOrAfter(moment()) && moment(this.checkInValue).isBefore(this.checkOutValue);
    }

    get validateCheckOutDate(): boolean | null {
        if (!this.hasValidate) return null;
        return !!this.checkOutDate && moment(this.checkInValue).isSameOrAfter(moment()) && moment(this.checkInValue).isBefore(this.checkOutValue);
    }

    get wrongCheckInDateInfo(): string {
        if (!this.checkInDate) return 'Bạn chưa nhập ngày nhận phòng';
        if (moment(this.checkInValue).isBefore(moment())) return 'Ngày nhận phòng phải bằng hoặc sau ngày hôm nay';
        if (moment(this.checkInValue).isSameOrAfter(this.checkOutValue)) return 'Ngày nhận phòng phải trước ngày trả phòng';
        return '';
    }

    get wrongCheckOutDateInfo(): string {
        if (!this.checkOutDate) return 'Bạn chưa nhập ngày trả phòng';
        if (moment(this.checkOutValue).isSameOrBefore(moment())) return 'Ngày trả phòng phải sau ngày hôm nay';
        if (moment(this.checkOutValue).isSameOrBefore(this.checkInValue)) return 'Ngày trả phòng phải sau ngày nhận phòng';
        return '';
    }

    onConfirmBook(event: Event) {
        this.hasValidate = true;
        const form = document.getElementById('form-booking') as any;
        if (form.checkValidity() === false || this.validateCheckInDate === false || this.validateCheckOutDate === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            this.isShowConfirmPopup = true;
        }
    }

    onBookRoom() {
        this.isShowConfirmPopup = false;
        this.$toast.success('Hoàn tất!!! Cảm ơn bạn đã chọn công ty chúng tôi.', { duration: 3000 });
    }
}
</script>

<style scoped lang="scss">
.booking ::v-deep {
    color: $color-blue;
    .title {
        font-weight: bolder;
        font-size: 20px;
    }
}

.header-pannel {
    position: relative;
    .close-icon {
        position: absolute;
        right: 0;
        top: -10px;
        color: $color-black;
        cursor: pointer;
    }
}

</style>
