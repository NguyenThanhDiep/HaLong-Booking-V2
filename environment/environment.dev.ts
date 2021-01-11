export const environment = {
    ApiHotel: {
        BaseUrl: "http://localhost:57223/",
        BaseUrlSuffix: "",

        GetAllHotels: "hotels/",
        GetHotelsByName: "hotels/?searchString={searchString}",
        GetHotelById: "hotels/{hotelId}/",
        GetRoomById: "rooms/{roomId}/"
    }
}
