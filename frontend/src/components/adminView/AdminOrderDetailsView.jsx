import { useState } from "react";
import Form from "../common/Form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";;
import { useToast } from "@/hooks/use-toast";
import { getAllOrdersForAdminThunk, getOrderDetailsForAdminThunk, updateOrderStatusThunk } from "../../redux/admin/orderSlice/orderSlice";

const initialFormData = {
    status: "",
  };

const AdminOrderDetailsView = ({ orderDetails }) => {


    const [formData, setFormData] = useState(initialFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();

    console.log(orderDetails, "orderDetailsorderDetails");


    function handleUpdateStatus(event) {
        event.preventDefault();
        const { status } = formData;

        dispatch(
        updateOrderStatusThunk({ id: orderDetails?._id, orderStatus: status })
        ).then((data) => {
        if (data?.payload?.success) {
            dispatch(getOrderDetailsForAdminThunk(orderDetails?._id));
            dispatch(getAllOrdersForAdminThunk());
            setFormData(initialFormData);
            toast({
            title: data?.payload?.message,
            });
        }
        });
    }



    return (
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex mt-6 items-center justify-between">
                <p className="font-medium">Order ID</p>
                <Label>{orderDetails?._id}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Date</p>
                <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Price</p>
                <Label>${orderDetails?.totalAmount}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Payment method</p>
                <Label>{orderDetails?.paymentMethod}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Payment Status</p>
                <Label>{orderDetails?.paymentStatus}</Label>
              </div>
              <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Status</p>
                <Label>
                  <Badge
                    className={`py-1 px-3 ${
                      orderDetails?.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderDetails?.orderStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-black"
                    }`}
                  >
                    {orderDetails?.orderStatus}
                  </Badge>
                </Label>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Order Details</div>
                <ul className="grid gap-3">
                  {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                    ? orderDetails?.cartItems.map((item) => (
                        <li className="flex items-center justify-between">
                          <span>Title: {item.title}</span>
                          <span>Quantity: {item.quantity}</span>
                          <span>Price: ${item.price}</span>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Shipping Info</div>
                <div className="grid gap-0.5 text-muted-foreground">
                  <span>{orderDetails?.addressInfo?.useremail}</span>
                  <span>{orderDetails?.addressInfo?.name}</span>
                  <span>{orderDetails?.addressInfo?.address}</span>
                  <span>{orderDetails?.addressInfo?.country}</span>
                  <span>{orderDetails?.addressInfo?.city}</span>
                  <span>{orderDetails?.addressInfo?.zipcode}</span>
                  <span>{orderDetails?.addressInfo?.phone}</span>
                  <span>{orderDetails?.addressInfo?.notes}</span>
                </div>
              </div>
            </div>
    
            <div>
              <Form
                formControls={[
                  {
                    label: "Order Status",
                    name: "status",
                    componentType: "select",
                    options: [
                      { id: "pending", label: "Pending" },
                      { id: "inProcess", label: "In Process" },
                      { id: "inShipping", label: "In Shipping" },
                      { id: "delivered", label: "Delivered" },
                      { id: "rejected", label: "Rejected" },
                    ],
                  },
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Update Order Status"}
                onSubmit={handleUpdateStatus}
              />
            </div>
          </div>
        </DialogContent>
      );
}

export default AdminOrderDetailsView