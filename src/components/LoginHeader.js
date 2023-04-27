const { useState } = require("react");
const LoginHeader = ()=>{
     const headerStyle={
          // overflow:"hidden",
          // background:"linear-gradient(to left, red, yellow)",
          // display: "flex",
          // justifyContent:"Space-between"
          left: 0,
          bottom: 0,
          width: "100%",
          background:"linear-gradient(to left, red, yellow)",
     };
     const[message, setMessage] = useState("xin chao")
     return (
          <div style={headerStyle}> 
               {/* <h1>{message}</h1>
               <button onClick={()=> setMessage("Ban da dang nhap thanh cong")}>Đăng Nhập</button> */}
               <h2>Header</h2>
          </div>
     )
}

export default LoginHeader