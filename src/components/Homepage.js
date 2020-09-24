import React,{Component} from 'react';
import axios from 'axios';
import  {Redirect} from 'react-router';
import {Link} from 'react-router-dom'
import ReadMoreAndLess from 'react-read-more-less';
import Navigationbar from './Navigationbar';
import InfiniteScroll from "react-infinite-scroller";


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
            count : 0,
            username:username,
            questions:[],
            answer:[],
            response:[],
            hasMoreItems: true,
            loggedin
        }
    }

    getanswer = (ans) =>{
        return(
            <div>
                <div>
                
                <ReadMoreAndLess
                            className="read-more-content"
                            charLimit={200}
                            readMoreText="Read more"
                            readLessText=" Read less"
                        >
                        {ans.answer}
                </ReadMoreAndLess>
                </div>
            </div>
        );

    }

    showItems = () =>{
        var questions=this.state.questions;
        var items = [];
        for (var i = 0; i < this.state.count; i++) {
            if(questions[i]){
                items.push(
                <div key={i}>
                    <div className="box">
                        <div className="question_asked_by">
                            <p className="subscript">answered_by</p>
                            <i className="fa fa-user-circle-o"></i>
                            &nbsp;{questions[i].answer[0].answered_by}
                        </div>
                        <Link to={'/singlequestionpage/'+ questions[i].question + '/' + questions[i].questioned_by}>
                            <p className="question">{questions[i].question}?</p>
                        </Link>
                        <div className="answer">{this.getanswer(questions[i].answer[0])}</div>
                    </div>
                </div>
                )
            }
        }

        return items;
    }

    loadMore() {
        const accesstoken=localStorage.getItem("token"); 
        if(this.state.hasMoreItems === true){
          setTimeout(() => {
            axios.get("/getlimitedquestionanswers?questionloaded="+ this.state.count,
                    {headers:{
                        Authorization:"Bearer " + accesstoken
                    }})
              .then(res => {
                this.setquestions(res.data);
              })
              .catch(err => {
                console.log(err);
              })
          }, 1000);
        }
    }

    setquestions = (response) =>{
        if(response){
            this.setState({
                count:this.state.count+response.length,
                questions : [...this.state.questions,...response]
            });
           
        }
        else{
            this.setState({ hasMoreItems: false});
        }
    } 

    backbtn = () =>{
        window.location.reload();
    }

    getreloadbutton = () =>{
        if(!this.state.hasMoreItems){
            return (
                <div>
                    <button className="Reloadbtn" onClick={() => {this.backbtn()}}>BACK TO TOP</button>
                </div>
            );
        }
        else{
            return <div></div>
        }
    }

    logouthandler = () =>{
        this.setState({loggedin:false});
    }

    render(){
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
                                <p className="homepageusername">&nbsp;<i className="fa fa-user-circle-o"></i>&nbsp;{this.state.username}</p>
                                <p>&nbsp;What is your question ?</p>
                            </div>
                            <div>
                                <InfiniteScroll
                                    loadMore={this.loadMore.bind(this)}
                                    hasMore={this.state.hasMoreItems}
                                    loader={<div className="loader" key={0}> Loading...</div>}
                                    useWindow={true}
                                >
                                    {this.showItems()}{" "}
                                </InfiniteScroll>{" "}
                            </div>{" "} 
                            {this.getreloadbutton()}
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

/*axios.get("http://localhost:8080/getlimitedquestions?questionloaded=" + this.state.count)
                .then(res => {
                    this.setState({
                        response:[...this.state.response,...res.data],
                        count:this.state.count+res.length
                    })
                })
                .catch(err => {console.log(err)})*/
            /*axios.get('/questionanswers',{
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then(res=>{
                this.setState({response:res.data});
                console.log(res);
            })
            .catch(err=>{console.log(err)});
*/

/*
<div className="col-sm-6">
                            <div className="box">
                                <p className="homepageusername">&nbsp;<i className="fa fa-user-circle-o"></i>&nbsp;{this.state.username}</p>
                                <p>&nbsp;What is your question ?</p>
                            </div>
                            <div>
                                {qa.map(q => (
                                    <div className="box">
                                        <div className="question_asked_by">
                                            <p className="subscript">answered_by</p>
                                            <i className="fa fa-user-circle-o"></i>
                                            &nbsp;{q.answer[0].answered_by}
                                        
                                        </div>
                                        <Link to={'/singlequestionpage/'+ q.question + '/' + q.questioned_by}>
                                            <p className="question">{q.question}?</p>
                                        </Link>
                                        <p className="answer">{this.getanswer(q.answer[0])}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick = {() => {this.loadmore()}}>loadmore</button>
                        </div>
*/

/*
<div>
                                {qa.map(q => (
                                    <div className="box">
                                        <div className="question_asked_by">
                                            <p className="subscript">answered_by</p>
                                            <i className="fa fa-user-circle-o"></i>
                                            &nbsp;{q.answer[0].answered_by}
                                        
                                        </div>
                                        <Link to={'/singlequestionpage/'+ q.question + '/' + q.questioned_by}>
                                            <p className="question">{q.question}?</p>
                                        </Link>
                                        <p className="answer">{this.getanswer(q.answer[0])}</p>
                                    </div>
                                ))}
                            </div>


*/

/*loadquestions = () =>{

        axios.get("http://localhost:8080/getlimitedquestions?questionloaded=" + this.state.count)
                .then(res => {
                    this.setState({
                        response:[...this.state.response,...res.data],
                        count:this.state.count+res.data.length
                    })
                })
                .catch(err => {console.log(err)})


    }*/
    /*loadmore = () =>{
        console.log("clicked");
        this.loadquestions();
    }*/

    /*console.log(response);
            this.setState({
                count:this.state.count+response.length,
                questions : [...this.state.questions,...response]
            });*/
 /*console.log("Hasmoreitems");
            this.setState({ hasMoreItems: false}); */

/*if(this.state.count >= 17){
            console.log("Hasmoreitems");
            this.setState({ hasMoreItems: false});
          }
          else{*/

/*componentDidMount() {
        if(this.state.loggedin){
            const accessToken=localStorage.getItem("token");
            console.log('Bearer ' + accessToken);
            const url="login/qa";

            //this.loadquestions();
            
        }
    }*/