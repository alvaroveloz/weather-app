import axios from "axios"
import 'dotenv/config'
import fs from 'fs'

import { Place, PlaceAPI } from "../interfaces/Place"
import { Weather } from "../interfaces"

export class Search {
  constructor(public historial: string[] = [], public dbPath: string = './src/db/database.json') {
    this.readDB()
  }

  get historialCapitalized() {
    return this.historial.map((place) => {
      let words = place.split(' ')
      words = words.map(word => word[0].toUpperCase() + word.substring(1))
      return words.join(' ')
    })
  }

  get paramsNominatim() {
    return {
      format: 'json',
      limit: 5
  }
}

  get paramsMapbox() {
    return {
      appid: process.env.OPENWEATHER_API_KEY,
      units: 'metric',
      limit: 5,
      language: 'es'
    }
  }

    async City  ( place: string): Promise<Place[]> {
      const URL = 'https://nominatim.openstreetmap.org'
      try {
        const instance = axios.create({
          baseURL: URL,
          timeout: 5000,
          params: { ...this.paramsNominatim, city: place}
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

  async weatherPlace(lat: string, lon: string): Promise<Weather | null> {

    const URL = 'https://api.openweathermap.org/data/2.5'

    try {
      const instance = axios.create({
        baseURL: URL,
        timeout: 5000,
        params: { ...this.paramsMapbox, lat, lon }
      })
      const response = await instance.get('/weather')

      const { weather, main } = response.data

      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }

    } catch (error) {
      console.log(error)
      return null
    }

  }


  addHistory ( place: string = '' ): void {
    if (this.historial.includes(place.toLowerCase())) return
    this.historial = this.historial.splice(0, 5)
    this.historial.unshift(place.toLowerCase())

    // Save in DB
    this.saveInDB()
  }

  saveInDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    const data = JSON.parse(info)
    this.historial = data.historial
  }

}
