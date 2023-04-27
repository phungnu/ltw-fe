import LoginHeader from "./LoginHeader";
import Footer from "./Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const { useEffect } = require("react");
const { useState } = require("react");
const { useParams } = require("react-router");


function Book (prop){
     const [book, setBook] = useState({});

     const [queryParameters] = useSearchParams()
     let bookcode = queryParameters.get("bookcode");
     if(bookcode==undefined){
          bookcode=-1
     }
     const navigate = useNavigate();
     const handleSave = () => {
          navigate("/books")
     }

     const onSaveClick = async () => {
          book.category = Number (book.category)
          console.log(JSON.stringify(book));

          await axios.post(`http://localhost:8080/book/save/${bookcode}`, {
               title: book.title,
               author: book.author,
               category: book.category,
               sold: book.sold,
               bookcode: book.bookcode
          }). then((response) => {
                    console.log(response.data)
                    handleSave();     
               })
               .catch((err) => console.log(err))

          // await fetch(`http://localhost:8080/book/save/${bookcode}`, {
          //      method: "POST",
          //      mode: "no-cors",
          //      body: JSON.stringify(book),
          //      headers: {
          //           'Content-Type': 'application/json; charsets = ISO-8859-1',
          //           'Access-Control-Allow-Origin': "*",
          //           'Access-Control-Allow-Headers': "*",
          //           "Access-Control-Allow-Credentials" : true 
          //      }
          // })
          //      .then((response) => {
          //           console.log(response)
          //           response.json()
          //      })
          //      .then((data) => console.log(data))
          //      .catch((err) => console.log(err));
         
     }

     const getDataBook = () => {
          console.log("bookcode" + bookcode)
          fetch(`http://localhost:8080/book/${bookcode}`)
               .then((response) => response.json())
               .then((data) => setBook(data))
               .catch((err) => console.log(err));
          console.log("book", book)
     }

     useEffect(() => {
          getDataBook()
     }, []);

     useEffect(() => {
          getDataBook()
     }, [bookcode]);

     return (
          <div>
               <LoginHeader page="books"/>
               <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
               {
                    (bookcode > 0) && (
                         <div>
                              BookCode:{" "}
                              <input type="number" value={book.bookcode}
                                   onChange={(e) => setBook({...book, bookcode: e.target.value})}
                              /> <br/>
                         </div>
                    )
               }
               
               Title:{" "}
               <input type="text" value={book.title}
                    onChange={(e) => setBook({...book, title: e.target.value})}
               /> <br/>
               Author:{" "}
               <input type="text" value={book.author}
                    onChange={(e) => setBook({...book, author: e.target.value})}
               /> <br/>
               Category:{" "}
               <input type="text" value={book.category}
                    onChange={(e) => setBook({...book, category: e.target.value})}
               /> <br/>
               Sold:{" "}
               <input type="checkbox" checked={book.sold}
                    onChange={(e) => setBook({...book, sold: e.target.checked})}
               /> <br/>
               <button onClick={onSaveClick}> Save</button>
               <Footer page="books"/>
          </div>
     )
}

export default Book;