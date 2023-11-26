import axios from "axios"
import { Place, PlaceAPI } from "../interfaces/Place"

export class Search {
  constructor(public historial: string[] = []) {}


    async City  ( place: string): Promise<Place[]> {

      const URL = 'https://nominatim.openstreetmap.org'


      try {
        const instance = axios.create({
          baseURL: URL,
          timeout: 5000,
          params: {
            city: place,
            limit: 5,
            format: 'json'
          }
        })

        const response = await instance.get('/search')

        return response.data.map((place: PlaceAPI) => ({
          id: place.place_id,
          name: place.display_name,
          lat: place.lat,
          lng: place.lon
        }))

      } catch (error) {
        console.log(error)
        return []
      }

  }

}
