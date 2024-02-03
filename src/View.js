import Menu from './Menu';
import {WelcomeInformation, Datafetcher} from './Output';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

function View() {
    const [isWelcomePage, setIsWelcomePage] = useState(true)
    const [inputData, setInputData] = useState([])
    const whenClickedSubmit = (data) => {
        setInputData(data);
        setIsWelcomePage(false);

    }
    return (
        <div>
            <Header/>
            <div className = "flexbox-wrapper" >
                <Menu whenClickedSubmit = {whenClickedSubmit}/>
                <div className = "content">
                    {isWelcomePage? <WelcomeInformation/> : <Datafetcher inputData = {inputData}/>}
                </div>
            </div>
        </div>
    );
}


export default View