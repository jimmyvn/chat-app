import React from 'react';
import { Modal, Form, Input } from 'antd';
import { AppContext } from '../../../context/AppProvider';
import { addDocument } from '../../../configs/FirebaseService'
import { AuthContext } from '../../../context/AuthProvider';

const AddChannelModal = () => {

  const [form] = Form.useForm()

  const {
    isDisplayAddChannelModal,
    setIsDisplayAddChannelModal
  } = React.useContext(AppContext)

  const { user: {
    uid
  } } = React.useContext(AuthContext)

  const handleOk = () => {
    setIsDisplayAddChannelModal(false);
    const formData = form.getFieldsValue()

    if (formData.title === undefined || formData.title.length === 0) {
      return
    }

    addDocument('channels', {
      ...formData,
      members: [uid]
    })
    form.resetFields()
  }

  const handleCancel = () => {
    setIsDisplayAddChannelModal(false)
    form.resetFields()
  }

  return (
    <>
      <Modal title="Add Channel" visible={isDisplayAddChannelModal} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout='vertical' name="nest-messages">
          <Form.Item
            name={'title'}
            label="Title"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Title"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            name={'description'}
            label="Description"
          >
            <Input.TextArea
              placeholder="Description"
              autoComplete="off"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddChannelModal
