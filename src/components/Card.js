import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Card = ({ step }) => {
    const { adminConfig, updateCompleteComponents, getProgress, setCurrentStep } =
        useContext(AppContext);
    const components = adminConfig[step] || [];
    const progress = getProgress();
    const navigate = useNavigate();

    const handleNext = () => {
        if (progress.completedComponents === progress.totalComponents) {
            setCurrentStep(step + 1);
            navigate(`/user-onboarding-${step + 2}`);
        }
    };

    return (
        <div>
            <h3>Step {step + 1}</h3>
            {components.map((component) => {
                const Component = React.lazy(() => import(`../components/${component}`));
                return (
                    <React.Suspense fallback={<div>Loading...</div>} key={component}>
                        <Component onComplete={() => updateCompleteComponents(component)} />
                    </React.Suspense>
                );
            })}
            <button
                onClick={handleNext}
                disabled={progress.completedComponents < progress.totalComponents}
            >
                Next
            </button>
        </div>
    );
};

export default Card;


// import React, { useContext } from 'react';
// import { AppContext } from '../context/ContextProvider';
// import { useNavigate } from 'react-router-dom';
//
// const Card = () => {
//     const { completeComponents, adminConfig, stepsInThisStep, stepsCompleteForThisStep, isAllComplete, currentStep, currentUser, currentIndex, prettyUrl } = useContext(AppContext);
//     const components = adminConfig[currentStep] || [];
//     const navigate = useNavigate();
//
//     // lets get how many steps we have for this card
//     //console.log('[Card] currentStep / stepsThisStep:', currentStep, ' / ', stepsInThisStep);
//     // get current step
//     console.log('[Card] adminConfig[currentStep]: ', currentStep); // what component by name in an array
//     console.log('[Card] stepsCompleteForThisStep: ', stepsCompleteForThisStep);
//     //lets get the total number of completed components for this step
//     //const completeComponentsForThisStep = completeComponents.length;
//     // and the currentStep of this Step
//     // currentStep of AdminConfig[currentStep].length
//     //const stepProgress = currentStep + 1
//
//     //console.log('[Card] stepProgress: ', stepProgress);
//     const handleNext = () => {
//         // Check if there are more components to display
//         // if (currentIndex < components.length - 1) {
//         //     // If there are more components, navigate to the next one
//         //     navigate(prettyUrl(components[currentIndex + 1]));
//         //     console.log('[Card] handleNext: ', prettyUrl(components[currentIndex + 1]));
//         // } else {
//         //     // If there are no more components, navigate to the next step
//         //
//         // }
//         const newUrl = prettyUrl;
//         console.log('[Card] newUrl', newUrl);
//         navigate(newUrl);
//     };
//
//     return (
//         <div>
//
//             {/*<div>*/}
//             {/*    <h4> {currentUser.email}, you have completed {completeComponentsForThisStep} of {stepsInThisStep} Forms for Step {stepProgress} </h4>*/}
//             {/*</div>*/}
//             {components.map((component) => {
//                 const Component = React.lazy(() => import(`../components/${component}`));
//                 return (
//                     <React.Suspense fallback={<div>Loading...</div>} key={component}>
//                         <Component />
//                     </React.Suspense>
//                 );
//             })}
//             <button onClick={handleNext}>Next</button>
//         </div>
//     );
// };
//
// export default Card;
//
//
//
//
//
//
//
