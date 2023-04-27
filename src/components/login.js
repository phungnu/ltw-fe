const { useState } = require("react")

const Login = () => {
     const[message, setMessage] = useState("xin chao")
     return (
          <div>
               <h1>{message}</h1>
               <button onClick={()=> setMessage("Ban da dang nhap thanh cong")}>Đăng Nhập</button>
          </div>
     )
}
export default Login