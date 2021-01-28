import React, { useState, useEffect } from 'react'
import Editor from './Editor'
import UseLocalStorage from '../hooks/UseLocalStorage'
import Fullscreen from 'fullscreen-react'

function App() {
    const [html, setHtml] = UseLocalStorage('html', '')
    const [css, setCss] = UseLocalStorage('css', '')
    const [javascript, setJavascript] = UseLocalStorage('javascript', '')
    const [srcDoc, setSrcDoc] = useState('')
    const [isEnter, setIsEnter] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `)
        }, 250)

        return () => clearTimeout(timeout)
    }, [html, css, javascript])

    return (
        <>
            <div className="error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h1>
                    Sorry, but your screen size is too small. Try switching to a
                    screen with larger screen size
                </h1>
            </div>
            <div className="norm">
                <div className="pane top-pane">
                    <Editor
                        language="xml"
                        displayName="HTML"
                        value={html}
                        onChange={setHtml}
                    />
                    <Editor
                        language="css"
                        displayName="CSS"
                        value={css}
                        onChange={setCss}
                    />
                    <Editor
                        language="javascript"
                        displayName="JavaScript"
                        value={javascript}
                        onChange={setJavascript}
                    />
                </div>
                <button
                    onClick={() => {
                        setIsEnter(true)
                    }}
                    className="fullscreen-toggler"
                >
                    Go Fullscreen
                </button>
                <div className="pane">
                    <Fullscreen isEnter={isEnter} onChange={setIsEnter}>
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            className="full-screenable-node"
                        />
                    </Fullscreen>
                </div>
            </div>
        </>
    )
}

export default App
