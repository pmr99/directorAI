import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { BiSolidError } from "react-icons/bi";
import { processImagePrompt } from './endpoint';
const JSON5 = require('json5')

const welcomeHeaderText = "Welcome to DirectorAI."
const welcomeBodyText = "Enter your business details or campaign idea, and DirectorAI will generate a tailored marketing video concept! Utilizing chatGPT and DALL·E-2, I've prompt engineered short-form video marketing principles to produce practical concepts that can be used as a starting point for the ideation process."
const errorText = "Unfortunately, we can't load the information you are requesting, please contact the developer."
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.REACT_APP_APIKEY, dangerouslyAllowBrowser: true });

function Datafetcher({ inputData }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const completion = await openai.chat.completions.create({
                    messages: [{ role: "system", content: inputData }],
                    model: "gpt-3.5-turbo-1106",
                    response_format: { type: "json_object" }
                });
                setData(completion.choices[0].message.content);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                <LoadingState />
            </div>
        )
    }

    if (error) {
        return (
            <ErrorState />
        )
    }

    return (
        <DisplayCards jsonOutput= {data}/>
    )
}

function WelcomeInformation() {
    return (
        <div style={{ marginTop: "24%", marginLeft: "20%", marginRight: "20%", marginBottom: "24%"}}>
            <h1 style={{ textAlign: "center", marginBottom: "16px" }}> {welcomeHeaderText}</h1>
            <p style={{ textAlign: "center" }}> {welcomeBodyText}</p>
        </div>
    )
}


function LoadingState() {
    return (
        <div className = "text-center" style={{ marginTop: "24%", marginBottom: "24%", marginLeft: "20%", marginRight: "20%" }}>
            <Spinner animation="border" style = {{margin: "auto"}}/>
            <h2 style={{ textAlign: "center" }}> DirectorAI is thinking... </h2>
        </div>
    )
}

function ErrorState() {
    return (
        <div style={{ marginTop: "24%", marginBottom: "24%", marginLeft: "20%", marginRight: "20%" }}>
            <h1 style={{ textAlign: "center" }}> {errorText} </h1>
        </div>
    )
}

function DisplayCards({ jsonOutput }) {
    var jsonOutput = JSON5.parse(jsonOutput)
    console.log(jsonOutput)
    return (
        <Container>
            <h1 style = {{textAlign: "center", margin: "16px"}}> Title: {jsonOutput.tagline}</h1>
            <p> {jsonOutput.overview}</p>
            <div style={{ display: "flex", justifyContent : "space-evenly", flexWrap: "wrap" }}>
                {jsonOutput.scenes.map((scene, index) =>
                    <IndividualCard description={scene.description} title={scene.title} imgPrompt={scene.imagePrompt} index = {index} />
                )}
            </div>
        </Container>)
}

function CardIssues({content, isLoading}) {
    return (
        <div className = "text-center" style = {{ height: "300px", backgroundColor: "lightgrey", display: "grid", alignItems: "center"}}>
            {isLoading? <Spinner animation="border" style = {{margin: "auto", height: "100px"}}/> : <BiSolidError size={140} style = {{margin: "auto" }}/>}
            <p style = {{textAlign: "center", margin: "auto", padding: "8px"}}> {content} </p>
        </div>
    )
}

function IndividualCard({ imgPrompt, description, title, index}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imgURL, setimgURL] = useState("") 
    imgPrompt = processImagePrompt(imgPrompt)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await openai.images.generate({
                    model: "dall-e-2",
                    prompt: imgPrompt,
                    n: 1,
                    size: '256x256',
                });
                console.log(response.data)
                setimgURL(response.data[0].url);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        async function fetchDelayedData() {
            setTimeout(() => {
                fetchData();
            }, 60000);
        }

        async function fetchSuperDelayedData() {
            setTimeout(() => {
                fetchData();
            }, 120000);
        }
        if (index <2) {
            fetchData();
        }
        else if (index>4) {
            fetchSuperDelayedData()
        }
        else {
            fetchDelayedData();
        }
    }, []);
    return (
        <Card style={{ width: "20%", marginBottom: "16px", minWidth: "300px" }}>
            {error ? <CardIssues content = "Error Retrieving Image from Server:(" isLoading = {false}/>: loading ? <CardIssues content = "Loading! This will take a while due to API call limits." isLoading = {true}/>: <Card.Img variant="top" src = {imgURL} /> }
            <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export { WelcomeInformation, Datafetcher }