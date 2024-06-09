import React from "react";
import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";

const ItemList = ({ items, searchTerm, pager, itemsCount, currentPage }) => {
  // Handle undefined items case
  if (!items) {
    return <div className="py-4">Loading...</div>;
  }

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle case when there are no items matching the search term
  if (searchTerm.trim() !== "" && filteredItems.length === 0) {
    return (
      <div id="empty" className="text-center py-4">
        <p className="text-danger">
          We're sorry, but we couldn't find any products matching your search. Please try again with a different keyword.
        </p>
      </div>
    );
  }

  // Handle case when there are no items at all
  if (filteredItems.length === 0) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  // Render filtered items
  return (
    <div className="container py-2">
      <div className="row">
        {filteredItems.map(item => (
          <div className="col-sm-4 pb-2" key={item.slug}>
            <ItemPreview item={item} />
          </div>
        ))}
      </div>

      <ListPagination
        pager={pager}
        itemsCount={itemsCount}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ItemList;
