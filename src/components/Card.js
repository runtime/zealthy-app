import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Card = () => {
    const { currentUser, adminConfig, updateStep, currentStep, prettyUrl } = useContext(AppContext);
    const components = adminConfig[currentStep] || [];
    const navigate = useNavigate();

    // lets get how many steps we have
    const totalSteps = adminConfig.length;
    console.log('[Card] totalSteps:', totalSteps);
    // get current step
    console.log('[Card] currentStep: ', currentStep); // what component by name in an array
    //lets get the total number of completed components
    //const totalCompletedComponents = currentUser.completedComponents.length;

    const handleNext = () => {
        //todo implement the get url
        console.log('[Card] handleNext');
        navigate(prettyUrl); // Dynamically navigate to the next step
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
