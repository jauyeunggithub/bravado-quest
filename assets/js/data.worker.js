import db from '@/db'

onmessage = async () => {
  if ((await db.avatars.toCollection().toArray()).length > 0) {
    postMessage({
      loaded: true,
    })
    return
  }
  const usersObj = await import(`@/data/users.json`)
  const users = Object.values(usersObj)
  const usersWithId = users.map((u, id) => ({ ...u, id }))
  await db.avatars.bulkPut(usersWithId)
  postMessage({
    loaded: true,
  })
}
