import React from 'react'
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../configs/firebase';

const useFirestore = (collectionName, condition) => {

  const [documents, setDocuments] = React.useState([])

  React.useEffect(() => {
    const collectionRef = collection(db, collectionName)
    let collectionQuery = query(collectionRef)
    if (condition) {
      collectionQuery = query(collectionRef, where(
        condition.field,
        condition.operator,
        condition.value
      ))
    }

    const unsubscribe = onSnapshot(collectionQuery, (docs) => {
      const data = docs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))

      setDocuments(data)

      return () => {
        unsubscribe()
      }
    })

  }, [collectionName, condition])


  return documents
}

export default useFirestore
