import React from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import OrderBy from './order-by';
import SearchBy from './search-by';
import Search from './search';
import Pagination from './pagination';

const List = ({itemState, header, listRows, appPrefs, parent,
	onListLimitChange, onSearchClick, onSearchChange, onPaginationClick, onFilterClick, onHeader, onOrderBy, striped, columns}) => {

	let classListGroup = "list-group list-unstyled";	
	if (striped == true) {
		classListGroup = "list-group list-unstyled list-group-striped";
	}
	let addButton;
	if (onHeader != null) {
		addButton = <li><i className="fa fa-plus" title="Add" onClick={onHeader()}/></li>;
	}
	 
	return (
		<div className="col-md-12 col-sm-12 col-xs-12">
        	<div className="x_panel">
        		<div className="x_title">
        			{header}
        			<ul className="navbar-right panel_toolbox">
        				{addButton}
        			</ul>
          </div>
          <div className="x_content">
          	<div className="row">
          		<ShowEntries name={itemState.pageName+"-LISTLIMIT"} appPrefs={appPrefs} listLimit={itemState.listLimit} onListLimitChange={onListLimitChange}/>
          		<OrderBy itemState={itemState} name={itemState.pageName+"-ORDERBY"} appPrefs={appPrefs} columns={columns} parent={parent} orderCriteria={itemState.orderCriteria} onChange={onOrderBy}/>
				<SearchBy itemState={itemState} name={itemState.pageName+"-SEARCHBY"} appPrefs={appPrefs} columns={columns} parent={parent} onChange={onSearchClick}/>
          		<Search name={itemState.pageName+"-SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
          	</div>
          		<br/>
            <ul className={classListGroup}>
              {listRows}
            </ul>
            <Pagination currentSegment={itemState[itemState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemState.itemCount} listStart={itemState.listStart} listLimit={itemState.listLimit} onClick={onPaginationClick}/>
          </div>
        </div>
      </div>
	);
};

List.propTypes = {
  itemState: PropTypes.object.isRequired,
  header: PropTypes.string,
  listRows: PropTypes.array,
  appPrefs: PropTypes.object,
  parent: PropTypes.object,
  onListLimitChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  onHeader: PropTypes.func,
  onOrderBy: PropTypes.func,
  striped: PropTypes.bool,
  columns: PropTypes.array
};

export default List;
