import React,{Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'

class Signinpage extends Component{

    constructor(){
        super();

        const token=localStorage.getItem("token");
        console.log(token, "****************");
        let loggedin=true;
        if(token===null){
            loggedin=false;
        }
        this.state={
            loggedin
        }

    }

    signinresponse = (response) =>{

        if(response.status===200){
            console.log("in signin response",response.data);
            localStorage.setItem("token",response.data);
            this.setState({loggedin:true})
        }

    }

    userexist = (response)  =>{

        const Name=document.getElementById("Name").value;
        const Password=document.getElementById("Password").value;
        const Email=document.getElementById("Email").value;
        //const Confirmpassword=document.getElementById("Confirmpassword").value;

        if(!response.data){
            axios.post("signin",{name:Name,password:Password,email:Email})
            .then(res=>{this.signinresponse(res)})
            .catch(err=>{console.log(err)})
        }
        else{
            alert("username already exist");
        }
    }

    clickhandler = (e) =>{
        e.preventDefault();
        const Name=document.getElementById("Name").value;
        const Password=document.getElementById("Password").value;
        const Confirmpassword=document.getElementById("Confirmpassword").value;
        
        const url="userexist?name=" + Name;

        if(Password !== Confirmpassword){
            alert("mismatch password");
        }
        else{
            /*const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name:Name,
                    password:Password,
                    email:Email })
            };*/

            axios.get(url)
                .then(res=>{this.userexist(res)})
                .catch(err=>{console.log(err)})

            /*axios.get(url)
                .then(res=> {
                        if(!res.data){
                            console.log(res.data);
                            axios.post("signin", requestOptions)
                                .then(res=>{console.log(res)})
                                .catch(err=>{console.log("Error:",err)})
                        }
                })
                .catch(err=>{console.log(err)});*/
        }
    }

    render(){

        if(this.state.loggedin){
            return (<Redirect to="/homepage" />);
        }
        return(
            <div> 
                <div className="signinbutton">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    </div>
               <div className="jumbotron ">  
                <div className="signinbox">
                    <form onSubmit={(event)=>this.clickhandler(event)}>
                    <p className="heading">SIGN IN</p>
                    <p className="inputcontent">
                        <input type="text" placeholder="Enter username"  className="inputbox" id="Name" required />
                        <input type="text" placeholder="Enter EmailId" className="inputbox" id="Email" required/>
                        <input type="password" placeholder="Enter password" className="inputbox" id="Password" required />
                        <input type="password" placeholder="confirm password" className="inputbox" id="Confirmpassword" required />
                    </p>
                    <button className="submitbutton">SIGN IN</button> 
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default Signinpage;