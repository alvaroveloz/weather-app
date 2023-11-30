import { inquirerMenu, listPlacesToShow, pauseMenu, readInput } from "./helpers"
import { Search } from "./models"
import { yellow, green } from "colors"

const main = async () => {

  let opt: number
  const search = new Search()

  do {
    opt = await inquirerMenu()

    switch (opt) {

      case 1:
        const place = await readInput()
        const placesFound = await search.City(place)
        const option = await listPlacesToShow(placesFound)
        if (option === 0) continue;
        const city = placesFound.find((place) => {
          return place.id === option
        })
        if (!city) break
        search.addHistory(city.name)
        const weather = await search.weatherPlace( city.lat, city.lng )
        if(!weather) break
        search.showPlaceInformation(city)
        search.showWeatherInformation(weather)
        break;

      case 2:
        search.historialCapitalized.forEach((place, index) => {
          const idx =`${ green((index + 1).toString())}`
          console.log(`${idx}. ${place}`)
        })
        break;

      default:
        break;
    }


    if (opt !== 0) await pauseMenu()

  } while (opt !== 0)
}


main()
