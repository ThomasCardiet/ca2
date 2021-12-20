//component to view all identities

import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

class Identities extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            identities: [],
            isLoaded: true
        }

    }

    /*ajax request to recup (with get) list of identities*/
    componentDidMount(){

        axios.get('/identity')
            .then((response) => {
                console.log(response.data)
                // handle success when status is 200 and OK
                // populate the identities array with the data from the server
                // set isLoaded to true to make sure we render the right values on screen
                this.setState( {
                    identities: response.data,
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

    /*ajax request to delete Identity with id*/
    deleteIdentity(id) {
        axios.delete(`/identity/${id}`)
        return this.componentDidMount()
    }

    /*transformation of arrays to String*/
    arrayToString(value) {
        let newValue = '';
        if(value === undefined) return newValue;
        value.forEach((e, i) => {
            if(i !== 0) {
                newValue += ",";
            }
            newValue+=e;
        })
        return newValue;
    }

    render(){
        //assign variables using the state
        const { isLoaded, error, identities} = this.state;

        //conditional rendering: https://reactjs.org/docs/conditional-rendering.html
        //if we are waiting for our server to serve us the data render this part of code
        // also render this if the SERVER is offline
        if(!isLoaded){
            return(
                <div>The page is loading or the SERVER is down...</div>
            )
            //render this part of code if we received the data from the server
        } else {
            return(
                <section id="center">
                    <table>
                        <thead>
                            <tr>
                                {/*Let see the length of entity list*/}
                                <th>ID | length of {identities.length} entities</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Age</th>
                                <th>Origins</th>
                                <th>Height</th>
                                <th>isAuth</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        {/*Listing of identities with map*/}
                        {identities.map(identity => (
                            <tr key={identity._id}>
                                <td>{identity._id}</td>
                                <td>{identity.name}</td>
                                <td>{identity.surname}</td>
                                <td>{identity.age}</td>
                                <td>{this.arrayToString(identity.origins)}</td>
                                <td>{identity.height}</td>
                                <td >{identity.isAuth? 'Yes' : 'No'}</td>
                                {/* link to view a single identity details by ID  */}
                                <td><Link to={`/viewIdentity?id=${identity._id}`}>View</Link></td>
                                {/* link to view and edit the identity details by ID */}
                                <td><Link to={`/editIdentity?id=${identity._id}`}>Edit</Link></td>
                                <td>
                                    <button onClick={this.deleteIdentity.bind(this, identity._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/*link to adding route*/}
                    <Link className="link" to={"/addIdentity"}>Add an Identity</Link>
                </section>
            )
        }
    }
}


export default Identities;
