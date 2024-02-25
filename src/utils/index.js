import axios from "axios";

export const baseUrl = "http://185.239.209.106:8282/o/oauth2/token";
// export const baseUrl = "https://admin.modernhouseofantiques.com/o/oauth2/token";
export const client_id =     "id-3c8d609c-66a4-16ff-73e5-4ad16aa8c030"   //;  "id-24c099c3-81d3-abad-cd64-d432fab1c17"
export const secret = "secret-22b1a367-c24f-3eca-ce99-2f8b7f3a43b5"  //;  "secret-d2caec45-1534-94ba-b8cb-7ea84b13836"
// export const appUrl = "https://admin.modernhouseofantiques.com/";
export const appUrl = "http://185.239.209.106:8282/";
export const baseImageUrl ="https://localhost" 
export const channelId =  42326 //          // 40984; 
export const groupId =     20119// 41407//    // 38607;   
export const companyId =   20096 //  //; 38401
export const vocabId  = 42561  //  //; 41003
export const sites =   20119 //   //; 38607

// export const middlewareBaseUrl = "https://admin.modernhouseofantiques.com/o/mha-headless/";
export const middlewareBaseUrl = "http://185.239.209.106:8282/o/mha-headless/";
// export const apiBaseUrl =
//  `https://admin.modernhouseofantiques.com/o/headless-commerce-delivery-catalog/v1.0/channels/${channelId}/`;
export const apiBaseUrl =
 `http://185.239.209.106:8282/o/headless-commerce-delivery-catalog/v1.0/channels/${channelId}/`;
 
// export const cartBaseUrl =
//   `https://admin.modernhouseofantiques.com/o/headless-commerce-delivery-cart/v1.0/channels/${channelId}/`;
export const cartBaseUrl =
  `http://185.239.209.106:8282/o/headless-commerce-delivery-cart/v1.0/channels/${channelId}/`;
  
// export const cartUrl = 
// `https://admin.modernhouseofantiques.com/o/headless-commerce-delivery-cart/v1.0/channels/carts/`;
export const cartUrl = 
`http://185.239.209.106:8282/o/headless-commerce-delivery-cart/v1.0/channels/carts/`;


const qs = require("qs");

export const requestClientCredentialsAccessToken = () => {
  axios({
    method: "post",
    url: baseUrl,
    data: qs.stringify({
      client_id: client_id,
      client_secret: secret,
      grant_type: "client_credentials",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    localStorage.setItem("token", res.data.access_token);
  });
};








let basicauth = {
  UserName: "admin@giksindia.com",
  Password: "EugxQqFCW7XdfS",
};
export function GetHeaders(val) {
  let headers = {
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };
  headers.headers["authorization"] = val
    ? basicauth
    : `Bearer ${localStorage.getItem("token")}`;
  return headers;
}

export function errorCheckHandler(error) {
  let message = "";
  if (error.code === 401) {
  } else {
    if (error.code === 400) {
    }

    if (error.status === 403) {
      message = "You don’t have permission to access on this Server";
    } else if (error.status === 404) {
    } else if (error.status === 502) {
      message = "Bad Gateway error";
    } else if (error.status === 501) {
      message = "server has not  fulfill your request for that content";
    } else if (error.status === 502) {
      message = "Bad Gateway error";
    } else if (error.status === 500) {
      message = "INTERNEL SERVER ERORR";
    } else {
      message = error.code;
    }
  }
  return message;
}
