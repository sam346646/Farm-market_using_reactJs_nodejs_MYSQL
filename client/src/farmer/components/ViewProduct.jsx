import Axios from 'axios'
import { React, useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

import Breadcrumbs from '../components/Breadcrumbs';

function ViewProduct(props) {

    const [prodList, setProdList] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:8000/product/getall').then((response) => {
            setProdList(response.data)
        })
    }, [])



    if (props.view_action === "view_dashboard_product") {
        return (
            <>
                <Breadcrumbs breadcrumbs_title='Products' breadcrumbs_icon='first-order' />
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            prodList.map((prod) => {
                                return (
                                    <tr>
                                        <td>{prod.Prod_name}</td>
                                        <td>{prod.Prod_price}</td>
                                        <td><img src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="" width='60' height='60' /></td>
                                        <td><NavLink className='nav-link text-primary' to={`update_product/${prod.Prod_id}`}><i className="fa fa-pencil"></i> Edit</NavLink></td>
                                        <td><NavLink className='nav-link text-primary' to={`delete_product/${prod.Prod_id}`}><i className="fa fa-trash-o"></i> Delete</NavLink></td>
                                        <td><NavLink className='btn btn-success' to={`update_order/${prod.Prod_id}`}>Sold</NavLink></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </>
        )
    }


    if (props.view_action === "view_full_product") {
        return (
            <>
                <Breadcrumbs breadcrumbs_title='Products' breadcrumbs_icon='first-order' />
                <table className="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Expiry</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Manage</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            prodList.map((prod) => {
                                return (
                                    <tr>
                                        <td>{prod.Prod_name}</td>
                                        <td>{prod.Prod_type}</td>
                                        <td>{prod.Prod_qty}</td>
                                        <td>{prod.Prod_price}</td>
                                        <td>{prod.Prod_expiry}</td>
                                        <td><img src={`http://localhost:8000/includes/images/${prod.Prod_image1}`} alt="" width='60' height='60' /></td>
                                        <td><NavLink className='nav-link text-primary' to={`/update_product/${prod.Prod_id}`}><i className="fa fa-pencil"></i> Edit</NavLink></td>
                                        <td><NavLink className='nav-link text-primary' to={`/delete_product/${prod.Prod_id}`}><i className="fa fa-trash-o"></i> Delete</NavLink></td>
                                        <td><NavLink className='btn btn-success' to={`../update_order/${prod.Prod_id}`}>Sold</NavLink></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </>
        )
    }

}

export default ViewProduct
