import React from 'react'
import { Modal, Form, Select, Spin, Avatar } from 'antd'
import { AppContext } from '../../../context/AppProvider'
import debounce from 'lodash.debounce'
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from '@firebase/firestore'
import { db } from '../../../configs/firebase'

const DebounceSelect = ({ fetchFunc, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions] = React.useState([])

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([])
      setFetching(true)

      fetchFunc(value, props.currentmembers).then(newOptions => {
        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchFunc])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {
        options.map(option => (
          <Select.Option
            key={option.value}
            value={option.value}
            title={option.label}
          >
            <Avatar className="avatar" size='small' src={option.photoURL}>
              {option.photoURL ? '' : option.label?.charAt(0).toUpperCase()}
            </Avatar>
            {option.label}
          </Select.Option>
        ))
      }
    </Select>
  )
}

const fetchUsersToInvite = async (keyword, currentMembers) => {
  const usersRef = collection(db, 'users')
  const usersQuery = query(
    usersRef,
    where('keywords', 'array-contains', keyword),
    orderBy('displayName'),
    limit(20)
  )
  return await getDocs(usersQuery).then((snapshot) => {
    return snapshot.docs.map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    })).filter(option => !currentMembers.includes(option.value))
  })
}

const InviteMemberModal = () => {
  const {
    isDisplayInviteMemberModal,
    setIsDisplayInviteMemberModal,
    channelSelected
  } = React.useContext(AppContext)

  const [value, setValue] = React.useState([])

  const [form] = Form.useForm()

  const handleOk = async () => {
    setIsDisplayInviteMemberModal(false)

    form.resetFields()
    setValue([])
    const channelsRef = doc(db, 'channels', channelSelected.id)
    await updateDoc(channelsRef, {
      members: [...channelSelected.members, ...value.map((val) => val.value)]
    })
  }

  const handleCancel = () => {
    setIsDisplayInviteMemberModal(false)
    form.resetFields()
    setValue([])
  }

  return (
    <>
      <Modal
        title="Invite Member"
        visible={isDisplayInviteMemberModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout='vertical'
        >
          <DebounceSelect
            placeholder="Search for members"
            mode='multiple'
            style={{ width: '100%' }}
            label='Name of member'
            value={value}
            fetchFunc={fetchUsersToInvite}
            onChange={newValue => setValue(newValue)}
            currentmembers={channelSelected.members}
          />
        </Form>
      </Modal>
    </>
  )
}

export default InviteMemberModal
