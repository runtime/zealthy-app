import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Card = () => {
    const { completeComponents, adminConfig, currentStep, prettyUrl } = useContext(AppContext);
    const components = adminConfig[currentStep] || [];
    const navigate = useNavigate();

    // lets get how many steps we have for this card
    const totalSteps = adminConfig.length;
    console.log('[Card] totalSteps:', totalSteps);
    // get current step
    console.log('[Card] currentStep: ', currentStep); // what component by name in an array
    //lets get the total number of completed components for this step
    const completeComponentsForThisStep = completeComponents.length;
    // and the currentStep of this Step
    // currentStep of AdminConfig[currentStep].length
    const stepProgress = currentStep + 1


    const handleNext = () => {
        //todo implement the get url
        console.log('[Card] handleNext');
        navigate(prettyUrl); // Dynamically navigate to the next step
    };

    return (
        <div>

            <div>
                <h4> You have completed {completeComponentsForThisStep} of {totalSteps} Forms for Step {stepProgress} </h4>
            </div>
            {components.map((component) => {
                const Component = React.lazy(() => import(`../components/${component}`));
                return (
                    <React.Suspense fallback={<div>Loading...</div>} key={component}>
                        <Component />
                    </React.Suspense>
                );
            })}
            {/*<button onClick={handleNext}>Next</button>*/}
        </div>
    );
};

export default Card;







