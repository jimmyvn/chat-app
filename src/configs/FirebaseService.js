import { collection, addDoc } from '@firebase/firestore'
import { formatRelative } from 'date-fns'
import { db } from './firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const addDocument = (collectionName, data) => {
  const collectionRef = collection(db, collectionName)
  const timestampFirebaseServer = firebase.firestore.Timestamp.now()
  addDoc(collectionRef, {
    ...data,
    createdAt: timestampFirebaseServer,
    updatedAt: timestampFirebaseServer
  }).then((doc) => {
    console.log(doc)
  })
}

export const formattedDate = (seconds) => {
  let formattedDate = ''
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date())
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  return formattedDate
}

// Create `keywords` for displayName, using for search members in firebase users collection
export const generateKeywords = (displayName) => {
  // List all the permutation. vd: name = ["Jimmy", "Tuan", "Nguyen"]
  // => ["Jimmy", "Tuan", "Nguyen"], ["Jimmy", "Nguyen", "Tuan"], ["Tuan", "Jimmy", "Nguyen"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * Init an array with false value by default
   * Using to flag value at each index is already used or not.
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};