import React from 'react';

function BuilderResult(props){

    const characterWeapon = props.characterWeapon;
    const artifact1 = props.artifact1;
    const artifact2 = props.artifact2;
    const artifact3 = props.artifact3;
    const artifact4 = props.artifact4;
    const artifact5 = props.artifact5;

    React.useEffect(() => {
        const payload = {
            character_weapon: characterWeapon,
            artifact1: artifact1,
            artifact2: artifact2,
            artifact3: artifact3,
            artifact4: artifact4,
            artifact5: artifact5,
        }
        console.log(payload);
    }, [])

    return (
        <div>
            {'SOON!!!'}
        </div>
    )
}

export default BuilderResult;