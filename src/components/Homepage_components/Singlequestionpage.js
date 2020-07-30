import React,{Component} from 'react';
import Navigationbar from '../Navigationbar';
import  {Redirect} from 'react-router';
import axios from 'axios';
import ReadMoreAndLess from 'react-read-more-less';
import './Homecomponents.css';

class Singlequestionpage extends Component{

    constructor(){
        super();
        let loggedin=true;
        const token=localStorage.getItem("token");
        if(token === null){
                loggedin=false;
        }
        this.state={
            answer:[],
            loggedin
        }
    }

    componentDidMount() {
        const accessToken=localStorage.getItem("token");
            console.log('Bearer ' + accessToken);
            const url="/getanswer?question="+this.props.match.params.question+"?";
            
            axios.get(url,{
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then(res=>{this.setState({question:this.props.match.params.question+"?",answer:res.data})})
            .catch(err=>{console.log(err)});
    }

    getanswer = (ans) =>{
        return(
            <div>
                {ans.map(a => (    
                    <p>
                        <i className="fa fa-user-circle-o"></i>
                         &nbsp;{a.answered_by}
                        <p className="subscript">answered_by</p>
                        
                        <ReadMoreAndLess
                            className="read-more-content"
                            charLimit={250}
                            readMoreText="Read more"
                            readLessText=" Read less"
                        >
                        {a.answer}
                        </ReadMoreAndLess>

                        <hr />

                    </p>
                ))}
            </div>
        );
    }
    

    render(){
        console.log("****************",this.props.match.params.question,"**************");
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
                            
                            <p className="sqpQuestionHeading">{this.state.question}</p>
                            <div className="line"></div>
                            <p className="sqpAnswers">{this.getanswer(this.state.answer)}</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
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

export default Singlequestionpage;