import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../nursee.png'
import log2 from '../nurse-removebg-preview.png'

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: '#363636',
  padding: theme.spacing(1),

}));
const backend = process.env.REACT_APP_BACKEND_URL;
const micro = process.env.REACT_APP_MICROSERVICE;
export default function ChatWindow() {
 
  
  const [messages, setMessages] = React.useState([])
 
  const [sending,setSend] = React.useState(0)
 
  const handlePromptChange = (e) => {
    setPrompt(e.target.value)
  }

  const [prompt, setPrompt] = React.useState("")
  const [switchView, setSwitchView] = React.useState(0)
  return (
    <div className='columns is-mobile is-multiline' style={{ height: "100vh" }}>
      <div className="column is-2-desktop is-4-mobile has-background-grey-darker">
        <div className="has-text-light has-text-centered" style={{ height: "100vh" }}>
          <Div className='is-size-5-desktop ' style={{ marginTop: "3vh" }}><b>MedMuni</b></Div>
          <Div className="is-size-7-mobile" style={{ marginTop: "3vh" }}>AI-powered medical chatbot
          </Div>
        </div>
      </div>
      
      {!switchView ?
        <div className="column" style={{ maxHeight: "100vh" }}>
          <div className="has-text-light has-text-centered" style={{ paddingTop: "30vh" }}>
            <h1 className="is-size-1-desktop is-size-3-mobile">Medical QA</h1>
            <input id="input-prompt" value={prompt} onChange={(e) => { handlePromptChange(e) }} className=" mt-5 input is-white has-background-black-ter is-medium mb-6 has-text-grey" style={{ width: "50%" }} type="text" placeholder="How may I help you?" />
            <button className='mt-5 button is-primary is-medium is-rounded has-text-black ml-4' onClick={async () => {
              setSend(1)
              setSwitchView(1)
              let data = new FormData()
              let query = JSON.parse(JSON.stringify(prompt))
              data.append("query", query)
              
              global.q = prompt
              setPrompt("")
              let res = await fetch(micro + "/qa", {
                method: 'POST',
                body: data
              })
              let arr = JSON.parse(JSON.stringify(messages))
              let res_json = await res.json()
              console.log(res_json);
              arr.push({ query, response: res_json.result });
              setMessages(arr)
              setSend(0)
            }}>
              <div>
              <img src={log2} alt="" width="70" height="90"/>
              </div>
              
              <ArrowForwardIcon />
            </button>
          </div>
        </div> :
        <div id="chat-window" className="column">

          <div id="chat-window" className="column">
            <div style={{ maxHeight: "86vh", overflowY: "scroll", paddingTop: "5vh", width: "105%", padding: 0, marginBottom: "11vh", marginTop: "3vh" }}>
              {messages.map((message) => {
                if (message.response != undefined) {
                  return (

                    <article class="message has-background-grey-darker" style={{ width: "50%", padding: "5px" }}>
                      {message.query && <div style={{ color: 'white', opacity: "0.5" }}>User Query: {message.query}</div>} {/* Display the user's query if available */}
                      <div style={{ color: 'white' }}>{message.response}</div>
                    </article>
                  )
                }
                else return null
              })}
            </div>
          </div>
          <div className="has-text-light has-text-centered" style={{ paddingTop: "3vh", width: "80%", position: "fixed", bottom: 0 }}>
            <input id="input-prompt" value={prompt} onChange={(e) => { handlePromptChange(e) }} style={{ width: "70%" }}
              className=" mt-5 input is-white has-background-black-ter is-medium mb-6 has-text-grey is-rounded"
              type="text" placeholder="Ask Anything ....." />
            {!sending?<><button className='mt-5 button is-primary is-medium is-rounded has-text-black ml-4' onClick={async () => {
              setSend(1)
              setSwitchView(1)
              let data = new FormData()
              let query = JSON.parse(JSON.stringify(prompt))
              data.append("query", query)
             
              global.q = prompt
              setPrompt("")
              let res = await fetch(micro + "/qa", {
                method: 'POST',
                body: data
              })
              let arr = JSON.parse(JSON.stringify(messages))
              let res_json = await res.json()
              arr.push({ query, response: res_json.result });
              setMessages(arr)
              setSend(0)
            }}>
               <div>
              <img src={log2} alt="" width="70" height="90"/>
              </div>
              <ArrowUpwardIcon />
            </button>
            <button className='mt-5 button is-primary is-medium is-rounded has-text-black ml-4' onClick={async () => {
              setSend(1)
              setSwitchView(0)
              setMessages([])
              
            }}>
             Home
            </button></>:<img src={logo} alt="" width="70" height="90"/>}
          </div>
        </div>}
    </div >
  )
}