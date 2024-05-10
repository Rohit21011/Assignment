import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Skeleton, Row, Col } from 'antd';
import useBookManagement from '../hooks/customHook';

const BookList = () => {
  const [visible, setVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [addForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const { books, loading, fetchBooks, searchBook, deleteBook, addBook, updateBook } = useBookManagement();

  useEffect(() => {
    fetchBooks();
  }, []);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Genre', dataIndex: 'genre', key: 'genre' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showUpdateModal(record)} style={{ marginRight: '15px' }}>Update</Button>
          <Button onClick={() => deleteBook(record._id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  const showModal = () => setVisible(true);

  const showUpdateModal = (book) => {
    setSelectedBook(book);

    setUpdateModalVisible(true);  
  };

  const handleOk = async () => {
    try {
      await addForm.validateFields();
      const values = addForm.getFieldsValue();
      addBook(values);
      setVisible(false);
      addForm.resetFields();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateForm.validateFields();
      const values = updateForm.getFieldsValue();
      const id = selectedBook._id;
      updateBook(id, values);
      setUpdateModalVisible(false);
      updateForm.resetFields();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleCancel = () => {
    updateForm.resetFields();
    setVisible(false);
   
  };

  const handleCancelUpdate = () => {
    updateForm.resetFields();
    setSelectedBook(null)
    setUpdateModalVisible(false);
  };

  const handleSearch = (value) => {
    searchBook(value);
  };

  return (
    <div  style={{ textAlign: 'center',marginTop:"20px" }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
          <Input.Search
            placeholder="Search books"
            onSearch={handleSearch}
          />
        </Col>
        <Col xs={24} sm={8} md={6} lg={4} xl={4}>
          <Button type="primary" onClick={showModal} block>
            Add Book
          </Button>
        </Col>
      </Row>
      <Skeleton loading={loading} active>
        <div style={{ margin: '20px auto', maxWidth: '800px' }}>
          <Table dataSource={books} columns={columns}  pagination={{ pageSize: 6, showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }}/>
        </div>
      </Skeleton>
      {selectedBook && (
        <Modal 
        closeIcon={null} 
          title="Update Book"
          visible={updateModalVisible}
          onOk={handleUpdate}
          onCancel={handleCancelUpdate}
        >
          <Form form={updateForm} initialValues={selectedBook}>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter title' }, { pattern: /^[A-Za-z\s]+$/, message: 'Please enter only letters and spaces' }]}>
  <Input />
</Form.Item>
<Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please enter author' }, { pattern: /^[A-Za-z\s]+$/, message: 'Please enter only letters and spaces' }]}>
  <Input />
</Form.Item>
<Form.Item label="Genre" name="genre" rules={[{ required: true, message: 'Please enter genre' }, { pattern: /^[A-Za-z\s]+$/, message: 'Please enter only letters and spaces' }]}>
  <Input />
</Form.Item>

          </Form>
        </Modal>
      )}
      <Modal
      closeIcon={null} 
        title="Add Book"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={addForm}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter title' }, { pattern: /^[A-Za-z\s]+$/, message: 'Please enter only letters and spaces' }]}>
  <Input />
</Form.Item>
<Form.Item label="Author" name="author" rules={[{ required: true, message: 'Please enter author' }, { pattern: /^[A-Za-z\s]+$/, message: 'Please enter only letters and spaces' }]}>
  <Input />
</Form.Item>
<Form.Item label="Genre" name="genre" rules={[{ required: true, message: 'Please enter genre' }, { pattern: /^[A-Za-z\s]+$/, message: 'Please enter only letters and spaces' }]}>
  <Input />
</Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default BookList;
