<template>
    <div class="room">
        <div>
            <SearchComponent />
        </div>
        <div class="py-5 pl-3 pr-2 pl-xl-5 pr-xl-4">
            <div class="d-flex flex-row">
                <div class="large font-weight-bold mr-3">Khách sạn {{ hotel.name }}</div>
                <div><i class="fas fa-star yellow" v-for="(s, index) in hotel.star" :key="index"></i></div>
            </div>
            <div class="my-3 row">
                <div class="col-7 container-fluid p-1">
                    <img :src="imgSelected" class="img-fluid w-100 h-100 rounded" id="mainImg">
                </div>
                <div class="col-5 d-flex flex-row flex-wrap">
                    <div v-for="(img, index) in allImg" class="text-center w-50 p-1" :key="index">
                        <img
                            :src="img"
                            :class="['rounded h-100 w-100 pointer option-img', index === indexActiveImg ? 'active-img': '']"
                            @click="onClickImg(img, index)"
                        >
                    </div>
                </div>
            </div>
            <div>
                <div class="row mb-5 text-left" v-for="(room, index) in hotel.rooms" :key="index">
                    <div class="col-9 col-md-9 d-flex flex-grow-0 flex-md-grow-1 flex-column">
                        <div class="font-weight-bold mb-2 text-nowrap">
                            {{ room.name }}
                        </div>
                        <div class="row">
                            <div class="col-6 col-lg-4">
                                <b-img :src="room.srcImg" fluid :alt="'Room Image ' + index"></b-img>
                            </div>
                            <div class="col-6 col-lg-8 row w-100">
                                <div class="col-12 col-lg-6 pl-lg-5">
                                    <div class="font-weight-bold text-nowrap">Miễn phí</div>
                                    <div v-for="(freeService, indexService) in room.freeServices" class="black small text-nowrap" :key="indexService">
                                        - {{ freeService }}
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div class="font-weight-bold text-nowrap">Sức chứa</div>
                                    <div v-for="(capInfo, indexCapInfo) in room.capacity" class="black small text-nowrap" :key="indexCapInfo">
                                        - {{ capInfo }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 col-md-3 text-right d-flex flex-column align-items-end pr-4">
                        <div class="yellow font-weight-bold large">{{ room.price | number-masked }}đ</div>
                        <div>/đêm</div>
                        <div class="mt-auto text-nowrap">
                            <b-button variant="primary" @click="onClickBookRoom(room.id)">Đặt phòng</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'nuxt-property-decorator';
import SearchComponent from '@/components/Search.vue';
import HotelService from '@/services/hotelService';
import Hotel from '@/models/Hotel';
import Room from '@/models/Room';

@Component({
    components: { SearchComponent }
})
export default class HotelComponent extends Vue {
    // ------------ Service -------------//
    hotelService: HotelService = new HotelService();

    hotel: Hotel = new Hotel();
    imgSelected: string = '';
    allImg: Array<string> = [];
    mainPropsImg: object = {};
    indexActiveImg: number = 0;

    async mounted() {
        const hotelId = this.$route.params.id;
        if (hotelId) {
            const resHotel = await this.hotelService.getHotelById(hotelId);
            if (resHotel) this.mapDataFromAPI(resHotel);
            else this.$router.push({ name: 'Home' });
        }

        // this.allImg = [
        //     "https://r-cf.bstatic.com/images/hotel/max1024x768/195/195444614.jpg",
        //     "https://r-cf.bstatic.com/images/hotel/max1024x768/192/192958857.jpg",
        //     "https://ihg.scene7.com/is/image/ihg/even-hotels-eugene-5405616297-4x3",
        //     "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
        //     "https://www.welcome-hotels.com/site/assets/files/35059/welcome_hotel_marburg_lobby_2k.2560x1600.jpg",
        //     "https://pix10.agoda.net/hotelImages/209/2092140/2092140_17031512040051555216.jpg?s=1024x768"
        // ];
        this.imgSelected = this.allImg[0];
        this.mainPropsImg = {
            center: true,
            fluidGrow: true,
            blank: true,
            blankColor: '#bbb',
            width: 100,
            height: 50,
            class: 'm-1 mx-5'
        }
    }

    mapDataFromAPI(res: any) {
        this.hotel.id = res.id;
        this.hotel.name = res.name;
        this.hotel.srcImg = res.srcImg;
        this.hotel.price = Number(res.price);
        this.hotel.star = res.star;
        this.hotel.address = res.address;
        this.hotel.isSale = res.isSale;
        this.allImg = res.srcDetailImgs.split(",");
        (res.rooms as Array<any>).forEach((r) => {
            const room = new Room();
            room.id = r.id;
            room.name = r.name;
            room.srcImg = r.srcImg;
            room.price = Number(r.price);
            room.freeServices = (r.freeServices as string).split(',');
            room.capacity = (r.capacity as string).split(',');
            this.hotel.rooms.push(room);
        })
    }

    onClickImg(img: string, index: number) {
        this.imgSelected = img;
        this.indexActiveImg = index;
    }

    @Watch('imgSelected')
    onImgSelectedChange() {
        const mainImg = document.getElementById('mainImg');
        mainImg?.classList.add('main-img');
        setTimeout(() => {
            mainImg?.classList.remove('main-img');
        }, 2000);
    }

    onClickBookRoom(roomId: number) {
        this.$router.push({ name: 'room-id', params: { id: roomId.toString() } });
    }
}
</script>

<style scoped lang="scss">
.room {
    color: $color-blue;
    img {
        width: 300px;
        height: 200px;
    }

    @keyframes zoominoutsinglefeatured {
        0% {
            transform: scale(0,0);
        }
        100% {
            transform: scale(1,1);
        }
    }

    .main-img {
        animation: zoominoutsinglefeatured 2s;
    }

    .option-img {
        opacity: 0.5;
        &:hover {
            opacity: 1;
        }
    }

    .active-img {
        border: 3px solid $color-blue;
        opacity: 1;
    }
}
</style>
