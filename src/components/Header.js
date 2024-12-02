// // In any child component
// import React, {useContext} from 'react';
// import { useTheme } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import {AppContext} from "../context/ContextProvider";
//
// const Header = () => {
//     const theme = useTheme();
//     const { currentUser } = useContext(AppContext);
//     const navigate = useNavigate();
//
//     let content = <div>
//         loading....
//
//     </div>
//
//
//     if (currentUser) {
//         content = (
//             <div style={{backgroundColor: theme.palette.background.default}}>
//                 <h3 style={{color: theme.palette.primary.main}}>Hello {currentUser.email}!</h3>
//                 <Button variant="contained" color="secondary" onClick={() => navigate('/admin')}>
//                 Admin
//                 </Button>
//             </div>
//         );
//     } else {
//         content = (
//             <div style={{backgroundColor: theme.palette.background.default}}>
//                 <h3 style={{color: theme.palette.primary.main}}>{currentUser.email}!</h3>
//             </div>
//         );
//     }
//
//     return (
//         content
//     );
// };
//
// export default Header;
