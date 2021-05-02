import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { currencyFormatter, diffDays } from '../../actions/stripe'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
const SmallCard = (props) => {
    console.log(props)
    const history = useHistory();
    const h = props.h;
    const handleHotelDelete = async () => {

    }
    return (
        <>
            <div className="container-fluid card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src="https://via.placeholder.com/900x500.png?text=MERN+Booking" alt="default hotel image"
                            className="card-image img img-fluid"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="cart-title">{h.title} <span class
                                ="float-right text-primary">{currencyFormatter({
                                    amount: h.price,
                                    currency: "usd"
                                })}</span>{" "}</h3>

                            <p className="alert alert-info">{h.location}</p>
                            <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
                            <p className="card-text">
                                <span className="float-right text-primary">
                                    for {diffDays(h.from, h.to)} {(diffDays(h.from, h.to) <= 1) ? 'day' : 'days'}
                                </span>
                            </p>
                            <p className="card-text">{h.bed} bed</p>
                            <p className="card-text">Avalilable from {new Date(h.from).toLocaleDateString()}</p>



                            <div className="d-flex justify-content-between h5">
                                <button onClick={() => history.push(`/hotel/${h._id}`)} className="btn btn-primary">Show More</button>
                                <Link>
                                    <EditOutlined className="text-warning"
                                    />
                                </Link>
                                <DeleteOutlined onClick={() => handleHotelDelete(h._id)}
                                    className="text-danger"

                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SmallCard
