import { useState, useEffect } from 'react';
import './PopupForm.css';

const PopupForm = ({createMember, close, member, title}) => {
    const [formVals, setFormVals] = useState({favoriteColor: 'red'});
    const [error, setError] = useState("");

    useEffect(() => {
        if(member) {
            if(!member.favoriteColor) setFormVals({...member, favoriteColor: 'red'});
            else setFormVals(member)
        }
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if(Object.keys(formVals).length < 6 || !Object.values(formVals).every(v => v)) {
            setError("Missing inputs")
            return; 
        }

        if(!await createMember(formVals)) 
            setError("Failed creating member");
    }

    const updateState = (e, field) => setFormVals({...formVals, [field]: e.target.value});
    const getState = (field) => formVals[field] || "";


    return (
        <form onSubmit={handleSubmit} >
            <div className="w-full inline">
                <h1 className="form-title"><span>{title ? title: "Create Teammate"}</span><button onClick={close} className="close fr">X</button></h1>
            </div>

            
            {error && <h2 className="error">{error}</h2>}

            <div className="w-full">
                <input type="text" placeholder="First Name" className="half-input fl"  value={getState('firstName')} onChange={e => updateState(e, 'firstName')} />
                <input type="text" placeholder="Last Name" className="half-input fr" value={getState('lastName')} onChange={e => updateState(e, 'lastName')}/>
            </div>

            <input type="text" placeholder="Title" value={getState('title')} onChange={e => updateState(e, 'title')} />
            <textarea placeholder="Story" value={getState('story')} onChange={e => updateState(e, 'story')} />
            <select value={getState('favoriteColor')} onChange={e => updateState(e, 'favoriteColor')}>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
            </select>
            
            <input type="text" placeholder="Photo URL" value={getState('photoUrl')} onChange={e => updateState(e, 'photoUrl')} />
            {getState("photoUrl") &&
            <div>
                <h3>Preview Image: </h3>    
                <img className="preview" src={getState("photoUrl")} />
            </div>}


            <input type="submit" value="Save" /> 
            <button className="cancel" onClick={close}>Cancel</button>
        </form>
    )
};

export default PopupForm;