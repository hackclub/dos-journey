'use client';
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { Highlight, themes } from "prism-react-renderer"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

// reserved keywords when writing a snippet: 
// INPUT_TEXT:KEY:END creates a text input in the snippet that is referred to with the name 'KEY'
// INPUT_NUMBER:NUMBER:END creates a 
// INPUT_BOOLEAN:BOOLEAN:END is specifically for integers
// regex: (INPUT_TEXT|INPUT_NUMBER|INPUT_BOOLEAN):([^:]+):END

export default function CodeSnippet({ snippet, template }:{ snippet: string, template: string }) {
  // create template for input values (to prevent problems when nothing runs):
  const generateTemplate = () => {
    let inputTemplate: {[i: string]: string} = {};
    snippet.split('\n').forEach(line => {
      const regex = /'(INPUT_TEXT|INPUT_NUMBER|INPUT_BOOLEAN):([^:]+):END'/;
      const match = Array.from(regex.exec(line) || []);
  
      if (match.length === 0) return;
  
      if (match[0]) {
        const classifyDefaultValue = () => {
          switch(match[1] as ('INPUT_TEXT' | 'INPUT_NUMBER' | 'INPUT_BOOLEAN')) {
            case 'INPUT_TEXT':
              return '';
            case 'INPUT_NUMBER':
              return '0';
            case 'INPUT_BOOLEAN':
              return 'true';
          }
        }
        inputTemplate[match[2]] = classifyDefaultValue();
      }
    });
    return inputTemplate;
  }

  // the rest of the component code
  const [inputValues, setInputValues] = useState<{ [i: string] : string }>(generateTemplate());
  console.log('default template', generateTemplate());
  const [inputArray, setInputArray] = useState(Object.entries(inputValues));
  const [showOutput, setShowOutput] = useState(false); 

  const handleRunButton = () => {
    setInputArray(Object.entries(inputValues));
    setShowOutput(true);
  }

  useEffect(() => {
    const inputArray = Object.entries(inputValues);
    console.log(inputArray);
  }, [inputValues])

  return (
    <div className="w-full">
      <Highlight
        theme={themes.dracula}
        code={snippet}
        language="tsx"
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className="!my-2">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="flex">
                <span className="mr-3 min-w-[2ch] text-white/50">{i + 1}</span>
                <span className="inline whitespace-pre-wrap">
                  {line.map((token, key) => {
                    // console.log(token.content);
                    return (
                      <span key={key} {...getTokenProps({ token })}>
                        <EvaluatedToken token={token.content} inputValues={inputValues} setInputValues={setInputValues}/>
                      </span>
                    )
                  })}
                </span>
              </div>
            ))}
            <button className="p-2 bg-emerald-400/80 rounded-lg text-white flex w-full justify-center mt-4 active:translate-y-1 transition" onClick={handleRunButton}>
              &gt; Run
            </button>
          </pre>
        )}
      </Highlight>
      <div className="space-y-2">
        <Transition show={showOutput}
          enter="transition delay-400"
          enterFrom="-translate-y-6 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <div className="block p-4 bg-zinc-800 font-mono text-white rounded-lg">
            <div className="block text-sm text-white/80">Output</div>
            <div className="text-base">
                <CodeResult template={template} inputs={inputArray} />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

function EvaluatedToken({ token, inputValues, setInputValues }:{ token: string, inputValues: { [i: string] : string }, setInputValues: Dispatch<SetStateAction<{ [i: string] : string }>> }) {
  const [inputContent, setInputContent] = useState('');
  const regex = /'(INPUT_TEXT|INPUT_NUMBER|INPUT_BOOLEAN):([^:]+):END'/;
  // console.log('token:', token);
  const match = Array.from(regex.exec(token) || []);

  const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputContent(e.target.value);
    // console.log(e.target.value);

    const copy = inputValues;
    copy[match[2]] = e.target.value;
    
    setInputValues(copy);

    // console.log(copy);
  }

  // console.log(match);
  type SnippetElement = 'INPUT_TEXT' | 'INPUT_NUMBER' | 'INPUT_BOOLEAN';

  const variant: SnippetElement = match[1] as SnippetElement;
  console.log(match);

  const before = token.substring(0, token.indexOf(match[0]));
  const after = token.substring(token.indexOf(match[0]) + match[0]?.length);

  return (
    <div className="font-[inherit] inline">
      {before}
      {/* this ⬇️ checks for whether or not the input even exists */}
      {/* if the input is typed with the keyboard (text or number) it will create a text box */}
      {match.length > 0 && (variant !== 'INPUT_BOOLEAN') && (
        <input type={variant.substring(6).toLowerCase()} className={classNames({
          "h-fit border-b border-t-0 border-x-0 bg-transparent !border-[unset] active:outline-none focus:outline-none !ring-0 py-0 px-[1ch] overflow-visible": true,
          "min-w-[10ch] w-[10ch]": variant === 'INPUT_TEXT',
          "min-w-[5ch] w-[5ch]": variant === 'INPUT_NUMBER',
        })} style={{
          width: `${inputContent.length + 2}ch`,
          fontSize: 'inherit'
        }} onChange={onInputChange} />
      )}
      {match.length > 0 && (
        (variant === 'INPUT_BOOLEAN') && (
          <select onChange={onInputChange} className="border-0 active:border-0 active:outline-none focus:outline-none focus:border-0 bg-transparent">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        )
      )}
      {after}
    </div>
  )
}

function CodeResult({ template, inputs }:{ template: string, inputs: [string, string][] }) {

  useEffect(() => {
    console.log(inputs);
  }, [inputs])

  return (
    template.split('\n').map((l, index) => {
      let line = l;
      inputs.forEach(pair => {
        const [ref, value] = pair; // ref = the input name, ex NAME. value = the user's input at the time of running
        if (l.indexOf(ref) !== -1) {
          line = l.replaceAll(ref, value);
        }
      });
      return (
        <span className="block" key={index}>{line}</span>
      )
    })
  )
}