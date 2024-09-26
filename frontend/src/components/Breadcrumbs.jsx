import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
// import NavigateNextIcon from '@mui/icons/NavigateNext';

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs separator={<i className="fa-solid text-white  fa-angle-right"></i>} aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const last = index === pathnames.length - 1;
        return last ? (
          <Typography key={to} className='text-white fw-600 pointer' style={{textTransform: 'capitalize'}}>
            {value}
          </Typography>
        ) : (
          <Link key={to} to={to} className='text-white fw-600 pointer' style={{textTransform: 'capitalize'}}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
