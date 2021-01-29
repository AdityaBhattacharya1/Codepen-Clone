import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'

// CodeMirror Add-ons
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/display/fullscreen'
import { Controlled as ControlledEditor } from 'react-codemirror2'

// Expand-Compress buttons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

function Editor(props) {
    const { language, displayName, value, onChange } = props

    const [open, setOpen] = useState(true)

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            <div className="editor-title">
                {displayName}
                <button
                    onClick={() => setOpen((prevOpen) => !prevOpen)}
                    type="button"
                    className="expand-collapse-btn"
                >
                    <FontAwesomeIcon
                        icon={open ? faCompressAlt : faExpandAlt}
                    />
                </button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    lineNumbers: true,
                    theme: 'material-ocean',
                    autoCloseBrackets: true,
                    matchBrackets: true,
                    highlightNonMatching: true,
                    autoCloseTags: true,
                    fullScreen: true, 
                }}
            />
        </div>
    )
}

export default Editor
