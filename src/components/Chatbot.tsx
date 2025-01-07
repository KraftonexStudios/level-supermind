import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -10 }
}

const loadingVariants = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity
    }
  }
}

const headerVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

const MessageCard = styled.div`
  text-align: left;
  line-height: 1.6;
`

const Section = styled.div`
  margin: 1.5rem 0;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`

const Th = styled.th`
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 1rem 0;
`

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
  
`
const formatMessage = (content) => {
  if (typeof content !== 'string') return content;

  const sections = content.split('**').filter(Boolean);
  
  return (
    <MessageCard>
      {sections.map((section, idx) => {
        if (section.includes('|')) {
          // Parse table
          const rows = section.split('\n').filter(row => row.includes('|'));
          return (
            <Section key={idx}>
              {rows[0].includes('###') && (
                <Title>{rows[0].replace('###', '').trim()}</Title>
              )}
              <Table>
                <thead>
                  <tr>
                    {rows[1].split('|').filter(Boolean).map((cell, i) => (
                      <Th key={i}>{cell.trim()}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(3).map((row, i) => (
                    <tr key={i}>
                      {row.split('|').filter(Boolean).map((cell, j) => (
                        <Td key={j}>{cell.trim()}</Td>
                      ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Section>
            );
          } else if (section.includes('*')) {
            // Parse list
            return (
              <Section key={idx}>
                <List>
                  {section.split('*').filter(Boolean).map((item, i) => (
                    <li key={i}>{item.trim()}</li>
                  ))}
                </List>
              </Section>
            );
          } else {
            // Parse title or text
            return (
              <Section key={idx}>
                <Title>{section.trim()}</Title>
              </Section>
            );
          }
        })}
      </MessageCard>
    );
  };

class LangflowClient {
  constructor(applicationToken) {
    this.baseURL = ''  // Empty since we're using proxy
    this.applicationToken = applicationToken
  }

  async post(endpoint, body, headers = {}) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`
    headers["Content-Type"] = "application/json"
    
    const url = `${this.baseURL}${endpoint}`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
      
      return response.json()
    } catch (error) {
      console.error('Request Error:', error)
      throw error
    }
  }

  async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowIdOrName}`
    return this.post(endpoint, { 
      input_value: inputValue, 
      input_type: inputType, 
      output_type: outputType, 
      tweaks: tweaks 
    })
  }
}
export const Chatbot = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  const langflowClient = new LangflowClient(
    'AstraCS:KfiefWKjkEkKIwLdIHOXJJcj:e1dff3b852eebcd28d815b07fbcfb0c53ced75336b5545823d6d0cc53617bcf9'
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setMessages(prev => [...prev, { type: 'user', content: input }])

    const flowIdOrName = '10b3623e-d9f1-4e42-b45a-c954c3287b34'
    const langflowId = '9a646334-f77b-44ee-80f1-81b03a8898d2'
    
    const tweaks = {
      "ChatInput-jhUJG": {},
      "ParseData-MI18w": {},
      "Prompt-FnjBo": {},
      "ChatOutput-ieOxq": {},
      "AstraDB-xVVKg": {},
      "File-lwiLu": {},
      "SplitText-G9Q1U": {},
      "AstraDB-pFO8J": {},
      "GroqModel-1gFzu": {}
    }

    try {
      const response = await langflowClient.runFlow(
        flowIdOrName,
        langflowId,
        input,
        'chat',
        'chat',
        tweaks
      )

      if (response && response.outputs) {
        const output = response.outputs[0].outputs[0].outputs.message
        setMessages(prev => [...prev, { type: 'bot', content: output.message.text }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { type: 'error', content: 'Failed to get response' }])
    } finally {
      setLoading(false)
      setInput('')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-gray-100 p-4 flex items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="container max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <motion.div 
          variants={headerVariants}
          initial="initial"
          animate="animate"
          className="bg-indigo-600 p-4"
        >
          <h1 className="text-xl font-bold text-white">AI Assistant</h1>
        </motion.div>

        <div className="h-[600px] overflow-y-auto p-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.type === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-white shadow-md rounded-bl-none'
                  }`}
                >
                  {formatMessage(msg.content)}
                </motion.div>
              </motion.div>
            ))}
            
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white shadow-md rounded-2xl rounded-bl-none p-4">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        variants={loadingVariants}
                        animate="animate"
                        style={{ animationDelay: `${i * 0.2}s` }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
  
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 border-t border-gray-200 bg-white"
          >
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Type your message..."
                disabled={loading}
              />
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
