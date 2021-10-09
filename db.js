import Dexie from 'dexie'

const db = new Dexie('db')
db.version(1).stores({
  avatars: '++id, address, avatar, city, email, name, title',
})

export default db
