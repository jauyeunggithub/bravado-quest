import Dexie from 'dexie'

const db = new Dexie('db')
db.version(1).stores({
  avatars: '++id, address, avatar, city, email, name, title',
})

onmessage =  async () => {
  const usersObj = await import(`@/data/users.json`)
  const users = Array.from(usersObj)
  const usersWithId = users.map((u, id) => ({ ...u, id }))
  await db.avatars.bulkPut(usersWithId)
  postMessage({ loaded: true })
}
