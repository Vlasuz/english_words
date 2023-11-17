import React, {useEffect, useRef, useState} from "react";
import './components/cardsList';
import CardsList from "./components/cardsList";
import setCookie from "./functions/setCookie";
import getCookies from "./functions/getCookies";
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

function App() {

    const [words, setWords] = useState([
        {"starving": "ужасно голодный"}, {"cleaning_product": "чистящие средства"}, {"responsible": "ответственный"}, {"take_out": "изымать (деньги)"}, {"enormous": "огромный"}, {"filthy": "очень грязный"}, {"boiling": "жаркий, кипящий"}, {"intolerant": "нетерпимый"}, {"tap_water": "вода из под крана"}, {"cycling_trip": "поездка на велике"}, {"salmon": "лосось"}, {"freezing": "ледяной"}, {"raise": "собирать (фин средства)"}, {"save": "копить (деньги)"}, {"aubergine": "баклажан"}, {"terrified": "в ужасе, очень напуган"}, {"irresponsible": "безответственный"}, {"budget": "бюджет"}, {"grapes": "виноград"}, {"lamb": "мясо ягненка"}, {"bossy": "властный"}, {"exhausted": "истощен, изнурен"}, {"borrow": "брать в долг"}, {"beauty_treatment": "косметические процедуры"}, {"worth": "стоящий (how mush is you car worth)"}, {"sympathetic": "сочувствующий"}, {"invest": "вкладывать"}, {"contactless_payment": "бесконтактный расчет"}, {"tiny": "крошечный"}, {"afford": "позволить себе"}, {"insurance": "страховка"}, {"note": "банкнота"}, {"live_on": "жить на что то"}, {"mussels": "мидии"}, {"positive": "положительный, уверенный"}, {"unreliable": "ненадежный"}, {"self-confident": "уверенный в себе"}, {"salary": "заработная плата"}, {"furious": "яростный, бешеный"}, {"mortgage": "ипотека"}, {"tax": "налог"}, {"raspberries": "малина"}, {"loan": "ссуда, заем"}, {"charge": "назначать цену"}, {"moody": "унылый, угрюмый"}, {"beetroot": "свекла"}, {"pay_back": "вернуть деньги"}, {"fascinating": "очаровательный, обворожительный"}, {"peach": "персик"}, {"cash_machine": "банкомат"}, {"hilarious": "веселый"}, {"reliable": "надежный"}, {"courgette": "кабачок"}, {"owe": "Быть должным (you owe me 10$)"}, {"live_off": "жить за чей то счет"}, {"huge": "огромный, громадный"}, {"sensible": "благоразумный, разсудительный"}, {"insensitive": "безчувственный"}, {"delighted": "восхищенный, радостный"}, {"pear": "груша"}, {"scam": "мошенничество"}, {"lend": "одолжить"}, {"pork": "свинина"}, {"olive_oil": "оливковое масло"}, {"cabbage": "капуста"}, {"sensitive": "чувствительный"}, {"amazed": "удивлен"}, {"bill": "счет"}, {"unselfish": "бескорыстный"}, {"cost": "стоить"}, {"electricity_bill": "счет за электроэнергию"},
    ])

    const [englishWord, setEnglishWord] = useState('')
    const [translateWord, setTranslateWord] = useState('')
    const [isHiddenWords, setIsHiddenWords] = useState(false)
    const [isHiddenEngWords, setIsHiddenEngWords] = useState(false)
    const firstInput = useRef(null)

    const handleCreate = (e) => {
        e.preventDefault()

        if (englishWord && translateWord) {
            setWords(prev => [...prev, {[englishWord]: translateWord}])
            setCookie("en_words", JSON.stringify([...words, {[englishWord]: translateWord}]))

            firstInput.current.focus()

            setEnglishWord('')
            setTranslateWord('')
        }
    }

    useEffect(() => {
        if (!getCookies("en_words")) return

        setWords(JSON.parse(getCookies("en_words")))
    }, [])

    const handleRandom = () => {
        setWords(prev => [...prev.sort(() => Math.random() - 0.5)])
    }

    const handleTanos = () => {
        setWords([])
    }

    const handleFirstInput = (e) => {
        const value = e.target.value
        console.log(e.target.value)
        setEnglishWord(generate_url(value))
    }

    function generate_url(str) {
        var url = str.replace(/[\s]+/gi, '-');
        url = translit(url);
        url = url.replace(/[^0-9a-z_\-]+/gi, '').toLowerCase();
        return url;
    }

    function translit(str) {
        var ru = ("й-ц-у-к-е-н-г-ш-щ-з-ф-ы-в-а-п-р-о-л-д-я-ч-с-м-и-т-ь-ю").split("-")
        var en = ("q-w-e-r-t-y-u-i-o-p-a-s-d-f-g-h-j-k-l-z-x-c-v-b-n-m-.").split("-")
        var res = '';
        for (var i = 0, l = str.length; i < l; i++) {
            var s = str.charAt(i), n = ru.indexOf(s);
            if (n >= 0) {
                res += en[n];
            } else {
                res += s;
            }
        }
        return res;
    }

    return (
        <div className="App mx-2">

            <h1 className={"text-center font-bold text-3xl mb-6 mt-2 md:text-lg"}>Рандомайзер слов для быстрого
                изучения</h1>

            <div className="inner md:block flex max-w-7xl mx-auto m-5">
                <CardsList words={words} setWords={setWords} isHiddenEngWords={isHiddenEngWords} isHiddenWords={isHiddenWords}/>
                <div className="buttons sticky top-2 h-fit md:mt-5 md:justify-center md:flex">
                    <button className={"h-fit px-6 py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3 mb-2"}
                            onClick={handleRandom}>Рандом слов
                    </button>
                    <button className={"h-fit px-6 py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3 mb-2"}
                            onClick={_ => setIsHiddenWords(prev => !prev)}>
                        {
                            isHiddenWords ? "Показать перевод" : "Спрятать перевод"
                        }
                    </button>
                    <button className={"h-fit px-6 py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3 mb-2"}
                            onClick={_ => setIsHiddenEngWords(prev => !prev)}>
                        {
                            isHiddenEngWords ? "Показать англ слова" : "Спрятать англ слова"
                        }
                    </button>
                </div>
            </div>

            <form action="#" onSubmit={handleCreate} className={"max-w-2xl mx-auto mt-8 flex items-end md:block"}>
                <label className={"block"}>
                    <span className="block text-sm font-medium text-slate-700">Английское слово</span>
                    <input ref={firstInput} onChange={e => handleFirstInput(e)} required value={englishWord} type="text"
                           className={"border-2 px-3 py-1 rounded-md"}/>
                </label>
                <label className={"block ml-3 md:ml-0 md:my-4"}>
                    <span className="block text-sm font-medium text-slate-700">Перевод слова</span>
                    <input onChange={e => setTranslateWord(e.target.value)} required value={translateWord} type="text"
                           className={"border-2 px-3 py-1 rounded-md"}/>
                </label>
                <button type={'submit'}
                        className={"px-6 h-fit py-2 bg-cyan-900 outline-0 rounded-md text-white ml-3 md:ml-0"}>Создать
                </button>
            </form>

            {
                words.map(item => `{"${Object.keys(item)[0]}":"${Object.values(item)[0]}"},`)
            }

            <div className="block max-w-2xl mx-auto mt-5 md:mt-3">
                <button className={"px-6 h-fit py-2 bg-cyan-900 outline-0 rounded-md text-white"}
                        onClick={handleTanos}>Удалить все слова
                </button>
            </div>
        </div>
    );
}

export default App;
