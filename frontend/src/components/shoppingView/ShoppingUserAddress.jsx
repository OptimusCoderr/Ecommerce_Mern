import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Form from '../common/Form';
import { addressFormControls } from '../../config';
import { useToast } from "@/hooks/use-toast";
import { addNewAddressThunk, deleteAddressThunk, editaAddressThunk, fetchAllAddressesThunk } from '../../redux/shop/addressSlice';
import ShoppingAddressCard from './ShoppingAddressCard';

const initialAddressFormData = {
    useremail: "",
    name: "",
    address: "",
    country: "",
    city: "",
    phone: "",
    zipcode: "",
    notes: ""
};

const ShoppingUserAddress = ({ setCurrentSelectedAddress, selectedId }) => {
    const [formData, setFormData] = useState(initialAddressFormData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.shopAddress);
    const { toast } = useToast();

    useEffect(() => {
        // Fetch addresses when the component mounts
        dispatch(fetchAllAddressesThunk(user?.id));
    }, [dispatch, user]);

    useEffect(() => {
        // Automatically fill the user email in the form data
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                useremail: user.email || "", // Assuming user object has an email property
            }));
        }
    }, [user]);

    function handleManageAddress(event) {
        event.preventDefault();

        if (addressList.length >= 3 && currentEditedId === null) {
            setFormData(initialAddressFormData);
            toast({
                title: "You can add max 3 addresses",
                variant: "destructive",
            });
            return;
        }

        if (currentEditedId !== null) {
            dispatch(
                editaAddressThunk({
                    userId: user?.id,
                    addressId: currentEditedId,
                    formData,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddressesThunk(user?.id));
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);
                    toast({
                        title: "Address updated successfully",
                    });
                }
            });
        } else {
            dispatch(
                addNewAddressThunk({
                    ...formData,
                    userId: user?.id,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddressesThunk(user?.id));
                    setFormData(initialAddressFormData);
                    toast({
                        title: "Address added successfully",
                    });
                }
            });
        }
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(
            deleteAddressThunk({ userId: user?.id, addressId: getCurrentAddress._id })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddressesThunk(user?.id));
                toast({
                    title: "Address deleted successfully",
                });
            }
        });
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id);
        setFormData({
            useremail: user?.email || "", // Automatically fill the email
            name: getCurrentAddress?.name,
            address: getCurrentAddress?.address,
            country: getCurrentAddress?.country,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            zipcode: getCurrentAddress?.zipcode,
            notes: getCurrentAddress?.notes,
        });
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    console.log(addressList, "addressList");

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addressList && addressList.length > 0
                    ? addressList.map((singleAddressItem) => (
                        <ShoppingAddressCard
                            key={singleAddressItem._id}
                            selectedId={selectedId}
                            handleDeleteAddress={handleDeleteAddress}
                            addressInfo={singleAddressItem}
                            handleEditAddress={handleEditAddress}
                            setCurrentSelectedAddress={setCurrentSelectedAddress}
                        />
                    ))
                    : null}
            </div>
            <CardHeader>
                <CardTitle>
                    {currentEditedId !== null ? "Edit Address" : "Add New Address"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Form
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Edit" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    );
}

export default ShoppingUserAddress;