import React,{Component} from 'react';
import ReadMoreAndLess, { sup } from 'react-read-more-less';


class Dummy extends Component{

    constructor(){
        super();
        localStorage.removeItem("token");
    }

    render(){

        const Paragraph="Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, PHP, Python, Bootstrap, Java and XML. ... Grid Intro Grid Container Grid Item ... The CSS box-sizing property allows us to include the padding and border in an element's total width and height."

        return(

            <div className="container-fluid">
                <div className="row">
               
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-8">
                    <div className="menu-container">
                        <ul>
                            <li><a href="#">1</a>
                                <ul>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                </ul>
                            </li>
                                <li>
                                    <a href="#">6</a>
                                </li>
                                <li><a href="#">7</a>
                                </li>
                                <li><a href="#">8</a>
                                </li>
                                <li><a href="#">9</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-2">
                    </div>
                </div>
            </div>
        );
    }
}

export default Dummy;

/*<ReadMoreAndLess className="read-more-content" charLimit={15} readMoreText="Read more" readLessText=" Read less">
 </ReadMoreAndLess>

*/