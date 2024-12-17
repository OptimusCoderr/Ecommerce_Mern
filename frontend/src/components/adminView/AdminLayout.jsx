import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="flex min-h-screen w-full">
        {/** admin sidebar */}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className ="flex flex-1 flex-col">
            {/** Admin Header */}
            <AdminHeader setOpen={setOpenSidebar}/>
            <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
             <Outlet />
            </main>
        </div>
    </div>
  )
}

export default 
AdminLayout