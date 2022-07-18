import React from 'react';
import "../css/Checkout.css";
import AddIcon from '@mui/icons-material/Add';

const AddressForm = (props) => {

    const states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    const { form, onSubmitProp, onChangeHandlerProp } = props;

    return(
    <div>
        { form.address1?.length > 1 
        ? <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{color: "#007185", textDecoration: "none"}}> Change Address</button>
        : <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{color: "#007185", textDecoration: "none"}}><AddIcon/> Add a new Address</button>}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Enter a new shipping address</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h4 style={{marginBottom: "20px"}}> Add a new address</h4>
                    <form onSubmit={onSubmitProp}>
                        <div className="form-group mb-2">
                            <label htmlFor="exampleInputEmail1">Country/Region</label>
                            <select className="form-select" aria-label="Default select example" name="country" onChange={onChangeHandlerProp} value={form.country}>
                                <option>United States</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Full Name (First and Last Name)</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your full name" name="fullName" value={form.fullName} onChange={onChangeHandlerProp}/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={onChangeHandlerProp}/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Street Address or P.O Box" name="address1" value={form.address1} onChange={onChangeHandlerProp} />
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Apt, suite, unit, building, floor, etc." name="address2" value={form.address2} onChange={onChangeHandlerProp}/>
                        </div>
                        <div className="address__group">
                            <div className="form-group mb-2">
                                <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="city" value={form.city} onChange={onChangeHandlerProp}/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="exampleInputEmail1">States</label>
                                <select className="form-select" id="states__input" aria-label="Default select example" name="stateLoc" value={form.stateLoc} onChange={onChangeHandlerProp}>
                                    {
                                        states.map((state, index) => {
                                            return <option key={index}>{state}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="exampleInputEmail1" className="form-label">Zip Code</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="zipCode" value={form.zipCode} onChange={onChangeHandlerProp}/>
                            </div>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="defaultCheck1" onChange={onChangeHandlerProp} name="defaultAddress"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">Make this my default address</label>
                        </div>
                        <input type="submit" className="btn" id="address-button" value="Use this Address" data-bs-dismiss="modal"/>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
    )

}

export default AddressForm;