import React, { Fragment } from 'react'
import { LuChartNoAxesCombined, LuLayoutDashboard, LuShoppingBag, LuTruck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';



const adminSiderbarMenuItems = [
  {
    id : 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icons: <LuLayoutDashboard/>
  },
  {
    id : 'products',
    label: 'Products',
    path: '/admin/products',
    icons: <LuShoppingBag/>
  },
  {
    id : 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icons: <LuTruck/>
  },
]


function MenuItems({setOpen}){
  const navigate = useNavigate()
  return(
   <nav className="mt-8 flex-col flex gap-2">
    {
      adminSiderbarMenuItems.map(menuItem =><div 
      key={menuItem.id} 
      onClick={()=>{
        navigate(menuItem.path); 
        setOpen ? setOpen(false) : null;}}
      className='flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
        {menuItem.icons}
        <span>{menuItem.label}</span>
      </div>)
    }
  </nav>
)}

const AdminSidebar = ({open, setOpen}) => {

  const navigate = useNavigate()

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side= 'left' className ='w-64'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b'>
              <SheetTitle className = 'flex gap-2 mt-5 mb-5'>
                <LuChartNoAxesCombined size={30}/>
                <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen ={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
        <LuChartNoAxesCombined size={30}/>
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default AdminSidebar