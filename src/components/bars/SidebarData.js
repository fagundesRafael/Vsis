import React from "react";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";

export const SidebarData = [
    {
        title: 'Início',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Inserir',
        path: '/inserir',
        icon: <AiIcons.AiOutlineFileAdd/>,
        cName: 'nav-text',
    },
    {
        title: 'Acompanhar',
        path: '/acompanhar',
        icon: <FcIcons.FcInspection/>,
        cName: 'nav-text'
    },
    {
        title: 'Estatística',
        path: '/estatistica',
        icon: <IoIcons.IoIosStats/>,
        cName: 'nav-text'
    },
    {
        title: 'Notificações',
        path: '/notificacoes',
        icon: <IoIcons.IoIosNotificationsOutline/>,
        cName: 'nav-text'
    },
    {
        title: 'Informações',
        path: '/info',
        icon: <AiIcons.AiOutlineInfoCircle/>,
        cName: 'nav-text'
    },
]