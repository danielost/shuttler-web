import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
import RouteInfo from './RouteInfo'

const AllRoutes = () => {
    const [routes, setRoutes] = useState(null);

    useEffect(() => {
        axios({
            url: 'https://localhost:8443/api/v1/routes',
            method: 'get',
            headers: {
                'Authorization': "Bearer_" + Cookies.get("_auth")
            }
         })
         .then(response => {
            setRoutes(response.data);
            console.log(response.data);
         }) 
         .catch(err => {
            console.log(err);
         });
    }, [])

    return ( 
        <div className="route-container">
            {routes != null ? (
                <>{
                    routes.map (currRoute =>(
                        <div className="route-unit">
                            <RouteInfo route={currRoute}/>
                        </div>
                    ))
                  }</>
                // <div>{JSON.stringify(routes)}</div>
            ) : (
                <Spinner/>
            )}
        </div>
    );
}

export default AllRoutes;