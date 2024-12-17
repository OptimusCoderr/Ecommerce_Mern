import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import Form from '../../components/common/Form';
import { addProductFormElements } from '../../config';
import ProductImageUpload from '../../components/adminView/ProductImageUpload';
import { useDispatch, useSelector } from "react-redux";
import { addNewProductThunk, deleteProductThunk, editProductThunk, fetchAllProductsThunk } from '../../redux/admin/productSlice/productSlice';
import { useToast } from "@/hooks/use-toast"
import AdminProductTile from '../../components/adminView/AdminProductTile';


const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState]  =  useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch()
  const {productList} = useSelector(state => state.adminProducts);
  const {toast} = useToast()

  function onSubmit(event) {
    event.preventDefault();
    // Add logic to create a new product
    currentEditedId !==  null ?
    dispatch(editProductThunk({
      id: currentEditedId, formData
     })).then((data) => {
      console.log(data,'edit')
      if(data?.payload?.success){
        dispatch(fetchAllProductsThunk());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null)
      }
     })
    :dispatch(addNewProductThunk({
      ...formData,
      image: uploadedImageUrl,
    })).then((data) =>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProductsThunk());
        setOpenCreateProductsDialog(false)
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title: "Product added successfully",
        });
      }
    })
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProductThunk(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProductsThunk());
      }
    });
  }


  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }


  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);
  console.log(productList,uploadedImageUrl, "productList")

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      {/**Rendering the Products List */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                product={productItem}
                handleDelete={handleDelete}
                
              />
            ))
          : null}
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
      }}
        >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
            {
              currentEditedId !== null ?
              "Edit Product" : "Add New Product"
            }
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload 
            imageFile={imageFile} 
            setImageFile={setImageFile} 
            uploadedImageUrl={uploadedImageUrl} 
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState = {setImageLoadingState}
            imageLoadingState = {imageLoadingState}
            isEditMode = {currentEditedId !== null}
          />

          <div className='py-6'>
            <Form
              onSubmit={onSubmit}
              formData={formData} 
              setFormData={setFormData} 
              formControls={addProductFormElements} 
              buttonText= {currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled = {!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;