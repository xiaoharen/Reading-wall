import "./bookList01.css"
import {useEffect, useState} from "react";
import backURL from "../../tools/backURL.js";
import Title from "../title/title.jsx";

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const url = backURL + "book.php?type=search";
        fetch(url, {
            method: 'get',
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data)
                setBooks(Object.values(data).map(item => (
                    <li key={item.id}>
                        <a href={item.xhrUrl} target="_blank">
                            <img src={item.imageUrl} alt="" />
                        </a>
                    </li>
                )));
            })
            .catch(e => console.log('error:', e));
    }, []);

    return (
        <>
            <Title />
            <div className="xhr-booklist-01">
                <ul>
                    {books}
                </ul>
            </div>
        </>
    )
}

export default App;