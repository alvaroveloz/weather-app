import select from '@inquirer/select';
import input from '@inquirer/input';
import confirm from '@inquirer/confirm';

import { menu } from '../constants';
import { green } from 'colors';
import { Place } from '../interfaces/Place';

export const inquirerMenu = async () => {
  console.clear();
  const header = `\n${green('=====================')}\n Select an option \n${green('=====================')}\n`
  const options = await select({
    message: header,
    choices: menu
  })

  return options
}

export const listPlacesToShow = async (places: Place[]) => {
  console.clear();
  const choices = places.map((place, idx) => {
    return {
      name: `${green((idx + 1).toString())}. ${place.name}`,
      value: place.id
    }
  })
  choices.unshift({
    name: `${green('0.')} Cancel`,
    value: 0
  })
  const options = await select({
    message: 'Select an option',
    choices
  })

  return options
}

export const pauseMenu = async () => {
  return await input({
    message: `Press ${green('ENTER')} to continue`,
  })
}

export const confirmSelection = async () => {
  return await confirm({
    message: 'Are you sure?'
  })
}

export const readInput = async () => {
  return await input({
    message: 'Enter the new message',
    validate: (value) => {
      if (value.length === 0) {
        return 'Please enter a value';
      }
      return true
    }
  })
}
