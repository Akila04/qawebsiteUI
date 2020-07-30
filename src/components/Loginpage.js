import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Loginpage extends Component{
    constructor(){
        super();
        let loggedin=true;
        const token=localStorage.getItem("token");
        console.log(token);
        if(token === null){
            console.log(token ,"((((((((((");
            loggedin=false;
        }
        this.state={
            loggedin
        }
        this.logout=this.logout.bind(this);
    }

    loginresponse = (response) => {
        console.log(response);
        const user=document.getElementById('Name').value;
        const data=response.data;
        console.log(data === 'F');
        if(data === 'F'){
            alert('incorret usename or password');
        }
        else{
            localStorage.setItem("token",response.data);
            localStorage.setItem("username",user);
            this.setState({loggedin:true});
           
        }

    }

    clickhandler = (event) =>{
        event.preventDefault();
        const name=document.getElementById("Name").value;
        const password=document.getElementById("Password").value;
        
        if((name!=='')&&(password!=='')){
            axios.get("http://localhost:8080/login?name=" + name + "&password=" + password)
                .then(res=> {this.loginresponse(res)})
                .catch(err=>{console.log(err)});
        }
    }

    signinclick = () =>{
        return <Redirect to="/signin" />
    }

    logout(){
        this.setState({loggegin:false});
    }

    render(){
        if(this.state.loggedin){
            return (<Redirect to="/homepage" />);
        }
        else{
            return(
                <div>
                    <div className="signinbutton">
                    <Link to="/signin">
                        <button>Sign In</button>
                    </Link>
                    </div>
                    <div className="jumbotron ">
                        
                        <div className="loginbox">
                            <form onSubmit={(event)=>this.clickhandler(event)}>
                            <p className="heading">LOGIN</p>
                            <p className="inputcontent">
                                <input type="text" placeholder="Enter username"  className="inputbox" id="Name" required />
                                <input type="password" placeholder="Enter password" className="inputbox" id="Password" required />
                            </p>
                            <button className="submitbutton">LOGIN</button> 
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Loginpage;


/* 34: .then(res=> {this.loginresponse(res)})*/
