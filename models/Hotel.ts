import Option from './Option';
import Room from './Room';

export default class Hotel {
    id: number = 0;
    name: string = '';
    srcImg: string = '';
    price: number = 0;
    star: number = 0;
    address: string = '';
    freeServices: Array<Option> = [];
    services: Array<Option> = [];
    isSale: boolean = false;
    isShowAll: boolean = false;
    rooms: Array<Room> = [];

    constructor(id: number = 0, name: string = '', scrImg: string = '', price: number = 0, star: number = 0,
        address: string = '', freeServices: Array<{ code: string; name: string }> = [],
        services: Array<{ code: string; name: string }> = [], isSale = false) {
        this.id = id;
        this.name = name;
        this.srcImg = scrImg;
        this.price = price;
        this.star = star;
        this.address = address;
        this.freeServices = freeServices;
        this.services = services;
        this.isSale = isSale;
    }

    get totalServises(): number {
        return this.freeServices.length + this.services.length;
    }

    get allServices(): Array<Option> {
        return [...this.freeServices, ...this.services];
    }
}

export const StarHotel = [1, 2, 3, 4, 5]

export const FreeService: any = {
    FreeAnSang: { code: 'FreeAnSang', name: 'Bữa sáng miễn phí' },
    Free3Bua: { code: 'Free3Bua', name: '3 bữa ăn miễn phí' },
    ThemGiuongPhu: { code: 'ThemGiuongPhu', name: 'Thêm giường phụ' }
}

export const ServiceHotel: any = {
    HoBoi: { code: 'HoBoi', name: 'Hồ bơi' },
    Massage: { code: 'Massage', name: 'Massage/Spa' },
    Wifi: { code: 'Wifi', name: 'Wifi miễn phí' },
    BaiDoXe: { code: 'BaiDoXe', name: 'Bãi đỗ xe' },
    ThueXeMay: { code: 'ThueXeMay', name: 'Cho thuê xe máy' },
    DuaDonSanBay: { code: 'DuaDonSanBay', name: 'Đưa đón sân bay' },
    PhongGym: { code: 'PhongGym', name: 'Phòng Gym' },
    DoAnTaiPhong: { code: 'DoAnTaiPhong', name: 'Phục vụ đồ ăn tại phòng' },
    NhaHang: { code: 'NhaHang', name: 'Nhà hàng' },
    GiatLa: { code: 'GiatLa', name: 'Giặt là' },
    ChapNhanThuCung: { code: 'ChapNhanThuCung', name: 'Chấp nhận thú cưng' },
    HoTroDatTour: { code: 'HoTroDatTour', name: 'Hỗ trợ đặt tour' },
    LeTan24: { code: 'LeTan24', name: 'Lê tân 24/24' },
    ThangMay: { code: 'ThangMay', name: 'Thang máy' },
    MayATM: { code: 'MayATM', name: 'Máy ATM trong khách sạn' }
}

export const HotelMockData = [
    new Hotel(1, 'Novotel Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 1300000, 1,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.FreeAnSang],
        [ServiceHotel.BaiDoXe, ServiceHotel.ChapNhanThuCung, ServiceHotel.DoAnTaiPhong, ServiceHotel.HoBoi, ServiceHotel.MayATM],
        true
    ),
    new Hotel(2, 'Central Luxury Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 1700000, 1,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.Free3Bua],
        [ServiceHotel.BaiDoXe, ServiceHotel.ChapNhanThuCung, ServiceHotel.DoAnTaiPhong, ServiceHotel.HoBoi, ServiceHotel.MayATM]
    ),
    new Hotel(3, 'StarCity Hạ Long Bay', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 2300000, 2,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.ThemGiuongPhu],
        [ServiceHotel.BaiDoXe, ServiceHotel.ChapNhanThuCung, ServiceHotel.DoAnTaiPhong, ServiceHotel.HoBoi, ServiceHotel.MayATM]
    ),
    new Hotel(4, 'Sài Gòn Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 2500000, 2,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.Free3Bua, FreeService.FreeAnSang],
        [ServiceHotel.HoBoi, ServiceHotel.Massage, ServiceHotel.ThangMay, ServiceHotel.PhongGym, ServiceHotel.GiatLa],
        true
    ),
    new Hotel(5, 'Grand Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 3100000, 3,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.ThemGiuongPhu, FreeService.FreeAnSang],
        [ServiceHotel.Wifi, ServiceHotel.ThueXeMay, ServiceHotel.LeTan24, ServiceHotel.ChapNhanThuCung, ServiceHotel.MayATM]),
    new Hotel(6, 'Paradise Suites Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 3800000, 3,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.Free3Bua],
        [ServiceHotel.NhaHang, ServiceHotel.DuaDonSanBay, ServiceHotel.BaiDoXe, ServiceHotel.HoTroDatTour, ServiceHotel.DoAnTaiPhong]
    ),
    new Hotel(7, 'Mường Thanh Luxury Quảng Ninh', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 4200000, 4,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.FreeAnSang],
        [ServiceHotel.PhongGym, ServiceHotel.ChapNhanThuCung, ServiceHotel.LeTan24, ServiceHotel.BaiDoXe, ServiceHotel.ThangMay]
    ),
    new Hotel(8, 'Royal Lotus Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 4500000, 4,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.ThemGiuongPhu],
        [ServiceHotel.ChapNhanThuCung, ServiceHotel.ThueXeMay, ServiceHotel.GiatLa, ServiceHotel.HoBoi, ServiceHotel.Massage],
        true
    ),
    new Hotel(9, 'FiveStar Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 4900000, 5,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.Free3Bua],
        [ServiceHotel.BaiDoXe, ServiceHotel.ThueXeMay, ServiceHotel.HoTroDatTour, ServiceHotel.LeTan24, ServiceHotel.DuaDonSanBay]
    ),
    new Hotel(10, 'Royal Hạ Long', 'https://q-cf.bstatic.com/images/hotel/max1280x900/688/68867405.jpg', 5000000, 5,
        '160 Đường Hạ Long, Bãi Cháy, Hạ Long',
        [FreeService.FreeAnSang],
        [ServiceHotel.DuaDonSanBay, ServiceHotel.HoTroDatTour, ServiceHotel.DoAnTaiPhong, ServiceHotel.HoBoi, ServiceHotel.MayATM]
    )

]

export class FilterCriteria {
    price: Array<number> = [];
    onlyIsSale: boolean = false;
    star: Array<number> = [];
    freeService: Array<string> = [];
    service: Array<string> = [];
}
