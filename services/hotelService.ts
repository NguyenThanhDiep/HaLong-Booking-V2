import environment from '@/environment/environment.dev';
import HttpService from './httpService';

export default class HotelService {
    httpService: HttpService = new HttpService(environment.ApiHotel.BaseUrl);

    public async getAllHotels() {
        return await this.httpService.get<Array<any>>(environment.ApiHotel.GetAllHotels);
    }

    public async getHotelsByName(searchString: string) {
        return await this.httpService.get<Array<any>>(environment.ApiHotel.GetHotelsByName.replace('{searchString}', searchString));
    }

    public async getHotelById(hotelId: string) {
        return await this.httpService.get<any>(environment.ApiHotel.GetHotelById.replace('{hotelId}', hotelId));
    }

    public async getRoomById(roomId: string) {
        return await this.httpService.get<any>(environment.ApiHotel.GetRoomById.replace('{roomId}', roomId));
    }
}
