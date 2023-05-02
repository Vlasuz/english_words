import React, {useEffect, useState} from "react";
import './components/cardsList';
import CardsList from "./components/cardsList";

function App() {

    const [words, setWords] = useState([
    ])

    const [englishWord, setEnglishWord] = useState('')
    const [translateWord, setTranslateWord] = useState('')
    const [isHiddenWords, setIsHiddenWords] = useState(false)

    const handleCreate = (e) => {
        e.preventDefault()

        if(englishWord && translateWord) {
            setWords(prev => [...prev, {[englishWord]: translateWord}])

            setEnglishWord('')
            setTranslateWord('')
        }

    }

    const handleRandom = () => {
        setWords(prev => [...prev.sort( ()=>Math.random()-0.5 )])
    }

    const handleHidden = () => {
        setIsHiddenWords(prev => !prev)
    }

    const handleTanos = () => {
        setWords([])
    }

    return (
        <div className="App">
            <h1 className={"text-center font-bold text-3xl mb-6 mt-2"}>Рандомайзер слов для быстрого изучения</h1>

            <div className="inner flex max-w-4xl mx-auto m-5 ">
                <CardsList words={words} setWords={setWords} isHiddenWords={isHiddenWords}/>
                <div className="buttons sticky top-2 h-fit">
                    <button className={"h-fit px-6 py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3 mb-2"} onClick={handleRandom}>Рандом слов</button>
                    <button className={"h-fit px-6 py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3 mb-2"} onClick={handleHidden}>
                        {
                            isHiddenWords ? "Показать перевод" : "Спрятать перевод"
                        }
                    </button>
                </div>
            </div>

            <form action="#" onSubmit={handleCreate} className={"max-w-2xl mx-auto mt-8 flex items-end"}>
                <label className={"block"}>
                    <span className="block text-sm font-medium text-slate-700">Английское слово</span>
                    <input onChange={e => setEnglishWord(e.target.value)} value={englishWord} type="text"
                           className={"border-2 px-3 py-1 rounded-md"}/>
                </label>
                <label className={"block ml-3"}>
                    <span className="block text-sm font-medium text-slate-700">Перевод слова</span>
                    <input onChange={e => setTranslateWord(e.target.value)} value={translateWord} type="text"
                           className={"border-2 px-3 py-1 rounded-md"}/>
                </label>
                <button className={"px-6 h-fit py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3"}>Создать</button>
            </form>

            <div className="block max-w-2xl mx-auto mt-5">
                <button className={"px-6 h-fit py-2 bg-cyan-900 outline-0 rounded-md text-white"} onClick={handleTanos}>Удалить все слова</button>
            </div>
        </div>
    );
}

export default App;
