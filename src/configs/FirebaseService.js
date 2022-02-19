import { collection, addDoc } from '@firebase/firestore'
import { db } from './firebase'

export const addDocument = (collectionName, data) => {
  const collectionRef = collection(db, collectionName)

  addDoc(collectionRef, {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }).then((doc) => {
    console.log(doc)
  })
}
