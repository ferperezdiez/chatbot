import { useEffect, useRef, useState } from 'react';
import './chatBot.css';
import Spinner from '../spinner/spinner';
import LogOut from '../Logout';
import { getData } from '../../utils/apiCall';

const ChatBot = () => {

  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight 
  }, [chat]);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChat(prevState => [...prevState, input]);
    setLoading(true);
    try{
      let response = await getData(input);
      setInput('');
      response[0].message.content && setChat(prevState => [...prevState, response[0].message.content]);
      ref.current.scrollTop = ref.current.scrollHeight;
      setLoading(false);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="chatbot">
      <div className='overflow'>
          <div ref={ref} className='chat-container'>
            {chat.map((entry, index) => {
              return (
                <div key={index} className={index%2 === 0 ? 'request-container': 'answer-container'}>
                  <h4 className={index%2 === 0 ? 'chatRequest': 'chatAnswer'}>{entry}</h4>
                </div>
              )
            })}
            {loading && (
            <div className="loader">
               <Spinner />
            </div>
            )}
          </div>
      </div>
        <form className='input-container' onSubmit={handleSubmit}>
          <input className='input' value={input} onChange={handleChangeInput} type="text" placeholder='write a message'/>
          <div className='divider'/>
          <button className='button'>SEND</button>
        </form>
        <div className="logout">
          <LogOut className="logout-button"/>
        </div >
      </div>
  );
};

export default ChatBot;
