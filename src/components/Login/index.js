import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { auth, db } from '../../configs/firebase'
import { collection, getDocs, where, query, limit } from 'firebase/firestore'
import { FacebookAuthProvider, signInWithPopup } from '@firebase/auth'
import { addDocument, generateKeywords } from '../../configs/FirebaseService'

const { Title } = Typography

const Login = () => {

  const handleLoginFacebook = async () => {
    const provider = new FacebookAuthProvider()
    const { user } = await signInWithPopup(auth, provider)

    const usersRef = collection(db, 'users')
    const userQuery = query(usersRef, where('uid', '==', user.uid), limit(1))
    const userDoc = await getDocs(userQuery)

    if (userDoc.docs.length === 0) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        keywords: generateKeywords(user.displayName)
      })
    }
  }

  return (
    <>
      <Row style={{ height: 800 }} justify='center' align='middle'>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={2}>
            Chat application
          </Title>

          <Button
            type='primary'
            onClick={handleLoginFacebook}
            style={{ width: '100%', marginBottom: 5 }}
          >
            Login with Facebook
          </Button>
          <Button type='danger' style={{ width: '100%', marginBottom: 5 }}>
            Login with Google
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Login
