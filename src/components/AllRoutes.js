import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
            console.log(response.data)
         }) 
         .catch(err => {
            console.log(err);
         });
    }, [])

    return ( 
        <div>Routes</div>
    );
}

export default AllRoutes;