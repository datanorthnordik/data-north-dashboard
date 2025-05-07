import { useNavigate } from "react-router-dom"
import AppToolbar from "../AppToolbar/AppToolbar"
import { useState } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { triggerGemini } from "../../services/dashboard"
import { Backdrop, CircularProgress } from "@mui/material"
import "./chat.scss"


interface ChatProps {

}

const Chat = (props: ChatProps) => {
    const [question, setQuestion] = useState('')
    const [qnsList, setQnsList] = useState<any[]>([])
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)



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
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }
    return (
        <>
            {isLoading && <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
            <AppToolbar />
            <div className="chat" style={{ position: 'relative' }}>
                <div className="chat_wrapper">
                    {qnsList.map(qns => (
                        <div className="chat_item">
                            <div className="chat_item_question">{qns.question}</div>
                            <div className="chat_item_answer">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                >
                                    {qns.answer}
                                </ReactMarkdown>
                            </div>
                        </div>))}
                </div>
                <div className="chat_input">
                    <input placeholder="ask me anything"
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