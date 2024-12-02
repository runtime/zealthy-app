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


