import { faker } from '@faker-js/faker'

// export type Person = {
//   userId: string
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   progress: number
//   status: 'relationship' | 'complicated' | 'single'
//   subRows?: Person[]
// }

const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  return {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle([
      'relationship',
      'complicated',
      'single',
    ])[0],
  }
}

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens
    return range(len).map((_d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
