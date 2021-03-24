
import React, {Component}from 'react'

class PopOut extends Component{

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         Class: "",
    //         CourseInfo: "",
    //         HostName:"",
    //         date:"",
    //         time: "",
    //         link:"",
    //         capacity:""
    //     };
    //     this.handleChange = this.handleChange.bind(this);

    // }
    // handleChange(event){
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    constructor(){
        super()
        this.state={
            character: {}
        }
    }

    componentDidMount(){
        fetch("https://swapi.dev/api/people/1/")
        .then(response => response.json())
        .then(data => {
            this.setState({character:data
            })
        })
        
        // console.log("I am inside component did mount ");
    }
   
    render(){
        
        return(
            <div className="container2">
                <form>
              {/* <image src={} alt="profile image"/> */}
               <h3 className="text_study">{this.state.character.name}</h3>
               <h3 className="text_study">{this.props.courseInfo}</h3>
               <h3 className="text_study">Hosted by  {this.props.hostInfo}</h3>
               <h3 className="text_study">{this.props.date}</h3>
               <h3 className="text_study">{this.props.time}</h3>
               <h3 className="text_study">Meeting Link: </h3>
               <h3 className="text_study"> {this.props.link}</h3>
               <h3 className="text_study" style={{paddingTop:15, fontSize:15}}>{this.props.capacity}/{this.props.topCap} Spots Remaining</h3>
               <input className="submit" type="submit" value="Join Session" />
               <input  className="submit" type="submit" value="Remove" />
           </form>
         
           </div>
        )
    }
}
export default PopOut
