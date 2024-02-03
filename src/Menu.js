import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap';
import { useState } from "react";
import {processInput} from './endpoint';

const menuTitle = "Ask DirectorAI!"
const businessDescriptionTitle = "Describe your business/marketing campaign in detail"
const businessDescriptionTitlePlaceholder = "I am running an online Bakery based in Berkeley, specializing in red velvet cupcakes...."
const targetAudience = "Who is your target audience?"
const targetAudiencePlaceholder = "College students, people looking to cater for special events like birthays etc...."
const highlight = "Any products/features/information you want to highlight in the marketing video?"
const highlightPlaceholder = "My red velvet cake is sugar free! 15% off for orders more than $50!"
const tone = "Describe the tone of the video?"
const tonePlaceholder = "light hearted. My brand colors are red and pink...."

function Menu({ whenClickedSubmit }) {
    const [businessDescriptionData, setBusinessDescription] = useState("")
    const [targetAudienceData, setTargetAudience] = useState("")
    const [highlightData, setHighlight] = useState("")
    const [toneData, setTone] = useState("")
    return (
        <div className = "menu">
            <h3 style = {{textAlign: "center"}}> {menuTitle} </h3>
                <Form data-bs-theme="dark">
                    <SingleForm title={businessDescriptionTitle} placeholder={businessDescriptionTitlePlaceholder} change={setBusinessDescription} />
                    <SingleForm title={targetAudience} placeholder={targetAudiencePlaceholder} change={setTargetAudience} />
                    <SingleForm title={highlight} placeholder={highlightPlaceholder} change={setHighlight} />
                    <SingleForm title={tone} placeholder={tonePlaceholder} change={setTone} />
                </Form>
                    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
                        <Button onClick={() => whenClickedSubmit(processInput([businessDescriptionData, targetAudienceData, highlightData, toneData]))} centered variant="primary" type="button" style={{ width: "50%" }}>
                            Create my Video Concept!
                        </Button>
                    </div>
                

        </div>
    )
}

function SingleForm({ title, placeholder, change }) {
    const handleChange = (e) => {
        e.preventDefault(); // prevent the default action
        change(e.target.value); // set name to e.target.value (event)
    };
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ color: 'white', paddingTop: "1%" }}> {title}</Form.Label>
            <Form.Control as="textarea" type="textarea" rows={3} placeholder={placeholder} onChange={handleChange} />
        </Form.Group>

    )
}


export default Menu