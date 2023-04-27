import { Component } from "react";

class LoginClass extends Component {
     constructor(props){
          super(props);
          this.state={
               message:"xin chao ban"
          }
     }

     render(){
          return(
               <div>
                    <h1>{this.state.message}</h1>
                    <button onClick={()=> this.setState({message:"Ban da dang nhap thanh cong"})}>Đăng Nhập</button>
               </div>
          )
     }
}

export default LoginClass