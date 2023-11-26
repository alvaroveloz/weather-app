import { inquirerMenu, listPlacesToShow, pauseMenu, readInput } from "./helpers"
import { Search } from "./models"
import { green } from "colors"

const main = async () => {

  let opt: number
  const search = new Search()

  do {
    opt = await inquirerMenu()

    switch (opt) {

      case 1:
        const place = await readInput()
        const placesFound = await search.City(place)
        listPlacesToShow(placesFound)
        break;
        //* Show cities
        //* Select city
        console.log(green('\nInformation about the city\n'))
        console.log(`City: `)
        console.log(`Lat:`)
        console.log(`Lng:`)
        console.log(`Temperature:`)
        console.log(`Min:`)
        console.log(`Max:`)
        break;

      default:
        break;
    }


    if (opt !== 0) await pauseMenu()

  } while (opt !== 0)
}


main()
