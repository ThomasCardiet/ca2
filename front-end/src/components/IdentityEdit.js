//component to edit a identity entry

import React from 'react';
import axios from "axios";

class IdentityEdit extends React.Component{
    constructor(props){
        super(props);
        this.id = window.location.href.split('=')[1]
        this.state = {
            identity: {},
            isLoaded: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){

        axios.get(`/identity/${this.id}`)
            .then((response) => {
                console.log(response.data)
                // handle success when status is 200 and OK
                // populate the identities array with the data from the server
                // set isLoaded to true to make sure we render the right values on screen
                this.setState( {
                    identity: response.data,
                    isLoaded: true
                })

            })
            .catch((error)=> {
                // handle error
                // in case we get an error from the server, e.g. the server is offline
                this.setState({
                    isLoaded:false,
                    error
                })

            })
    }

    transformValue(value){
        let newValue = null;
        switch (typeof value) {
            case "object":
                newValue = '';
                value.forEach(e => {
                    if(newValue.length>0) {
                        newValue+=',';
                    }
                    newValue+=e;
                })
                break;
        }
        return newValue;
    }

    handleChange(event) {
        //this.setState({identity: event.target.value});
    }

    handleSubmit(event) {
        this.setState({identity: event})
        event.preventDefault()
    }

    render(){
        //assign variables using the state
        const { isLoaded, error, identity} = this.state;

        //conditional rendering: https://reactjs.org/docs/conditional-rendering.html
        //if we are waiting for our server to serve us the data render this part of code
        // also render this if the SERVER is offline
        if(!isLoaded){
            return(
                <div>The page is loading or the SERVER is down...</div>
            )
            //render this part of code if we received the data from the server
        } else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">
                            Name:
                            <input id="name" type="text" value={identity.name}/>
                        </label>

                        <label htmlFor="surname">
                            Surname:
                            <input id="surname" type="text" value={identity.surname}/>
                        </label>


                        <label htmlFor="age">
                            Age:
                            <input id="age" type="number" value={identity.age}/>
                        </label>

                        <label htmlFor="height">
                            Height:
                            <input id="height" type="text" value={identity.height}/>
                        </label>

                        <label htmlFor="origins">
                            Origins:
                            <input id="origins" type="text" value={this.transformValue(identity.origins)}/>
                        </label>

                        <label htmlFor="isAuth">
                            isAuth:
                            <input id="isAuth" type="checkbox" checked={identity.isAuth}/>
                        </label>

                        <input type="submit" value="Envoyer" />

                    </form>
                </div>
            )
        }
    }
}

export default IdentityEdit;
