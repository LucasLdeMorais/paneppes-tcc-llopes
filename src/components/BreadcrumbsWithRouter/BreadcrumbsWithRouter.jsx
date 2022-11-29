
import { Link, Breadcrumbs } from '@mui/material';
import React from 'react';
import { NavigateNext } from '@mui/icons-material';

const BreadcrumbsWithRouter = ({links, history, className, style}) => {
    return <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} style={style} className={className}>
        {
            links.map( (link,index) => {
                return <Link 
                    component='h2' 
                    variant="subtitle1" 
                    underline="hover" 
                    color="inherit" 
                    href={link.endPagina}
                    onClick={() => history.push(link.endPagina)}
                    style={{cursor: "pointer"}} key={index}>
                    {link.texto}
                </Link>
            })
        }
    </Breadcrumbs>
}

export default BreadcrumbsWithRouter;