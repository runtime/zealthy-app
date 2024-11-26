import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Card = ({ step }) => {
    const { adminConfig, updateStep } = useContext(AppContext);
    const components = adminConfig[step - 2] || [];
    const navigate = useNavigate();

    const handleNext = () => {
        updateStep(Number(step) + 1); // Ensure step is a number
        navigate(`/create-account-${Number(step) + 1}`); // Dynamically navigate to the next step
    };

    return (
        <div>
            {components.map((component) => {
                const Component = React.lazy(() => import(`../components/${component}`));
                return (
                    <React.Suspense fallback={<div>Loading...</div>} key={component}>
                        <Component />
                    </React.Suspense>
                );
            })}
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Card;




















// import React, { useContext } from 'react';
// import { AppContext } from '../context/ContextProvider';
//
// const Card = ({ step }) => {
//     const { adminConfig } = useContext(AppContext);
//     const components = adminConfig[step - 2] || []; // Adjust step index to match admin config
//
//     return (
//         <div>
//             {components.map((component) => {
//                 const Component = React.lazy(() => import(`../components/${component}`));
//                 return (
//                     <React.Suspense fallback={<div>Loading...</div>} key={component}>
//                         <Component />
//                     </React.Suspense>
//                 );
//             })}
//         </div>
//     );
// };
//
// export default Card;
