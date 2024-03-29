import React, {useEffect, useState} from 'react';
import setCookie from "../functions/setCookie";

const CardsItem = ({item, index, words, setWords, isHiddenWords, isHiddenEngWords}) => {

    const [isHidden, setIsHidden] = useState(false)

    const handleShow = () => {
        setIsHidden(prev => !prev)
    }

    const handleDelete = (item) => {
        const index = words.map(item => item).indexOf(item)
        setCookie("en_words", JSON.stringify([...words.slice(0, index), ...words.slice(index + 1)]))
        setWords(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    }

    const icon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"/>
    </svg>

    useEffect(() => {
        setIsHidden(false)
    }, [isHiddenWords])

    return (
        <li className="wordsItem p-2 flex items-center md:block">
            <div className={"md:flex md:justify-between md:mb-2"}>
                <span className="id pr-4 text-xl md:text-lg">{index + 1}.</span>
                <button onClick={_ => handleDelete(item)} className="delete ml-5 hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </button>
            </div>
            <span onClick={handleShow}
                  className="english w-full block bg-blue-200 p-1 rounded-l-md text-center md:rounded-tl-md md:rounded-tr-md md:rounded-l-none">
                {
                    !(!isHiddenEngWords || isHidden) ?
                        <div
                            className={"flex justify-center items-center" + (!(!isHiddenEngWords || isHidden) ? " cursor-pointer select-none" : "")}>
                            {icon}
                            клик для просмотра
                            {icon}
                        </div>
                        : Object.keys(item)
                }
            </span>
            <span onClick={handleShow}
                  className="translate block bg-amber-200 w-full p-1 rounded-r-md text-center md:rounded-br-md md:rounded-bl-md md:rounded-r-none">

                {
                    !(!isHiddenWords || isHidden) ?
                        <div
                            className={"flex justify-center items-center" + (!(!isHiddenWords || isHidden) ? " cursor-pointer select-none" : "")}>
                            {icon}
                            клик для просмотра
                            {icon}
                        </div>
                        : Object.values(item)
                }
            </span>
            <button onClick={_ => handleDelete(item)} className="delete ml-5 md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </button>
        </li>
    );
};

export default CardsItem;