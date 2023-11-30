export interface PlaceAPI {
  place_id: number,
  licence: string,
  osm_type: string,
  osm_id: number,
  lat: string,
  lon: string,
  class: string,
  type: string,
  place_rank: number,
  importance: number,
  addresstype: string,
  name: string,
  display_name: string,
  boundingbox: string[]
}

export interface Place {
  id: number,
  name: string,
  lat: string,
  lng: string
}
