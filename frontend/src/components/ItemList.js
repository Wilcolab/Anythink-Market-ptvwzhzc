import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0) {
    return <div className="py-4 no-items">No items match your search.</div>;
  }

  let filteredItems = props.items

  // Filter items based on search term
  if (props.searchTerm.trim() !== "") {
    filteredItems = props.items.filter((item) =>
      item.title.toLowerCase().includes(props.searchTerm.toLowerCase())
    );
  }

  if (!filteredItems) {
    return <div className="py-4">Loading...</div>;
  }

  if (filteredItems.length === 0 && props.searchTerm.trim() !== "") {
    return (
      <div id="empty" className="text-center py-4">
        <p className="text-danger">
          We're sorry, but we couldn't find any products matching your search. Please try again with a different keyword.
        </p>
      </div>
    );
  }


  return (
    <div className="container py-2">
      <div className="row">
        {filteredItems.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={filteredItems.length}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ItemList;
