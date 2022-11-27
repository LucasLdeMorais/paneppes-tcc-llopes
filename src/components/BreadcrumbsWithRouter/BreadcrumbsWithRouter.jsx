
import { Link, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const BreadcrumbsWithRouter = ({links, history}) => {
    return <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>} style={{marginBottom:20, marginTop:25}}>
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