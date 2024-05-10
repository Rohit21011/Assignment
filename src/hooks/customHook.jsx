/* eslint-disable no-undef */
import { useState } from 'react';
import axios from 'axios';

const useBookManagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://assignment-backend-u2j5.onrender.com/books/getBooks")
      setBooks(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://assignment-backend-u2j5.onrender.com/books/delete/${id}`);
      await fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const addBook = async (values) => {
    try {
      await axios.post(`https://assignment-backend-u2j5.onrender.com/books/addBooks`, values);
      await fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (id, values) => {
    try {
        await axios.put(`https://assignment-backend-u2j5.onrender.com/books/update/${id}`, values);
      console.log('Updated book:', values);
      await fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  
  const searchBook = async (value) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://assignment-backend-u2j5.onrender.com/books/searchBook?query=${encodeURIComponent(value)}`);
      setBooks(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { books, loading, error, searchBook,fetchBooks, deleteBook, addBook, updateBook };
};

export default useBookManagement;
