import React, {useState} from 'react';
import CardsItem from "./cardsItem";

const CardsList = ({words, setWords, isHiddenWords}) => {

    return (
        <ul className="listWords border-2 rounded-xl w-full">
            {
                words.length ? words.map((item, index) => {
                    return (
                        <CardsItem key={index} item={item} index={index} setWords={setWords} words={words} isHiddenWords={isHiddenWords}/>
                    )
                }) : <div className={"flex items-center justify-center h-full"}>
                    "Слов нет"
                </div>
            }
        </ul>
    );
};

export default CardsList;