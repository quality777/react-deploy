import { useDispatch, useSelector } from "react-redux";
import { fetchItems, itemsSelector } from "../features/Item/ItemSlice";
import { useState } from "react";

const ItemsPage = () => {

    const [number, setNumber] = useState(10);

    const dispatch = useDispatch();

    const { items } = useSelector(itemsSelector);
 
    const menuArr = [
        {name:"Hats", id: 1},
        {name:"Space", id: 2},
        {name:"Funny", id: 3},
        {name:"Sunglasses", id: 4},
        {name:"Boxes", id: 5},
        {name:"Caturday", id: 6},
        {name:"Ties", id: 7}
    ]

    const returnID = (item) => {
        dispatch(fetchItems(10, item.id));
    }

    const loadMore = () => {
        setNumber(number + 10);
        dispatch(fetchItems(number, Math.ceil(Math.random() * 7)))
    }


    
    return(
        <div className="main">

            <div className="buttons">
                {menuArr.map(item => {
                    return(
                        <button onClick={() => returnID(item)}>{item.name}</button>
                    )
                })}
                <button onClick={loadMore}>Load more</button>
            </div>

            <div className="catsDiv">
                {items?.map((item) => {
                    return(
                        <div  key={item.id} className="catsItem">
                            <img src={item.url} alt={item.id}/>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ItemsPage;