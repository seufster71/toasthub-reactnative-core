import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './text-input';
import Button from './button';


const Pagination = ({id, currentSegment, appPrefs, itemCount, listStart, listLimit, onClick, buttonClassName}) => {
	let wrapperClass = 'form-group';
	if (buttonClassName == null) {
		buttonClassName = "form-control btn";
	}
	if (itemCount < listLimit) {
		listLimit = itemCount;
	}
	let showEntries = appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_PAGING_SHOW_ENTRIES.value;
	showEntries = showEntries.replace('{pageStart}',listStart + 1);
	if (listStart + listLimit > itemCount) {
		  showEntries = showEntries.replace('{pageLimit}',itemCount);
	} else {
		  showEntries = showEntries.replace('{pageLimit}',listStart + listLimit);
	}
	showEntries = showEntries.replace('{itemCount}',itemCount);
	
	let clickThrough = [];
	let segments = Math.ceil(itemCount/listLimit);
	if (currentSegment == null) {
	    currentSegment = 1;
	}
	let range = Math.floor(currentSegment/15.1);
	  
	// previous
	let start = 1;
	if (range > 0){
		start = 15 * range + 1
		let prev = 15 * range;
		clickThrough.push(<li key="GLOBAL_PAGE_PAGING_PREV" className="paginate_button previous" id="datatable_previous" onClick={() => onClick(prev,id)}><span>{appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_PAGING_PREV.value}</span></li>);
	}
	range = range + 1;
  
  // numbers
  let segmentClass = "paginate_button active";
  for (let c = 1; c <= segments; c++) {
    if (currentSegment == c) {
      segmentClass = "paginate_button active";
    } else {
      segmentClass = "paginate_button";
    }
    if (c <= 15 * range) {
    	clickThrough.push(<li key={c} className={segmentClass} onClick={() => onClick(c,id)}><span >{c}</span></li>);
    } else {
		next = c;
		break;
	}
  }
  // next
  if (segments > 15 * range) {
    clickThrough.push(<li key="GLOBAL_PAGE_PAGING_NEXT" className="paginate_button next" id="datatable_next" onClick={() => onClick(next,id)}><span>{appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_PAGING_NEXT.value}</span></li>);
  }

  if (segments <= 1){
      return (
        <div className="row">
          <div className="col-sm-5">
            <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{showEntries}</div>
          </div>
        </div>
      );
  } else {
    return (
      <div className="row">
        <div className="col-sm-5">
          <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{showEntries}</div>
        </div>
        <div className="col-sm-7">
          <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
            <ul className="pagination">
              {clickThrough}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

Pagination.propTypes = {
	currentSegment: PropTypes.number,
	appPrefs: PropTypes.object,
	itemCount: PropTypes.number,
	listStart: PropTypes.number,
	listLimit: PropTypes.number,
	onClick: PropTypes.func,
	buttonClassName: PropTypes.string
};

export default Pagination;
