import React,{Component} from 'react';
import axios from 'axios';
import  {Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import ReadMoreAndLess from 'react-read-more-less';
import Navigationbar from './Navigationbar';

class Homepage extends Component{
    
    constructor(){
        super(); 
        let loggedin=true;
        const username = localStorage.getItem("username");
        const token=localStorage.getItem("token");
        if(token === null){
            loggedin=false;
        }
        this.state={
            username:username,
            question:'',
            answer:[],
            response:[],
            loggedin
        }
    }

    getanswer = (ans) =>{
        /*return(
            <div>
                {ans.map(a => (    
                    <p>
                         {a.answered_by}
                        <ReadMoreAndLess
                            className="read-more-content"
                            charLimit={200}
                            readMoreText="Read more"
                            readLessText=" Read less"
                        >
                        {a.answer}
                        </ReadMoreAndLess>
                       
                    </p>
                    
                ))}
            </div>
        );*/
        
        return(
            <div>
                <p>
                
                <ReadMoreAndLess
                            className="read-more-content"
                            charLimit={200}
                            readMoreText="Read more"
                            readLessText=" Read less"
                        >
                        {ans.answer}
                </ReadMoreAndLess>
                </p>
            </div>
        );

    }

    /*temp = (res) =>{
        var response=JSON.stringify(res);
        var parseObject = JSON.parse(response);
        console.log(parseObject);
    }*/

    componentDidMount() {
        if(this.state.loggedin){
            const accessToken=localStorage.getItem("token");
            console.log('Bearer ' + accessToken);
            const url="login/qa";
            
            axios.get('/login/qa',{
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then(res=>{
                this.setState({response:res.data})
            })
            .catch(err=>{console.log(err)});
        }
    }

    logouthandler = () =>{
        this.setState({loggedin:false});
    }

    render(){
        const qa=this.state.response;
        if(this.state.loggedin){
        return(
            <div>
                <Navigationbar />
                <div className="container-fluid homecontainer">
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6">
                            <div className="box">
                                <h4>{this.state.username}</h4>
                                <p>What is your question ?</p>
                            </div>
                            <div>
                                {qa.map(q => (
                                <div className="box">
                                <div className="question_asked_by">
                                    <i className="fa fa-user-circle-o"></i>
                                    &nbsp;{q.question_asked_by}
                                    <p className="subscript">question_by</p>
                                </div>
                                <Link to={'/singlequestionpage/'+ q.question}>
                                <p className="question">{q.question}</p>
                                </Link>
                                <p className="answer">{this.getanswer(q.answers[0])}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-sm-3 ">      
                        </div>
                    </div>
                </div>
            </div>
           
        );
        }
        else{
            return <Redirect to="/login"  />
        }
        
    }
}

export default Homepage;

/*

.then(res=>{this.temp(res)})
            .catch(err=>console.log(err));
<p><i class="fa fa-user-circle-o"></i> {q.question_asked_by}</p>

<p className="answer">{this.getanswer(q.answers)}</p>
*/