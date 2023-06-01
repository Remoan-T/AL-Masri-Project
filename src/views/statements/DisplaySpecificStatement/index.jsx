import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getStatements } from '../store'
function SingleStatement() {

    const { id } = useParams()
    const store = useSelector(state => state.statement)

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getStatements())


    }, [dispatch, store.data.length])

    console.log("🚀 ~ file: DisplaySingelProduct.jsx:5 ~ SingleProduct ~ productId:", id)
    const SingleStatement = store.data.find((statement) => statement.id === Number(id));
    console.log(SingleStatement)
    if (!SingleStatement) {
        return null; // or return a loading indicator or error message
    }
    return (
        <div>
            <div class="row">

                <div class="col-5">
                    <h2 className='product-name'>{SingleStatement.empty}</h2>
                    <p className='description-product '>{SingleStatement.net_weight}</p>
                    <p className='card-price my-2'>Price: {SingleStatement.num_cages}SYR</p>


                </div>





            </div>


        </div>
    );
}

export default SingleStatement;
