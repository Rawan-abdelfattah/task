"use client";

import axios from "axios";

const Api = axios.create({
       baseURL: "http://16.170.247.231:3003",
      //  baseURL: "https://.com/api",
    headers: {
      'Content-Type': 'application/json',
    },
    // withCredentials: true,
  });

  
export default Api

 