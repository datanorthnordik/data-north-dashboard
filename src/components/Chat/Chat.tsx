import { useNavigate } from "react-router-dom"
import AppToolbar from "../AppToolbar/AppToolbar"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { triggerGemini } from "../../services/dashboard"
import { Backdrop, CircularProgress } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import "./chat.scss"
import LoadingRobot from "../../utils/Loader";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useSpeechSynthesis } from 'react-speech-kit';
import PauseIcon from '@mui/icons-material/Pause';
import {marked} from 'marked';


interface ChatProps {
    handleDrawerToggle?: () => void
}

const Chat = (props: ChatProps) => {
    const { speak, voices, cancel, speaking } = useSpeechSynthesis();
    const [question, setQuestion] = useState('')
    const [qnsList, setQnsList] = useState<any[]>([])
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const lastQuestionRef = useRef<any>(null);
    const containerRef = useRef<any>(null);
    const {handleDrawerToggle} = props
    const [selectedVoice, setSelectedVoice] = useState<any>(null)
    const [selectedIndex, setSelectedIndex] = useState<any>(null)


    useEffect(()=>{
        if(!speaking){
            setSelectedIndex(null)
        }
    },[speaking])

    useEffect(()=>{
        if(voices.length > 0){
            setSelectedVoice(voices[2])
        }
    }, [voices])

    const handleChange = (event: any) => {
        setQuestion(event.target.value);
    };

    const askGemini = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const result = await triggerGemini(question)
            let list = [...qnsList]
            list.push({ question, answer: result.answer })
            setQnsList(list)
            setQuestion('')
            setIsLoading(false)
            if (lastQuestionRef.current) {
                setTimeout(() => {
                    const containerTop = containerRef.current.getBoundingClientRect().top;
                    const itemTop = lastQuestionRef.current.getBoundingClientRect().top;
                    const scrollOffset = itemTop - containerTop;

                    containerRef.current.scrollTo({
                        top: scrollOffset,
                        behavior: 'smooth',
                    });
                    lastQuestionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }

    const handleAudio = async (answer:any, index: number) =>{
        if(!speaking){
            const text = await marked(answer)
            speak({text, voice: selectedVoice})
            setSelectedIndex(index)
        } 
    }
    
    return (
        <>
            {isLoading && <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <LoadingRobot/>
            </Backdrop>}
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className="chat" style={{ position: 'relative' }}>
                <div className="chat_wrapper" ref={containerRef}>
                    {qnsList.map((qns, index) => (
                        <div className="chat_item" ref={index === qnsList.length - 1 ? lastQuestionRef : null}>
                            <div className="chat_item_question">
                                {qns.question}
                            </div>
                            <div className="chat_item_answer">
                                <div className="chat_item_answer_text">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                    >
                                        {qns.answer}
                                    </ReactMarkdown>
                                </div>
                                {selectedIndex == index ?  <PauseIcon className="chat_item_answer_icon" onClick={()=> cancel()}/> :
                                <VolumeUpIcon className="chat_item_answer_icon" onClick={()=> handleAudio(qns.answer,index)}/>}
                            </div>
                        </div>))}
                </div>
                <div className="chat_input">
                    <SendIcon onClick={handleSubmit} className="chat_input_icon"/>
                    <input placeholder="Ask me anything..."
                        value={question}
                        onKeyDown={(event) => askGemini(event)}
                        onChange={(event) => handleChange(event)}
                    />
                </div>
            </div>
        </>
    )
}

export default Chat