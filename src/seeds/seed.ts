import { Connection } from 'mongoose'

const modules = ['admins']

const seed = async (database: Connection) => {
  await Promise.all(
    modules.map(async (moduleName) => {
      const { seed, Model } = require(`./modules/${moduleName}`)

      console.log(`***** Updating ${moduleName} *****\n`)

      const sums = {
        inserted: 0,
        failed: 0,
      }

      await Promise.all(
        seed.map(async (item: any) => {
          try {
            await Model.create(item)
            sums.inserted += 1
          } catch (error) {
            sums.failed += 1
          }
        }),
      )

      console.log(`Inserted: ${sums.inserted}`)
      console.log(`Failed: ${sums.failed}\n`)

      console.log(`### All ${moduleName} updated ###\n`)
    }),
  )

  database.close()
}

export default seed
