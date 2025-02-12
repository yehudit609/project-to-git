import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';
import { useGetAllCategoriesQuery } from '../features/manager/ManagerCategoryApiSlice';

export default function Navbar(props) {
    const { isAdmin, name ,isUser} = useAuth();    
    const { data: categories, isSuccess } = useGetAllCategoriesQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const AdminItems = [
        { label: 'דף הבית', url: '/' },
        { label: 'מוצרים', url: '/Product' },
        { label: 'משתמשים', url: '/User' },
        { label: 'קטגוריות', url: '/Category' },
        { label: 'הזמנות', url: '/Order' },
        {
            label: 'לאיזור האישי',
            items: [
                { label: 'התחברות', url: './Login' },
                { separator: true },
                {
                    label: 'התנתקות',
                    command: () => {
                        dispatch(removeToken());
                        navigate("/");
                    },
                }
            ]
        }
    ];

    const UserItems = [
        { label: 'דף הבית', url: '/' },
        { label: 'ההזמנות שלי', url: '/Orders' },
        {
            label: 'חנות',
            items: isSuccess ? categories.map(category => ({
                label: category.name,
                url: `/Chanut/${(category.name)}`//encodeURIComponent - make the path valid
            })) : []
        },
        {
            label: 'לאיזור האישי',
            items: [
                { label: 'התחברות', url: '/Login' },
                { label: 'הרשמה', url: '/Register' },
                { separator: true },
                {
                    label: 'התנתקות',
                    command: () => {
                        dispatch(removeToken());
                        navigate("/");
                    },
                }
            ]
        },
        { icon: 'pi pi-cart-plus', url: '/BasketDesign' }
    ];
    const UnregistereduserItems = [
        { label: 'דף הבית', url: '/' },
        {
            label: 'חנות',
            items: isSuccess ? categories.map(category => ({
                label: category.name,
                url: `/Chanut/${(category.name)}`//encodeURIComponent - make the path valid
            })) : []
        },
        {
            label: 'לאיזור האישי',
            items: [
                { label: 'התחברות', url: '/Login' },
                { label: 'הרשמה', url: '/Register' },
                { separator: true },
                {
                    label: 'התנתקות',
                    command: () => {
                        dispatch(removeToken());
                        navigate("/");
                    },
                }
            ]
        },
        { icon: 'pi pi-cart-plus', url: '/BasketDesign' }
    ];
    const items1 = isUser?  UserItems : UnregistereduserItems
    const items = isAdmin ? AdminItems : items1;
    const start = <img alt="logo" src={`http://localhost:7777/uploads/newlogo.jpg`} height="60" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">
        </div>
    );

    return (
        <div className="card" style={{ position: 'sticky', top: 15, zIndex: 10000 }}>
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}