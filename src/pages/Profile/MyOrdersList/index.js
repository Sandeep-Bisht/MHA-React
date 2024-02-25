import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "./action";
import NoOrder from '../../../pages/noOrder';
import Loader from "../../../Components/loader";
import { appUrl, baseImageUrl } from "../../../utils";


import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "../../../css/myOrderList.css";

const MyOrdersList = () => {
  let [productList, setProductList] = useState([]);
  const [itemDeletingLoading, setItemDeletingLoading] = useState(true);
  let [userInfo, setUserInfo] = useState();
  const pageSize = 0;
  let dispatch = useDispatch();
  let state = useSelector((state) => state.GetMyOrderListReducer);

  useEffect(() => {
    if (JSON.parse(JSON.stringify(localStorage.getItem("userInfo")))) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(userInfo)
    }
  }, [])

  useEffect(() => {
    
    if (userInfo) {
      dispatch(ACTIONS.getOrderIds(userInfo.accountId, pageSize));
    }
  }, [userInfo]);

  useEffect(() => {
    if (
      state &&
      state.getMyOrderIdSuccess &&
      state.getMyOrderIdSuccess.order_data &&
      state.getMyOrderIdSuccess.order_data.length > 0 &&
      state.getMyOrderIdSuccess.order_data[0].orders &&
      state.getMyOrderIdSuccess.order_data[0].orders.length > 0
    ) {      
      let orderList = state.getMyOrderIdSuccess.order_data[0].orders;
      getMyOrderListByOrderIds(orderList);
    }else{
      setItemDeletingLoading(false)
      setProductList([])
    }
  }, [state.getMyOrderIdSuccess]);

  const getMyOrderListByOrderIds = async (orderList) => {
    try {
        let list = [];
        for (let items of orderList) { 
            if (items.orderPaymentStatus !== "pending"){
                list.push(items);
            }   
        }
        
        // Sort the list based on orderDate in descending order
        list.sort((a, b) => {
            const dateA = new Date(a.orderDate.split('/').reverse().join('/'));
            const dateB = new Date(b.orderDate.split('/').reverse().join('/'));
            return dateB - dateA;
        });
        
        setProductList(list);
        setItemDeletingLoading(undefined);
    } catch (error) {
        console.error("Error in getMyOrderListByOrderIds:", error);
    }
};




  let getOrderStatus = (orderStatus) => {
    let val = "col-md-3 col-3";
    switch (orderStatus) {
      case "completed":
        val = `${val}   completed-status`;
        break;
      case "cancelled":
        val = `${val}   cancelled-status`;
        break;
      case "pending":
        val = `${val}   pending-status`;
        break;
      case "in-progress":
        val = `${val}   inProgress-status`;
        break;
      default:
    } 
    return val;
  };


  return (
    <>
    <Loader loading={itemDeletingLoading} />
      { productList && <section>
        <div className="container new-order-style">
          <div className="row">
            <div className="col-md-12">
              <div className="orderlist-wrapper">
                  <Accordion allowZeroExpanded>
                    {productList && productList.length > 0 &&
                      productList.map((item, i) => {
                        return (
                          <>
                            <AccordionItem
                              key={i}
                            >
                              <AccordionItemHeading>
                                <AccordionItemButton>
                                  <div className="col-md-12 orderlist">
                                    <div className="col-md-3 col-3">
                                      <p className="new-order-fam">Order Id</p>
                                      <p className="new-order-fam-2">
                                        {item.orderId}
                                      </p>
                                    </div>
                                    <div className="col-md-3 col-3">
                                      <p className="new-order-fam">
                                        Order Amount
                                      </p>
                                      <p className="new-order-fam-2">
                                        ₹{Math.round(item.orderTotalAmt)}
                                      </p>
                                    </div>
                                    <div className="col-md-3 col-3">
                                      <p className="new-order-fam">
                                        Order Date
                                      </p>
                                      <p className="new-order-fam-2">
                                        {item.orderDate}
                                      </p>
                                    </div>
                                    <div
                                      className={getOrderStatus(
                                        item.orderStatus
                                      )}
                                    >
                                      <p className="new-order-fam">
                                        Order Status
                                      </p>
                                      <p className="new-order-fam-2">
                                        {item.orderStatus}
                                      </p>
                                    </div>
                                  </div>
                                </AccordionItemButton>
                              </AccordionItemHeading>

                              <AccordionItemPanel>
                                <div className="row ">
                                  <div className="sub-heading">
                                    {item &&
                                      item.orderItem &&
                                      item.orderItem.length > 0 &&
                                      item.orderItem.map((items, index) => {
                                        return (
                                          <>
                                            <div key={index}>
                                                 <div className="row order-list-second-heading">
                                                 <div className="col-md-3 col-3">
                                                   <h6 className="product-image">
                                                     Product image
                                                   </h6>
                                                   <img
                                                     src={
                                                       items &&
                                                       items.productThumbnail.replace(
                                                        `${baseImageUrl}`,
                                                         `${appUrl}`
                                                       )
                                                     }
                                                     className="animal-static-image img-fluid"
                                                     alt=""
                                                   />
                                                 </div>
                                                 <div className="col-md-3 col-3">
                                                   <h6>Product name</h6>
                                                   <p>{items.productName}</p>
                                                 </div>
                                                 <div className="col-md-3 col-3">
                                                   <h6>Quantity</h6>
                                                   <p className="product-quantity">
                                                     {items.quantity}
                                                   </p>
                                                 </div>
                                                 <div className="col-md-3 col-3">
                                                   <h6>Product price</h6>
                                                   <p>
                                                     {Math.round(items.price)}
                                                   </p>
                                                 </div>
                                               </div>                                                
                                                                                          
                                            </div>
                                          </>
                                        );
                                      })}
                                    <div className="order-total-value">
                                      <p>Total Value &nbsp; &nbsp; &nbsp;</p>
                                      <p>{Math.round(item.orderTotalAmt)}</p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionItemPanel>
                            </AccordionItem>
                          </>
                        );
                      })
                    }
                  </Accordion>
                
              </div>
            </div>
          </div>
        </div>
      </section>}

      {  productList && productList.length  < 1 && <NoOrder/>}
    </>
  );
};

export default MyOrdersList;
