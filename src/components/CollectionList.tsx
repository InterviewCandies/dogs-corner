import React, {useState} from "react";
import {CrossIcon, IconButton, Pagination, Pane} from "evergreen-ui";
import './CollectionList.css';

const MAXIMUM_ITEM_PER_PAGE = 7;

interface Props {
    items: any[]
    heading?: string,
    onDelete: (id: number) => Promise<void>
}

function CollectionList({ items, heading, onDelete }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(items.length / MAXIMUM_ITEM_PER_PAGE);
    const filteredItems = items.slice((currentPage - 1) * MAXIMUM_ITEM_PER_PAGE, currentPage * MAXIMUM_ITEM_PER_PAGE);

    const ImageThumb = ({ src, id }: { src: string, id: number }) => {
        return <div className="thumb">
            <img src={src} className="image"/>
            <IconButton
                icon={<CrossIcon/>}
                className="remove-icon"
                width={18}
                height={18}
                borderRadius={18}
                onClick={() => onDelete(id)}
                intent={'danger'}/>
        </div>
    }

    return  <Pane elevation={1} className="favourites-collection">
        <h3 className="title">{ heading }</h3>
        {items.length ?
            <div className="images">
                {
                    filteredItems.map(item => <ImageThumb key={item.id} src={item.image ? item.image.url : item.url} id={item.id}/>)
                }
            </div> :
            <Pane className="no-item">
               <h3>No item</h3>
            </Pane>
        }
        {
            items.length ?
                <Pagination page={currentPage}
                     totalPages={totalPages}
                     className="pagination"
                     onPreviousPage={() => setCurrentPage(prevState => prevState - 1)}
                     onNextPage={() => setCurrentPage(prevState => prevState + 1)}
                     onPageChange={value => setCurrentPage(value)}/>
            : null
        }
    </Pane>
}

export default CollectionList;