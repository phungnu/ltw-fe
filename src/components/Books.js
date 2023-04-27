import { useEffect, useState } from "react";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from 'antd';

function Books(props) {
     const [books, setBooks] = useState([])

     const [booksAll, setBookAll] = useState([]);

     const [textFilter, setTextFilter] = useState("");
     useEffect( () => {
          getBooks();
     }, []);

     const getBooks = async () => {
          await fetch("http://localhost:8080/books")
               .then((response) => response.json())
               .then((data) => {
                    setBooks(data)
                    setBookAll(data)
               })
               .catch((err) => console.log(err));
     }    

     useEffect( () => {
          filter()
     }, [textFilter])

     const filter = async () => {
          const result = await booksAll.filter(book => book.title.toLowerCase().includes(textFilter.toLowerCase()));
          setBooks(result);
     }

     const navigate = useNavigate();
     const handleNewBook = () => {
          navigate("/book?bookcode=-1")
     }

     const [bookDel, setBookDel] = useState();

     const handleView = (book) => {
          navigate(`/book?bookcode=${book.bookcode}`)
     }

     const [open, setOpen] = useState(false);
     
     const showModal = (book) => {
          console.log(book)
          setOpen(true);
          setBookDel(book);
     }

     const hideModal = () => {
          setOpen(false)
     }

     const handleDelete = async () => {
          await axios.delete(`http://localhost:8080/book/delete/${bookDel.bookcode}`, {
                    mode: 'no-cors',
                    headers: {
                         'Content-Type': 'application/json',
                         'Access-Control-Allow-Origin': "*",
                         'Access-Control-Allow-Headers': "*",
                         "Access-Control-Allow-Credentials" : true,
                         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
                    }
               })
               .then((res) => console.log(res))
               .catch(err => console.log(err))
          await getBooks();
          setOpen(false);
     }

     return (
          <di>
               <LoginHeader page="books"/>
               <h2 className="text-center">Books List</h2>
               <div className="row">
                    <button className="btn btn-primary col-lg-12" onClick={handleNewBook}>
                         New Book
                    </button>
                    <input onChange={(e) => setTextFilter(e.target.value) } type="text" className="col-lg-10" placeholder="Search"></input>
               </div>
               <div className="row">
                    <table className="table table-striped table-bordered">
                         <thead>
                              <tr>
                                   <th>BookCode</th>
                                   <th>Title</th>
                                   <th>Author</th>
                                   <th>Category</th>
                                   <th disabled>Sold</th>
                                   <th>Action</th>
                              </tr>
                         </thead>

                         <tbody>
                              {books.map((book) => (
                                   <tr key={book.bookcode}>
                                        <td>{book.bookcode}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.category}</td>
                                        <td>
                                             <input type="checkbox" defaultChecked={book.sold}/>
                                        </td>
                                        <td>
                                             <button className="btn btn-primary" onClick={() => handleView(book)}> View</button>
                                             <button className="btn btn-danger" onClick={() => showModal(book)}> Delete</button>
                                        </td>
                                   </tr>
                                   ))
                              }
                         </tbody>
                    </table>
                    <Modal
                         visible = {open}
                         title="Bạn có chắc chắn muốn xóa?"
                         cancelText="Không"
                         okText="Xóa"
                         onOk={handleDelete}
                         onCancel={hideModal}
                    >
                    </Modal>
               </div>
               <Footer page="books"/>
          </di>
     )
}

export default Books