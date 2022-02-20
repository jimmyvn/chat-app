import React from 'react'
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '../configs/firebase';

const useFirestore = (collectionName, condition) => {

  const [documents, setDocuments] = React.useState([])

  React.useEffect(() => {
    const collectionRef = collection(db, collectionName)
    let collectionQuery = query(collectionRef, orderBy('createdAt'))
    if (condition) {

      if (condition.value == undefined || condition.value.length === 0) {
        setDocuments([])
        return
      }

      collectionQuery = query(collectionRef, where(
        condition.field,
        condition.operator,
        condition.value
      ), orderBy('createdAt'))
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
